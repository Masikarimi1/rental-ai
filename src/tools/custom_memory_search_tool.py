import os
from typing import Type
from pydantic import BaseModel, Field
from crewai.tools import BaseTool
from chromadb import PersistentClient
from chromadb.config import Settings
from langchain_community.embeddings import OpenAIEmbeddings

from pathlib import Path

BASE_DIR    = Path(__file__).resolve().parent.parent
MEMORY_DIR=BASE_DIR / "memory"
CHROMA_DIR = MEMORY_DIR / "chroma_db"

class MemorySearchInput(BaseModel):
    query: str = Field(..., description="The user’s natural-language question")


class MemorySearchTool(BaseTool):
    name: str = "Conversational Memory Search"
    description: str = (
        "Retrieve the top-3 most relevant passages from the shared ChromaDB memory store "
        "for a given user query, using OpenAI embeddings under the hood."
    )
    args_schema: Type[BaseModel] = MemorySearchInput

    def _run(self, query: str) -> str:
        try:
            # 1) embed the user query
            embeddings_client = OpenAIEmbeddings(model="text-embedding-3-small",
                                                 openai_api_key=os.getenv("OPENAI_API_KEY"))
            query_vector = embeddings_client.embed_query(query)
            print("QUERY VECTOR",query_vector)
            # 2) connect to your ChromaDB instance
            client = PersistentClient(path=str(CHROMA_DIR))

            # 3) load the collection where all agents have written their embeddings
            collection = client.get_collection("crew_short_term_memory")

            # 4) query the top-3
            results = collection.query(
                query_embeddings=[query_vector],
                n_results=3,
                include=["documents", "distances"],
            )
            print("RESULTS", results)
            snippets = results["documents"][0]
            return "\n\n".join(snippets) if snippets else "No relevant memory found."

        except Exception as e:
            return f"Memory search failed: {e}"
