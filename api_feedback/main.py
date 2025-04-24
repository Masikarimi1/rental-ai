# api_feedback/main.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from pathlib import Path
from datetime import datetime
import json

# ───────── Config ─────────
BASE_DIR = Path(__file__).resolve().parent
FEEDBACK_FILE = BASE_DIR / "data" / "feedback.jsonl"
FEEDBACK_FILE.parent.mkdir(parents=True, exist_ok=True)   # create ./data if missing

# ───────── FastAPI app with root_path ─────────
app = FastAPI(
    title="Agent Feedback API",
    description="Collects like / dislike feedback on agent responses.",
    version="1.1",
    root_path="/apifeedback",
    docs_url="/docs",
    redoc_url=None
)

class Feedback(BaseModel):
    agent_name: str = Field(
        ...,
        description="Name of the agent (e.g., PriceAdvisorTool)"
    )
    rating: str = Field(
        ...,
        pattern="^(like|dislike)$",
        description="'like' or 'dislike'"
    )
    message: str = Field(
        "",
        description="Optional free-text feedback from the user"
    )

@app.post("/feedback")
def collect_feedback(fb: Feedback):
    """
    Append one feedback record as a JSON line:
    {
      "timestamp": "...",
      "agent_name": "...",
      "rating": "like|dislike",
      "message": "..."
    }
    """
    record = {
        "timestamp": datetime.utcnow().isoformat(timespec="seconds") + "Z",
        "agent_name": fb.agent_name,
        "rating": fb.rating,
        "message": fb.message.strip(),
    }

    try:
        with FEEDBACK_FILE.open("a", encoding="utf-8") as f:
            f.write(json.dumps(record, ensure_ascii=False) + "\n")
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"File write failed: {exc}")

    return {"status": "ok", "written": record}

# ───────── Health endpoint ─────────
@app.get("/health")
def health():
    return {"status": "alive"}

# ───────── App Runner ─────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8003, reload=True)
