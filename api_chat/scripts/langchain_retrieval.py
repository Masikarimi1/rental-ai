# langchain_retrieval.py
# ----------------------
# A simple RetrievalQA chain using LangChain and Chroma

import os
from pathlib import Path
from dotenv import load_dotenv

# 1) New, post-0.2.0 embeddings & vectorstore packages
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_community.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate

from langchain.chains import RetrievalQA

load_dotenv()

BASE_DIR    = Path(__file__).resolve().parent.parent
MEMORY_DIR  = BASE_DIR / "memory"
CHROMA_DIR  = MEMORY_DIR / "chroma_db"

def build_qa_chain(
    persist_directory: str = str(CHROMA_DIR),      # cast Path -> str
    collection_name: str = "crew_short_term_memory",
    embedding_model: str = "text-embedding-3-small",
    llm_model: str = "gpt-4o",
) -> RetrievalQA:
    """
    Constructs a RetrievalQA chain that:
      1. Loads a Chroma vectorstore from disk.
      2. Uses OpenAIEmbeddings to embed user queries.
      3. Uses ChatOpenAI (or any LLM) to answer based on retrieved docs.
    """

    # 1) Embeddings from langchain-openai
    embeddings = OpenAIEmbeddings(
        model=embedding_model,
        openai_api_key=os.getenv("openai_api_key"),
    )

    # 2) Load (or create) your Chroma collection
    vectordb = Chroma(
        persist_directory=persist_directory,      # now always a str
        collection_name=collection_name,
        embedding_function=embeddings,
    )

    # 3) Retriever
    retriever = vectordb.as_retriever(search_kwargs={"k": 5})

    # 4) LLM from langchain-community
    llm = ChatOpenAI(model_name=llm_model, temperature=0)
    # …
    _template = """
    You are an AI who specializes in real estate market analysis.

    Use ONLY the following excerpts from our documents:
    {context}

    When you answer, summarize the answer and be concise and factual.

    Question: {question}
    Answer:
    """

    PROMPT = PromptTemplate(
        input_variables=["context", "question"],  # <- now matches what the chain provides
        template=_template
    )

    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs={"prompt": PROMPT},
        # question_key defaults to "question"
    )

    return qa  # Return the created RetrievalQA object


if __name__ == "__main__":
    chain = build_qa_chain()
    print("LangChain RetrievalQA is ready!\n")

    query = "how did you calculate roi"

    result = chain({"query": query})
    print("\n📝 Answer:\n", result["result"], "\n")