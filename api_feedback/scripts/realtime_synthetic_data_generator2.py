# file_looper.py
import time, shutil
from pathlib import Path
from itertools import cycle
from datetime import datetime

# ───────── CONFIG ─────────
BASE_DIR     = Path(__file__).resolve().parent.parent
WATCH_DIR    = BASE_DIR / "watch_folder"           # folder your watcher polls
SOURCE_FILES = [
    WATCH_DIR  / "dataset_1.csv",
    WATCH_DIR  / "dataset_2.csv",
    WATCH_DIR  / "dataset_3.csv",
]
TARGET_DIR=BASE_DIR / "data" / "data_snapshots"

INTERVAL_SEC = 120                                 # two minutes

# ───────── LOOP ─────────
for src in cycle(SOURCE_FILES):
    if not src.exists():
        print(f"[warn] source missing: {src}")
        time.sleep(INTERVAL_SEC)
        continue

    timestamp = datetime.utcnow().strftime('%Y%m%d%H%M%S')
    dst_name  = f"{src.stem}_{timestamp}{src.suffix}"
    dst_path  = TARGET_DIR / dst_name

    shutil.copy2(src, dst_path)
    print(f"[{timestamp}] copied {src.name} → {dst_path.name}")

    time.sleep(INTERVAL_SEC)
