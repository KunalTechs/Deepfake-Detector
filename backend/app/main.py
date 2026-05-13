from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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
    logger.info("Starting up FastAPI application...")
    inference_service.load_model()
    yield
    logger.info("Shutting down application...")

app = FastAPI(title="Deepfake Detector API", lifespan=lifespan)

# ── CORS — allows React (port 3000) to call FastAPI (port 8000) ────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # ← Vite default port (your frontend)
        "http://localhost:3000",   # ← keep as fallback
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.include_router(predict.router)

@app.get("/health")
async def health_check():
    status = "healthy" if inference_service.model is not None \
             else "model_not_loaded"
    return {"status": status, "device": str(inference_service.device)}