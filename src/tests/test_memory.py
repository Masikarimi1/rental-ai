import sqlite3
import os
from pathlib import Path
import pandas as pd
# Set the path to the chroma.sqlite3 database
BASE_DIR = Path(__file__).resolve().parent.parent
MEMORY_DIR = BASE_DIR / 'memory'
CHROMA_DB_PATH = os.path.join(MEMORY_DIR, 'chroma.sqlite3')
output_path=MEMORY_DIR
# Connect to the database
conn = sqlite3.connect(CHROMA_DB_PATH)
cursor = conn.cursor()

# List all tables
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()
print("\n📂 Tables in chroma.sqlite3:")
for table in tables:
    print(" -", table[0])

    # Example: View top rows from collection metadata (if exists)
    try:
        print(f"\n🔎TABLE {table[0]} :")
        cursor.execute(f"SELECT * FROM {table[0]} LIMIT 5;")
        # Print column names
        col_names = [desc[0] for desc in cursor.description]
        print(" 🧾 Columns:", col_names)
        rows = cursor.fetchall()
        for row in rows:
            print(" ➤", row)
    except sqlite3.Error as e:
        print("⚠️ Error querying embedding table:", e)

# try:
#     df = pd.read_sql_query("SELECT * FROM embedding_fulltext_search_content", conn)
#     df.to_csv(os.path.join(output_path, "embedding_fulltext_search_content.csv"), index=False)
#
#     print(f"✅ Exported embedding_fulltext_search_content to {output_path}")
# except Exception as e:
#     print(f"❌ Failed to export embedding_fulltext_search_content: {e}")

conn.close()
