import sqlite3
import os

# Determine the absolute path to the directory containing the script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Navigate to the parent directory
PARENT_DIR = os.path.dirname(BASE_DIR)

# Define the path to the 'data' directory in the parent directory
data_dir = os.path.join(PARENT_DIR, 'data')

# Create the 'data' directory if it doesn't exist
os.makedirs(data_dir, exist_ok=True)

# Define the full path to the database file within the 'data' directory
db_path = os.path.join(data_dir, 'estate.db')

# Connect to the SQLite database (it will be created if it doesn't exist)
conn = sqlite3.connect(db_path)
cursor = conn.cursor()


cursor.execute('''CREATE TABLE IF NOT EXISTS logs
                 (timestamp TEXT, log_message TEXT)''')
# Commit changes and close connection
conn.commit()
conn.close()
print("Database 'estate.db' created with required tables.")
