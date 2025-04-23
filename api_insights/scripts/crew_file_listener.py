import threading
import json
import time
from pathlib import Path
from datetime import datetime
import pytz
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from src.scripts.sync_agent_memory import sync_sqlite_to_chroma

# Import your Crew instance and result file path
from src.crew.insights_crew import crew, CREW_RESULT_FILE

# Base directory and watch path
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data" / "data_snapshots"

print(f"👀 Watching {DATA_DIR} for new CSVs…")

# Lock to prevent concurrent file writes
file_lock = threading.Lock()

def run_crew():
    """Kick off all agents, timestamp outputs, and append to a single JSON array file."""
    # 1) Run Agents
    result = crew.kickoff()
    #sync memory with chromadb for conversational agent
    try:
        sync_sqlite_to_chroma()
    except Exception as e:
        print(f"❌ Error running sync or inspect: {e}")
    # 2) Build timestamped entries
    tz = pytz.timezone("Asia/Dubai")
    new_entries = []
    for task_out in result.tasks_output:
        try:
            parsed = json.loads(task_out.raw)
        except json.JSONDecodeError:
            parsed = task_out.raw

        timestamp = datetime.now(tz).strftime("%Y-%m-%dT%H:%M:%S")
        new_entries.append({
            "agent": task_out.agent.strip(),
            "time": timestamp,
            "output": parsed
        })

    # 3) Safely load, extend, and write the JSON array
    with file_lock:
        if CREW_RESULT_FILE.exists() and CREW_RESULT_FILE.stat().st_size > 0:
            try:
                with open(CREW_RESULT_FILE, "r", encoding="utf-8") as f:
                    all_entries = json.load(f)
                    if not isinstance(all_entries, list):
                        all_entries = []
            except json.JSONDecodeError:
                all_entries = []
        else:
            all_entries = []

        all_entries.extend(new_entries)
        with open(CREW_RESULT_FILE, "w", encoding="utf-8") as f:
            json.dump(all_entries, f, indent=2, ensure_ascii=False)

    print(f"✅ Appended {len(new_entries)} entries; total now {len(all_entries)}")


class NewCsvHandler(FileSystemEventHandler):
    def on_created(self, event):
        if event.is_directory:
            return
        if event.src_path.lower().endswith(".csv"):
            print(f"📄 Detected new CSV: {event.src_path}")
            threading.Thread(target=run_crew, daemon=True).start()


if __name__ == "__main__":
    observer = Observer()
    observer.schedule(NewCsvHandler(), path=str(DATA_DIR), recursive=False)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("👋 Shutting down watcher…")
        observer.stop()
    observer.join()
