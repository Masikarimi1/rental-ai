# roi_forecaster_tool.py

import json
import pandas as pd
from typing import Type
from pydantic import BaseModel
from crewai.tools import BaseTool
from pathlib import Path
import os

# Discover the data folder relative to this file
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data" / "data_snapshots"

class ROIForecasterInput(BaseModel):
    """No inputs required—tool auto-loads the latest market snapshot and data snapshot."""
    pass

class ROIForecasterTool(BaseTool):
    name: str = "ROI Forecaster Tool"
    description: str = (
        "Calculates ROI for each rental listing by loading the latest data snapshot "
        "and reference market snapshot from predefined folders."
    )
    args_schema: Type[BaseModel] = ROIForecasterInput

    def _run(self) -> str:
        try:
            # List and sort snapshots
            data_files = sorted(os.listdir(DATA_DIR))
            if not data_files:
                return "⚠️ No data snapshots found."
            market_dir = BASE_DIR / "data" / "market_data"
            market_files = sorted(os.listdir(market_dir))
            if not market_files:
                return "⚠️ No market reference snapshots found."

            # Pick the latest snapshots
            data_file = data_files[-1]
            market_file = market_files[-1]

            # Load dataframes
            df = pd.read_csv(DATA_DIR / data_file)
            market_df = pd.read_csv(market_dir / market_file)

            # Compute market averages
            market_avg = (
                market_df
                .groupby(["City", "Location"])["Rent_per_sqft"]
                .mean()
                .reset_index()
            )
            df = df.merge(
                market_avg,
                on=["City", "Location"],
                how="left",
                suffixes=("", "_market")
            )
            df["Rent_per_sqft_market"].fillna(
                df["Rent_per_sqft_market"].mean(),
                inplace=True
            )

            # Calculate ROI
            df["Estimated_Value"] = df["Area_in_sqft"] * df["Rent_per_sqft_market"] * 12
            df["Annual_Rent"] = df["Rent"]
            df["ROI"] = (df["Annual_Rent"] / df["Estimated_Value"]) * 100

            # Select top yields
            top_yields = (
                df.sort_values("ROI", ascending=False)
                  .head(5)[
                    [
                      "Address",
                      "Location",
                      "City",
                      "Rent",
                      "Area_in_sqft",
                      "Estimated_Value",
                      "ROI"
                    ]
                  ]
            )

            return top_yields.to_json(orient="records", indent=2)

        except Exception as e:
            return json.dumps({"error": f"ROI Forecaster error: {str(e)}"})


