# vacancy_metrics_tool.py
import os, json
import pandas as pd
from pathlib import Path
from typing import Optional, Type
from pydantic import BaseModel
from crewai.tools import BaseTool

BASE_DIR   = Path(__file__).resolve().parent.parent
DATA_DIR   = BASE_DIR / "data" / "data_snapshots"      # latest listing snapshots live here
TARGET_DUR = 14                                   # SLA target in days (editable)

class VacancyInput(BaseModel):
    """No inputs required—tool auto-loads the two most recent snapshots."""
    pass


class VacancyMetricsTool(BaseTool):
    name        : str = "Vacancy Metrics Tool"
    description : str = (
        "Computes Vacancy Rate (%) and Average Vacancy Duration (days) "
        "for the latest listings snapshot. Accepts optional location "
        "and bed filters."
    )
    args_schema : Type[BaseModel] = VacancyInput

    # vacancy_metrics_tool.py  (excerpt – replace _run)

    def _run(self) -> str:
        # try:
            files = sorted(os.listdir(DATA_DIR))
            current_file = files[-1]

            # Load them
            df = pd.read_csv(DATA_DIR / current_file)

            # ----- Portfolio-level metrics -----
            total_units = df["total_units"].sum()
            vacant_units = df["vacant_units"].sum()
            vacancy_pct = round((vacant_units / total_units) * 100, 2) if total_units else 0
            occupancy_rate_pct = round((1 - vacant_units / total_units) * 100, 2)
            avg_vac_days = round(df["vacant_days"].mean(), 1)
            delta_vs_sla = round(avg_vac_days - TARGET_DUR, 1)
            MARKET_AVG_DAYS=40

            # ----- Per-location vacancy rate -----

            by_loc = (
                df.groupby("Location")
                .agg(
                    vacant_units=("vacant_units", "sum"),
                    total_units=("total_units", "sum"),
                    avg_vacancy_days=("vacant_days", "mean")  # use mean, not sum
                )
                .assign(
                    vacancy_rate_pct=lambda x:
                    round((x.vacant_units / x.total_units) * 100, 2),
                    avg_vacancy_days_pct=lambda x:
                    round((x.avg_vacancy_days / MARKET_AVG_DAYS) * 100, 1)
                )
                .reset_index()
            )

            # Pick location with highest vacancy rate
            worst = by_loc.sort_values("vacancy_rate_pct", ascending=False).iloc[0]

            # Assemble JSON
            result = {
                "vacancy_rate_pct": vacancy_pct,
                "vacant_units": int(vacant_units),
                "total_units": int(total_units),
                "occupancy_rate_pct" : int(occupancy_rate_pct),
                "average_vacancy_days": avg_vac_days,
                "delta_vs_target_days": delta_vs_sla,

                # Extra section for dashboard badge
                "highest_vacancy_location": {
                    "location": worst["Location"],
                    "vacancy_rate_pct": worst["vacancy_rate_pct"],
                    "vacant_units": int(worst["vacant_units"])
                }
            }
            return json.dumps(result, indent=2)
        #
        # except Exception as e:
        #     return json.dumps({"error": f"VacancyMetrics error: {str(e)}"})

r=VacancyMetricsTool()
print(r.run())