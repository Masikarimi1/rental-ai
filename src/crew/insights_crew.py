from pathlib import Path
import yaml
import os
from crewai import Agent, Task, Crew,Process
from crewai_tools import FileReadTool
from src.tools.custom_trendspotter_tool import TrendSpotterTool
from src.tools.custom_roiforcaster_tool import ROIForecasterTool
from src.tools.custom_price_advisor_tool import PriceAdvisorTool
from src.tools.custom_vacancy_metrics_tool import VacancyMetricsTool
from src.config.settings import settings
from crewai.memory import LongTermMemory, ShortTermMemory, EntityMemory
from crewai.memory.storage.rag_storage import RAGStorage
from crewai.memory.storage.ltm_sqlite_storage import LTMSQLiteStorage
import json
from src.scripts.sync_agent_memory import sync_sqlite_to_chroma

# 1) Paths to your YAML configs
BASE_DIR    = Path(__file__).resolve().parent.parent
CONFIG_DIR  = BASE_DIR / "config"
AGENTS_FILE = CONFIG_DIR / "agents.yaml"
TASKS_FILE  = CONFIG_DIR / "tasks.yaml"
NEWS_DIR = BASE_DIR / "data" / "news_snapshots"
CREW_RESULT_FILE = BASE_DIR / "data" / "results" / "crew_results.json"
MEMORY_DIR=BASE_DIR / "memory"

# 2) Load YAML into dicts
with open(AGENTS_FILE, "r",encoding='utf-8') as f:
    agents_cfg = yaml.safe_load(f)

with open(TASKS_FILE, "r",encoding='utf-8') as f:
    tasks_cfg = yaml.safe_load(f)

# 3) Instantiate Agents from config + their Tools
trendspotter_agent = Agent(
    config=agents_cfg["trendspotter_agent"],
    tools=[TrendSpotterTool()],
)

roi_forecaster_agent = Agent(
    config=agents_cfg["roi_forecaster_agent"],
    tools=[ROIForecasterTool()],
)

action_brief_agent = Agent(
    config=agents_cfg["action_brief_agent"],
    tools=[],
    memory=True
)

vacancy_insights_agent = Agent(
    config=agents_cfg["vacancy_insights_agent"],
    tools=[VacancyMetricsTool()],
    memory=True
)

price_advisor_agent = Agent(
    config=agents_cfg["price_advisor_agent"],
    tools=[PriceAdvisorTool()],
    memory=True
)

# For the news agent, grab the path you defined in YAML under tools→file_path
print(NEWS_DIR)
files = sorted(os.listdir(NEWS_DIR))
current_file = files[-1]
current_file_path=os.path.join(NEWS_DIR, current_file)
print(current_file_path)
news_insight_agent = Agent(
    config=agents_cfg["news_insight_agent"],
    tools=[FileReadTool(file_path=current_file_path)],
)

# 4) Instantiate Tasks from config
task_trendspotter    = Task(config=tasks_cfg["trendspotter_task"],    agent=trendspotter_agent)
task_roi_forecaster  = Task(config=tasks_cfg["roi_forecaster_task"], agent=roi_forecaster_agent)
task_news            = Task(config=tasks_cfg["news_task"],            agent=news_insight_agent)
task_vacancy_insights  = Task(config=tasks_cfg["vacancy_insights_task"], agent=vacancy_insights_agent)
task_price_advisor  = Task(config=tasks_cfg["price_advisor_task"], agent=price_advisor_agent)
task_action_brief    = Task(config=tasks_cfg["action_brief_task"],    agent=action_brief_agent,context=[task_trendspotter, task_roi_forecaster,task_news,task_vacancy_insights,task_price_advisor])

# 5) Create a single Crew with all agents & tasks
crew = Crew(
    agents=[trendspotter_agent, roi_forecaster_agent, news_insight_agent,vacancy_insights_agent,price_advisor_agent,action_brief_agent],
    tasks=[task_trendspotter, task_roi_forecaster, task_news, task_vacancy_insights,task_price_advisor, task_action_brief],
    # agents=[price_advisor_agent],
    # tasks=[task_price_advisor],
    verbose=True,
    memory=True,
# Long-term memory for persistent storage across sessions
    long_term_memory=LongTermMemory(
        storage=LTMSQLiteStorage(
            db_path=f"{MEMORY_DIR}/memory.db"
        )
    ),
    # Short-term memory for current context using RAG
    short_term_memory=ShortTermMemory(
        storage=RAGStorage(
            embedder_config={
                "provider": "openai",
                "config": {
                    "model": 'text-embedding-3-small'
                    }
                },
                type="short_term",
                path=f"{MEMORY_DIR}"
            )
        ),
    # Entity memory for tracking key information about entities
    entity_memory = EntityMemory(
        storage=RAGStorage(
            embedder_config={
                "provider": "openai",
                "config": {
                    "model": 'text-embedding-3-small'
                }
            },
            type="short_term",
            path="/my_crew1/"
        )
    )
)

# Run all agents concurrently
if __name__ == "__main__":
    result = crew.kickoff()
    outputs = []
    for task_out in result.tasks_output:
        agent_name = task_out.agent.strip()
        raw_str = task_out.raw  # this *must* be the JSON string, not task_out itself

        try:
            parsed = json.loads(raw_str)
        except json.JSONDecodeError:
            # If it fails, just store the raw text for inspection
            parsed = raw_str

        outputs.append({
            "agent": agent_name,
            "output": parsed
        })
    # now dump the full list to a JSON file or stdout
    json_result = json.dumps(outputs, indent=2)
    print(json_result)
    with open(CREW_RESULT_FILE, "w", encoding="utf-8") as f:
        f.write(json_result)
    sync_sqlite_to_chroma()