import os
from pathlib import Path
import yaml

from crewai import Agent, Task, Crew, Process

from src.config.settings import settings

from crewai.memory import LongTermMemory, ShortTermMemory
from crewai.memory.storage.ltm_sqlite_storage import LTMSQLiteStorage
from crewai.memory.storage.rag_storage import RAGStorage
from src.tools.custom_memory_search_tool import MemorySearchTool

# ------------------------------------------------------------------------------
# 1) Paths & Config
# ------------------------------------------------------------------------------
BASE_DIR    = Path(__file__).resolve().parent.parent
print(BASE_DIR)
CONFIG_DIR  = BASE_DIR / "config"
AGENTS_FILE = CONFIG_DIR / "agents.yaml"
TASKS_FILE  = CONFIG_DIR / "tasks.yaml"
MEMORY_DIR  = BASE_DIR / "memory"
CHROMA_DIR  = MEMORY_DIR / "chroma"

# Load agent & task definitions from YAML
with open(AGENTS_FILE, 'r', encoding='utf-8') as f:
    agents_cfg = yaml.safe_load(f)
with open(TASKS_FILE, 'r', encoding='utf-8') as f:
    tasks_cfg = yaml.safe_load(f)

# ------------------------------------------------------------------------------
# Agent & Task
# ------------------------------------------------------------------------------
conversation_agent = Agent(
    config=agents_cfg["conversational_memory_agent"],
    tools=[MemorySearchTool()],
)

task_conversation    = Task(config=tasks_cfg["conversational_memory_task"],    agent=conversation_agent)
# ------------------------------------------------------------------------------
# 4) Crew Setup
# ------------------------------------------------------------------------------
conversation_crew = Crew(
    agents=[conversation_agent],
    tasks=[task_conversation],
    process=Process.sequential,
    verbose=True,

    # Long‐term Memory (SQLite)
    long_term_memory=LongTermMemory(
        storage=LTMSQLiteStorage(db_path=os.path.join(MEMORY_DIR, 'memory.db'))
    ),
    # Short‐term RAG Memory (Chroma)
    short_term_memory=ShortTermMemory(
        storage=RAGStorage(
            embedder_config={
                'provider': 'openai',
                'config': {'model': 'text-embedding-3-small'}
            },
            type='short_term',
            path=str(MEMORY_DIR)
        )
    ),
)

# ------------------------------------------------------------------------------
# 5) Run
# ------------------------------------------------------------------------------
if __name__ == '__main__':
    query = "why 5% decrease suggested in price advisor tool"
    result = conversation_crew.kickoff(inputs={"user_query": query})
    print(result)
