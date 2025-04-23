import os
import sqlite3
from chromadb import PersistentClient
from chromadb.config import Settings
from chromadb.utils import embedding_functions

from src.config.settings import settings
from pathlib import Path

BASE_DIR    = Path(__file__).resolve().parent.parent
MEMORY_DIR=BASE_DIR / "memory"
CHROMA_DIR = MEMORY_DIR / "chroma_db"

# ensure it exists
CHROMA_DIR.mkdir(parents=True, exist_ok=True)

# 1. 🔑 Configure your Chroma client + embedding function
client = PersistentClient(path=str(CHROMA_DIR))
emb_fn = embedding_functions.OpenAIEmbeddingFunction(
    api_key=os.getenv("OPENAI_API_KEY"),
    model_name="text-embedding-3-small",
)

# 2. 🗂️ Get (or create) the collection
col = client.get_or_create_collection(
    name="crew_short_term_memory",
    embedding_function=emb_fn
)

# 3. 📥 Ingest function
def sync_sqlite_to_chroma():
    # fetch all rows from your Crew SQLite
    conn = sqlite3.connect(MEMORY_DIR / "chroma.sqlite3")
    cur  = conn.cursor()
    cur.execute("SELECT id, c0 FROM embedding_fulltext_search_content")
    rows = cur.fetchall()
    conn.close()

    # fetch every existing Chroma ID (returns all docs + embeddings + metadatas + distances + uris + ids)
    resp     = col.get()
    existing = set(resp["ids"])

    # filter out the ones already in Chroma
    new = [(str(rid), text) for rid, text in rows if str(rid) not in existing]
    if not new:
        print("✅ No new rows found.")
        return

    ids, docs = zip(*new)
    metadatas = [{"source": "crew_sqlite"} for _ in docs]

    # upsert *just* the new documents
    col.upsert(ids=list(ids), documents=list(docs), metadatas=metadatas)
    print(f"✅ Synced {len(ids)} new records into Chroma.")


def inspect_chroma():
    total = col.count()
    print(f"\n🔢  Total embeddings in Chroma: {total}\n")
    if total == 0:
        print("⚠️  Your collection is empty. Nothing to show.")
        return

    # peek at the first 3 entries
    peek_n = min(3, total)
    sample = col.peek(peek_n)
    print(f"✏️  Peeking at first {peek_n} rows:")
    for i in range(peek_n):
        print(f"  • id={sample['ids'][i]}  doc={sample['documents'][i][:60]!r}…  meta={sample['metadatas'][i]}")

    # get a slightly larger sample via `get`
    get_n = min(5, total)
    print(f"\n🔎  Getting {get_n} docs + metadata:")
    batch = col.get(limit=get_n, include=["documents", "metadatas"])

    for _id, doc, meta in zip(batch["ids"], batch["documents"], batch["metadatas"]):
        print(f"  – {_id}: {doc[:80]!r}…  (meta={meta})")

if __name__ == "__main__":
    # sync_sqlite_to_chroma()
    inspect_chroma()
