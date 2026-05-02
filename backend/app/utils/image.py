import cv2
import torch
import numpy as np
from facenet_pytorch import MTCNN
from typing import Tuple, Optional, List
from loguru import logger
from app.core.config import settings
from PIL import Image

# Global caching of MTCNN
device = torch.device(settings.DEVICE if torch.cuda.is_available() else "cpu")
mtcnn = MTCNN(
    keep_all=True, # Find all faces to pick the largest
    min_face_size=settings.FACE_MIN_SIZE,
    device=device,
    post_process=False # We handle our own standardizations
)

def process_image_for_model(image_bytes: bytes) -> Tuple[torch.Tensor, bool, Optional[List[float]]]:
    """Returns (Tensor, face_detected, bounding_box)"""
    # 1. Read Image
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError("Invalid image data")
        
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    pil_img = Image.fromarray(img_rgb)
    
    # 2. Detect Faces
    boxes, probs = mtcnn.detect(pil_img)  # type: ignore
    
    face_detected = False
    bbox = None
    target_size = (224, 224)
    
    if boxes is not None and len(boxes) > 0:
        # Pick the largest face
        largest_idx = np.argmax([(b[2]-b[0]) * (b[3]-b[1]) for b in boxes])
        box = boxes[largest_idx]
        
        # Apply margin (simplified)
        margin = 20
        x1, y1, x2, y2 = [int(b) for b in box]
        x1, y1 = max(0, x1 - margin), max(0, y1 - margin)
        x2, y2 = min(img.shape[1], x2 + margin), min(img.shape[0], y2 + margin)
        
        cropped = img_rgb[y1:y2, x1:x2]
        final_img = cv2.resize(cropped, target_size)
        face_detected = True
        bbox = [float(x1), float(y1), float(x2), float(y2)]
    else:
        # Fallback: Resize entire image
        logger.warning("No face detected, falling back to full image resize")
        final_img = cv2.resize(img_rgb, target_size)
    
    # 3. Convert to PyTorch Tensor format [C, H, W] and normalize
    tensor = torch.from_numpy(final_img).permute(2, 0, 1).float() / 255.0
    
    # Basic normalization (ImageNet standards or specific to your EfficientNet)
    mean = torch.tensor([0.485, 0.456, 0.406]).view(3, 1, 1)
    std = torch.tensor([0.229, 0.224, 0.225]).view(3, 1, 1)
    tensor = (tensor - mean) / std
    
    return tensor, face_detected, bbox
