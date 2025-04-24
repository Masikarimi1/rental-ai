# trendspotter_tool.py

import os
from pathlib import Path
from typing import Type
import pandas as pd
from pydantic import BaseModel
from crewai.tools import BaseTool

# Discover the data folder relative to this file
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data" / "data_snapshots"

class TrendSpotterInput(BaseModel):
    """No inputs required—tool auto-loads the two most recent snapshots."""
    pass

class TrendSpotterTool(BaseTool):
    name: str = "TrendSpotter Tool"
    description: str = (
        "Scans rental listings for emerging pricing trends by comparing "
        "the two most recent data snapshots in data_snapshots/."
    )
    args_schema: Type[BaseModel] = TrendSpotterInput

    def _run(self) -> str:
        try:
            files = sorted(os.listdir(DATA_DIR))
            if len(files) < 2:
                return "⚠️ Not enough CSV snapshots to compare. Waiting for more data..."

            # Pick the two most recent files
            previous_file = files[-2]
            current_file  = files[-1]

            # Load them
            df_current = pd.read_csv(DATA_DIR / current_file)
            df_previous = pd.read_csv(DATA_DIR / previous_file)

            # Compute average rent per sqft by location
            curr_trend = df_current.groupby("Location")["Rent_per_sqft"].mean()
            prev_trend = df_previous.groupby("Location")["Rent_per_sqft"].mean()

            # Compute percent change
            comparison = pd.DataFrame({
                "Current":  curr_trend,
                "Previous": prev_trend
            }).dropna()
            comparison["Change %"] = (
                (comparison["Current"] - comparison["Previous"])
                / comparison["Previous"]
            ) * 100

            # Top 10 shifts
            emerging = comparison.sort_values("Change %", ascending=False).head(10)

            # Build human‑readable summary
            summary = [
                f"📍 {loc}: {round(row['Current'])} AED/sqft ↑ {round(row['Change %'], 2)}%"
                for loc, row in emerging.iterrows()
            ]
            return "\n".join(["📊 Emerging Rental Trends (based on % change):"] + summary)

        except Exception as e:
            return f"❌ TrendSpotter error: {str(e)}"
v=TrendSpotterTool()

print(v.run())