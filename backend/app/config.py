from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    openai_api_key: str = ""
    anthropic_api_key: str = ""
    database_url: str = "sqlite:///./chance.db"
    
    class Config:
        env_file = ".env"


settings = Settings()

