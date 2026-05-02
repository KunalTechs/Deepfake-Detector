from pydantic import BaseModel
from typing import List, Optional

class FrameResult(BaseModel):
    frame_index: int
    prediction: str
    fake_confidence: float
    real_confidence: float
    face_detected: bool
    face_bbox: Optional[List[float]] = None

class PredictionResponse(BaseModel):
    overall_prediction: str
    fake_confidence: float
    real_confidence: float
    frames_analyzed: int
    processing_time_ms: int
    frame_results: List[FrameResult]
    message: str
