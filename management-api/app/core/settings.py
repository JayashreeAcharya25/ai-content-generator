from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_ID: str
    LOCATION: str
    MODEL_NAME: str

    class Config:
        env_file = ".env"

settings = Settings()