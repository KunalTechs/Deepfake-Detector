import torch
import time
from typing import List, Tuple
from loguru import logger
from app.core.config import settings

class InferenceService:
    def __init__(self):
        self.device = torch.device(settings.DEVICE if torch.cuda.is_available() else "cpu")
        self.model = None

    def load_model(self):
        logger.info(f"Loading model from {settings.MODEL_PATH} to {self.device}")
        try:
            # Placeholder for your actual EfficientNet-B0 initialization
            # import timm
            # self.model = timm.create_model('efficientnet_b0', pretrained=False, num_classes=1)
            # self.model.load_state_dict(torch.load(settings.MODEL_PATH, map_location=self.device))
            
            # Dummy model for skeleton
            self.model = torch.nn.Linear(224 * 224 * 3, 1).to(self.device)
            self.model.eval()
            
            # Warmup
            dummy_input = torch.randn(1, 3, 224, 224).to(self.device)
            with torch.no_grad():
                self.model(dummy_input.flatten(1))
            logger.info("Model loaded and warmed up successfully.")
        except Exception as e:
            logger.error(f"Failed to load model: {str(e)}")
            raise e

    @torch.no_grad()
    def predict_batch(self, tensors: List[torch.Tensor]) -> List[float]:
        """Runs batch inference on a list of image tensors."""
        if not tensors:
            return []
            
        start_time = time.time()
        
        # Stack into [Batch, Channels, Height, Width]
        batch = torch.stack(tensors).to(self.device)
        
        # Inference
        if self.model is None:
            raise RuntimeError("Model is not loaded. Call load_model() first.")
        
        outputs = self.model(batch.flatten(1))
        probs = torch.sigmoid(outputs).squeeze(-1) # Assuming single output logit
        
        # Handle single vs batch output shapes
        if probs.dim() == 0:
            probs = probs.unsqueeze(0)
            
        probs_list = probs.cpu().numpy().tolist()
        
        logger.debug(f"Batch inference of {len(tensors)} frames took {(time.time()-start_time)*1000:.2f}ms")
        return probs_list

inference_service = InferenceService()
