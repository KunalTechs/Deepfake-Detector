/**
 * Mock API Service
 * This will connect to the FastAPI backend later.
 */

export const analyzeMedia = async (file) => {
  // Simulate network delay for effect
  await new Promise(resolve => setTimeout(resolve, 2500));

  // Mock response based on file name or random
  const isFake = Math.random() > 0.5;
  const confidence = (Math.random() * (0.99 - 0.75) + 0.75).toFixed(4); // 75% to 99%

  return {
    success: true,
    result: isFake ? 'Fake' : 'Real',
    confidence: parseFloat(confidence),
    analyzed_at: new Date().toISOString(),
    details: {
      faces_detected: 1,
      artifacts_found: isFake ? Math.floor(Math.random() * 5) + 1 : 0
    }
  };
};
