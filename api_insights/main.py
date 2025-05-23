# /gebral-Estate/api_insights/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import json
from pathlib import Path

app = FastAPI(
    title="CrewAI Results API",
    description="API to serve CrewAI agent outputs stored in JSON files",
    version="1.0",
    root_path="/insights",
    docs_url="/docs",
    redoc_url=None
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Path to the JSON file (can be overridden via env var)
RESULTS_FILE = os.getenv("CREW_RESULTS_FILE", "data/results/crew_outputs.json")
BASE_DIR    = Path(__file__).resolve().parent
CREW_RESULTS_FILE = BASE_DIR / "data" / "results" / "crew_results.json"

@app.get("/results", response_class=JSONResponse)
def get_all_results():
    """
    Returns the entire list of agent outputs from the JSON file.
    """
    if not CREW_RESULTS_FILE.exists():
        raise HTTPException(status_code=404, detail=f"Results file not found at {CREW_RESULTS_FILE}")
    try:
        with open(CREW_RESULTS_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Error parsing JSON: {e}")
    return data

# If running directly with `python api.py`
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)