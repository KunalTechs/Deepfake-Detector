from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    MODEL_PATH: str = "app/models/model_v3.pt"  # ← changed
    DEVICE: str = "cuda"
    MAX_FILE_SIZE_MB: int = 50
    MAX_VIDEO_FRAMES: int = 20
    MIN_VIDEO_FRAMES: int = 10
    FACE_MIN_SIZE: int = 80
    REQUEST_TIMEOUT_SECONDS: int = 30
    RATE_LIMIT: str = "100/hour"

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()