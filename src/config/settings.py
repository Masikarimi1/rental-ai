import os

from pydantic_settings import BaseSettings
from dotenv import load_dotenv

# Ensure .env is loaded manually
load_dotenv()

class Settings(BaseSettings):
    openai_api_key: str
    fhir_api_base_url: str
    ncbi_email: str

    class Config:
        env_file = ".env"

# Create a settings instance
settings = Settings()
print(os.getenv('openai_api_key'))
