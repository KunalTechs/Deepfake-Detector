// Works in both dev (proxied to localhost:8000)
// and Docker (proxied to backend:8000)
const API_URL = import.meta.env.VITE_API_URL || "/api";

export async function checkHealth() {
  try {
    const res = await fetch(`${API_URL}/health`);
    return await res.json();
  } catch {
    return { status: "offline" };
  }
}

export const analyzeMedia = async (file) => {
  const isVideo = file.type.startsWith("video/");
  const endpoint = isVideo
    ? `${API_URL}/predict/video`
    : `${API_URL}/predict/image`;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || "Prediction failed");
    }

    const data = await res.json();
    console.log("API response:", data);

    return {
      success: true,
      result: data.overall_prediction,
      confidence: data.fake_confidence / 100,
      real_confidence: data.real_confidence / 100,
      analyzed_at: new Date().toISOString(),
      details: {
        faces_detected: data.frames_analyzed,
        artifacts_found: data.frame_results.filter(
          (f) => f.prediction === "FAKE",
        ).length,
        processing_ms: data.processing_time_ms,
        frames_analyzed: data.frames_analyzed,
        frame_results: data.frame_results,
        message: data.message,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || "Could not connect to backend",
    };
  }
};
