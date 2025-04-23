# main.py (FastAPI application)
# api_chat/main.py
# -----------------------------

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import Dict, Any, List
from dotenv import load_dotenv
import os

load_dotenv()

# Import your LangChain RetrievalQA chain builder
from scripts.langchain_retrieval import build_qa_chain
from langchain_core.documents import Document  # Import the Document type

app = FastAPI()

# Initialize the LangChain QA chain when the FastAPI app starts
qa_chain = build_qa_chain()

class QueryRequest(BaseModel):
    query: str

class SourceDocumentResponse(BaseModel):
    id: str = None
    metadata: Dict[str, Any]
    page_content_preview: str = None

class QueryResponse(BaseModel):
    result: str

@app.post("/query/", response_model=QueryResponse)
async def query_langchain(request: QueryRequest):
    """
    Endpoint to query the LangChain RetrievalQA.
    """
    try:
        result = qa_chain({"query": request.query})


        return QueryResponse(result=result["result"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)