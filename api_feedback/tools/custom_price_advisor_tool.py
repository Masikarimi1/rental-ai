import json, os, smtplib, ssl
from email.message import EmailMessage
from pathlib import Path
from typing import List, Type

import pandas as pd
from huggingface_hub import InferenceClient
from pydantic import BaseModel
from crewai.tools import BaseTool   # leave if you’re wiring into CrewAI

# ───────── Config constants ─────────
TARGET_DUR        = 14                  # vacancy SLA (days)
TREND_MAP         = {"rising": 2.0, "flat": 0.0, "declining": -2.0}
PRESSURE_PER_WEEK = -1.5                # extra % / week over SLA
MAX_DELTA         = 10.0                # cap ±10 %
PEER_THRESH       = 0.01                # 1 % diff → rising/declining
FINBERT_MODEL     = "ProsusAI/finbert"
MACRO_WEIGHT      = 3.0                 # −1…+1 → ±3 %

# ───────── Paths ─────────
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data" / "data_snapshots"
NEWS_DIR = BASE_DIR / "data" / "news_snapshots"

# ───────── Email settings ─────────
MAIL_TO   = "rinishaniyamol@gmail.com"               # approver
MAIL_FROM = os.getenv("SMTP_FROM", "no-reply@advisor")
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")

# ───────── Hugging Face client ─────────
_hf_client: InferenceClient | None = None
def _hf() -> InferenceClient:
    global _hf_client
    if _hf_client is None:
        _hf_client = InferenceClient(
            model=FINBERT_MODEL,
            api_key=os.getenv("HF_API_TOKEN")
        )
    return _hf_client

# ───────── Utility helpers ─────────
def _send_approval_email(row: pd.Series) -> None:
    """E-mail the property manager for |Δ| ≥ 5 % proposals."""
    try:
        msg = EmailMessage()
        msg["Subject"] = f"[Price Advisor] Approval needed: {row['address']}"
        msg["From"]    = MAIL_FROM
        msg["To"]      = MAIL_TO
        msg.set_content(
            f"""A {row['change_pct']} % rent change is suggested.

Address            : {row['address']}
Current rent (AED) : {row['rent']}
Recommended (AED)  : {row['recommended_rent']}

Please review this listing in the dashboard."""
        )
        ctx = ssl.create_default_context()
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as s:
            s.starttls(context=ctx)
            if SMTP_USER and SMTP_PASS:
                s.login(SMTP_USER, SMTP_PASS)
            s.send_message(msg)
            print("📧  Approval e-mail dispatched.")
    except Exception as exc:
        print("📭  Email error:", exc)   # don’t crash the tool

def _macro_pct(headlines: List[str]) -> float:
    """Compute ±3 % macro tweak from average FinBERT sentiment."""
    if not headlines:
        return 0.0
    scores = []
    for text in headlines[:10]:          # limit cost
        try:
            outs   = _hf().text_classification(text)
            probs  = {o.label.lower(): o.score for o in outs}
            scores.append(probs.get("positive", 0) - probs.get("negative", 0))
        except Exception:
            continue
    if not scores:
        return 0.0
    macro_score = sum(scores) / len(scores)           # −1 … +1
    return max(min(round(macro_score * MACRO_WEIGHT, 2),
                   MACRO_WEIGHT), -MACRO_WEIGHT)

def _status_message(row: pd.Series) -> str:
    """Create executive-grade summary incl. revenue impact."""
    pct  = row["change_pct"]
    rent = row["rent"]
    if pct == 0:
        return ("Pricing aligns with market conditions — "
                "no adjustment recommended.")
    abs_pct   = abs(pct)
    direction = "increase" if pct > 0 else "discount"
    impact    = abs(rent * pct / 100)
    if abs_pct < 5:
        return (f"{abs_pct:.1f} % {direction} auto-applied to stay competitive. "
                f"Est. annual impact: AED {impact:,.0f}.")
    return (f"Strategic {abs_pct:.1f} % {direction} proposed due to "
            f"extended vacancy. Est. annual impact: AED {impact:,.0f}. "
            "Approval request sent to property manager.")

# ───────── Args schema ─────────
class PriceInput(BaseModel):
    pass

class PriceAdvisorTool(BaseTool):
    name: str = "Price Advisor Tool"

    # ✅ add `str =` (or remove the annotation altogether)
    description: str = (
        "Computes rent recommendations for the stalest listing(s), blending "
        "macro sentiment, market trend, and vacancy pressure."
    )

    args_schema: Type[BaseModel] = PriceInput


    # ───────── Core logic ─────────
    def _run(self) -> str:
        # 1️⃣ Latest data snapshot
        data_files = sorted(os.listdir(DATA_DIR))
        if not data_files:
            return json.dumps({"error": "No snapshot files found"})
        df = pd.read_csv(DATA_DIR / data_files[-1])

        # 2️⃣ Latest news snapshot (optional)
        headlines = []
        news_files = sorted(os.listdir(NEWS_DIR))
        if news_files:
            news_df  = pd.read_csv(NEWS_DIR / news_files[-1])
            headlines = news_df.get("headline", pd.Series()).dropna().tolist()

        df.columns = df.columns.str.lower()

        # 3️⃣ Validate schema
        required = {"address", "rent", "vacant_days"}
        missing  = required - set(df.columns)
        if missing:
            return json.dumps({"error": f"Missing columns: {missing}"})

        # 4️⃣ Derive market_trend if absent
        if "market_trend" not in df.columns:
            grp_cols = [c for c in ("location", "bedrooms") if c in df.columns]
            if grp_cols:
                peer_med = df.groupby(grp_cols)["rent"].transform("median")
                pct_diff = (df["rent"] - peer_med) / peer_med
                df["market_trend"] = pct_diff.apply(
                    lambda x: "rising" if x >= PEER_THRESH
                    else "declining" if x <= -PEER_THRESH
                    else "flat"
                )
            else:
                df["market_trend"] = "flat"

        # 5️⃣ Macro sentiment tweak
        macro_pct = _macro_pct(headlines)

        # 6️⃣ change_pct per row
        def _change_pct(row):
            trend_adj  = TREND_MAP.get(str(row["market_trend"]).lower(), 0.0)
            vac_days   = 0 if pd.isna(row["vacant_days"]) else row["vacant_days"]
            weeks_over = max(0, (vac_days - TARGET_DUR) / 7)
            pct        = trend_adj + PRESSURE_PER_WEEK * weeks_over + macro_pct
            return max(min(round(pct, 1), MAX_DELTA), -MAX_DELTA)

        df["change_pct"]       = df.apply(_change_pct, axis=1)
        df["recommended_rent"] = (df["rent"] * (1 + df["change_pct"]/100)).round()
        df["confidence"]       = df["change_pct"].abs().map(
            lambda d: "High" if d >= 5 else "Medium" if d >= 2 else "Low"
        )

        # 7️⃣ Action routing + e-mail
        def _action(row):
            pct = row["change_pct"]
            if pct == 0:
                return ""
            if abs(pct) < 5:
                return "applied"
            _send_approval_email(row)
            return "approval_required"

        df["price_action"] = df.apply(_action, axis=1)

        # 8️⃣ Human-readable summary
        df["status_msg"] = df.apply(_status_message, axis=1)

        # 9️⃣ Return only stalest listing(s)
        max_days = df["vacant_days"].max()
        df_out   = df[df["vacant_days"] == max_days]

        return json.dumps(df_out.to_dict(orient="records"), indent=2)

# ───────── Smoke test ─────────
if __name__ == "__main__":
    print(PriceAdvisorTool().run())
