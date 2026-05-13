import time
import asyncio
from fastapi import APIRouter, UploadFile, File, HTTPException, Request
from app.schemas.request import PredictionResponse, FrameResult
from app.services.inference import inference_service
from app.utils.image import process_image_for_model
from app.utils.video import extract_frames
from app.core.config import settings

router = APIRouter(prefix="/predict", tags=["Prediction"])

@router.post("/image", response_model=PredictionResponse)
async def predict_image(request: Request, file: UploadFile = File(...)):
    start_time = time.time()

    if file.size is not None and file.size > settings.MAX_FILE_SIZE_MB * 1024 * 1024:
        raise HTTPException(status_code=413, detail="File too large")

    image_bytes = await file.read()

    try:
        tensor, face_detected, bbox = await asyncio.to_thread(
            process_image_for_model, image_bytes)

        # predict_batch returns List[dict]
        results   = await asyncio.to_thread(
            inference_service.predict_batch, [tensor])
        pred_dict = results[0]  # ← dict not float

        result = FrameResult(
            frame_index    = 0,
            prediction     = pred_dict["prediction"],
            fake_confidence= pred_dict["fake_confidence"],
            real_confidence= pred_dict["real_confidence"],
            face_detected  = face_detected,
            face_bbox      = bbox
        )

        processing_time = int((time.time() - start_time) * 1000)

        return PredictionResponse(
            overall_prediction = result.prediction,
            fake_confidence    = result.fake_confidence,
            real_confidence    = result.real_confidence,
            frames_analyzed    = 1,
            processing_time_ms = processing_time,
            frame_results      = [result],
            message            = "Image analyzed successfully."
        )

    except Exception as e:
        raise HTTPException(status_code=422,
                            detail=f"Failed to process image: {str(e)}")


@router.post("/video", response_model=PredictionResponse)
async def predict_video(request: Request, file: UploadFile = File(...)):
    start_time = time.time()

    if file.size is not None and file.size > settings.MAX_FILE_SIZE_MB * 1024 * 1024:
        raise HTTPException(status_code=413, detail="File too large")

    video_bytes = await file.read()

    try:
        frames_bytes = await asyncio.to_thread(
            lambda: list(extract_frames(video_bytes)))

        if not frames_bytes:
            raise HTTPException(status_code=422,
                                detail="Could not extract frames from video")

        # Process frames to tensors
        tensors        = []
        frame_metadata = []

        for idx, f_bytes in enumerate(frames_bytes):
            tensor, face_detected, bbox = await asyncio.to_thread(
                process_image_for_model, f_bytes)
            tensors.append(tensor)
            frame_metadata.append((idx, face_detected, bbox))

        # Batch inference — returns List[dict]
        results = await asyncio.to_thread(
            inference_service.predict_batch, tensors)

        # Aggregate results
        frame_results     = []
        fake_frames_count = 0

        for (idx, face, bbox), pred_dict in zip(frame_metadata, results):
            if pred_dict["prediction"] == "FAKE":
                fake_frames_count += 1

            frame_results.append(FrameResult(
                frame_index    = idx,
                prediction     = pred_dict["prediction"],
                fake_confidence= pred_dict["fake_confidence"],
                real_confidence= pred_dict["real_confidence"],
                face_detected  = face,
                face_bbox      = bbox
            ))

        avg_fake = sum(r.fake_confidence for r in frame_results) / len(frame_results)
        overall  = "FAKE" if avg_fake > 50 else "REAL"
        processing_time = int((time.time() - start_time) * 1000)

        return PredictionResponse(
            overall_prediction = overall,
            fake_confidence    = round(avg_fake, 2),
            real_confidence    = round(100 - avg_fake, 2),
            frames_analyzed    = len(frames_bytes),
            processing_time_ms = processing_time,
            frame_results      = frame_results,
            message            = f"{fake_frames_count}/{len(frames_bytes)} frames detected as fake"
        )

    except Exception as e:
        raise HTTPException(status_code=500,
                            detail=f"Video processing failed: {str(e)}")