from fastapi import FastAPI
from contextlib import asynccontextmanager
from loguru import logger
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.services.inference import inference_service
from app.routes import predict

limiter = Limiter(key_func=get_remote_address)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting up FastAPI application...")
    inference_service.load_model()
    yield
    # Shutdown
    logger.info("Shutting down application...")

app = FastAPI(title="Deepfake Detector API", lifespan=lifespan)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)  # type: ignore

app.include_router(predict.router)

@app.get("/health")
async def health_check():
    status = "healthy" if inference_service.model is not None else "model_not_loaded"
    return {"status": status, "device": str(inference_service.device)}