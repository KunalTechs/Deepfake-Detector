import torch
import torch.nn as nn
import timm
import time
from typing import List
from loguru import logger
from app.core.config import settings

class DeepfakeDetector(nn.Module):
    def __init__(self):
        super().__init__()
        self.backbone = timm.create_model('efficientnet_b0', pretrained=False)
        num_features  = self.backbone.classifier.in_features
        self.backbone.classifier = nn.Sequential(
            nn.Dropout(0.3),
            nn.Linear(num_features, 1)
        )

    def forward(self, x):
        return self.backbone(x)


class InferenceService:
    def __init__(self):
        self.device = torch.device(
            settings.DEVICE if torch.cuda.is_available() else "cpu"
        )
        self.model = None

    def load_model(self):
        logger.info(f"Loading model from {settings.MODEL_PATH} to {self.device}")
        try:
            self.model = DeepfakeDetector()
            state_dict = torch.load(settings.MODEL_PATH, map_location=self.device)
            self.model.load_state_dict(state_dict)
            self.model.to(self.device)
            self.model.eval()

            # Warmup
            dummy = torch.randn(1, 3, 224, 224).to(self.device)
            with torch.no_grad():
                self.model(dummy)

            logger.info("Model loaded and warmed up successfully.")
        except Exception as e:
            logger.error(f"Failed to load model: {str(e)}")
            raise e

    @torch.no_grad()
    def predict_batch(self, tensors: List[torch.Tensor]) -> List[dict]:
        """Runs batch inference — returns list of prediction dicts."""
        if not tensors:
            return []

        if self.model is None:
            raise RuntimeError("Model not loaded. Call load_model() first.")

        start = time.time()

        batch   = torch.stack(tensors).to(self.device)
        outputs = self.model(batch)
        probs   = torch.sigmoid(outputs).squeeze(-1)

        if probs.dim() == 0:
            probs = probs.unsqueeze(0)

        results = []
        for prob in probs.cpu().numpy().tolist():
            fake_conf = float(prob)  # model_v2: high sigmoid = FAKE
            results.append({
                "prediction"     : "FAKE" if fake_conf > 0.5 else "REAL",
                "fake_confidence": round(fake_conf * 100, 2),
                "real_confidence": round((1 - fake_conf) * 100, 2)
            })

        logger.debug(
            f"Batch of {len(tensors)} frames → "
            f"{(time.time()-start)*1000:.2f}ms"
        )
        return results


# Singleton instance
inference_service = InferenceService()