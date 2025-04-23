from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import os
import json
from pathlib import Path
app = FastAPI(
    title="CrewAI Results API",
    description="API to serve CrewAI agent outputs stored in JSON files",
    version="1.0",
)

# Path to the JSON file (can be overridden via env var)
RESULTS_FILE = os.getenv("CREW_RESULTS_FILE", "data/results/crew_outputs.json")
BASE_DIR    = Path(__file__).resolve().parent.parent
CREW_RESULTS_FILE = BASE_DIR / "data" / "results" / "crew_results.json"
print(CREW_RESULTS_FILE)

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
        print(data)
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Error parsing JSON: {e}")
    return data


# If running directly with `python api.py`
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
