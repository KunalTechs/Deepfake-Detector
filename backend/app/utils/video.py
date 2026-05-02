import cv2
import tempfile
import os
from typing import Generator
from app.core.config import settings

def extract_frames(video_bytes: bytes, target_frame_count: int = settings.MAX_VIDEO_FRAMES) -> Generator[bytes, None, None]:
    """Yields JPEG bytes for uniformly sampled frames."""
    
    # OpenCV requires a file on disk
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as temp_video:
        temp_video.write(video_bytes)
        temp_path = temp_video.name

    try:
        cap = cv2.VideoCapture(temp_path)
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        
        if total_frames == 0:
            raise ValueError("Corrupted video or unsupported format")

        # Skip first 10% and last 10%
        start_frame = int(total_frames * 0.1)
        end_frame = int(total_frames * 0.9)
        usable_frames = end_frame - start_frame
        
        if usable_frames <= 0:
            start_frame = 0
            end_frame = total_frames
            usable_frames = total_frames

        # Calculate step for uniform sampling
        actual_target = min(target_frame_count, settings.MAX_VIDEO_FRAMES)
        actual_target = max(actual_target, settings.MIN_VIDEO_FRAMES)
        
        step = max(1, usable_frames // actual_target)
        
        frames_extracted = 0
        current_frame = start_frame
        
        while current_frame < end_frame and frames_extracted < actual_target:
            cap.set(cv2.CAP_PROP_POS_FRAMES, current_frame)
            ret, frame = cap.read()
            if not ret:
                break
                
            # Encode frame to bytes to simulate an image upload per frame
            success, buffer = cv2.imencode(".jpg", frame)
            if success:
                yield buffer.tobytes()
                frames_extracted += 1
                
            current_frame += step
            
    finally:
        cap.release()
        os.remove(temp_path) # Clean up!
