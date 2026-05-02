# Deepfake Detector

Deepfake Detector is a web application designed to help users identify synthetic media and deepfakes. It uses a modern React frontend and a Python-based backend API built with FastAPI and PyTorch for model inference and prediction.

## Features

- **Upload and Analyze:** Easily upload videos or images for deepfake detection.
- **Fast and Responsive UI:** Built with React and Vite for lightning-fast performance.
- **Beautiful Design:** Styled with Tailwind CSS for a modern, sleek interface.
- **AI-Powered Backend:** Robust, production-ready FastAPI backend using PyTorch and MTCNN for efficient batch inference, optimized face detection, and memory-efficient video processing.

## Tech Stack

- **Frontend:**
  - React 19
  - Vite
  - Tailwind CSS
  - React Router DOM
  - Lucide React (for icons)

- **Backend:**
  - Python 3.10+
  - FastAPI & Uvicorn (REST API framework)
  - PyTorch (Machine Learning framework)
  - MTCNN (facenet-pytorch for face detection)
  - OpenCV (Video and image processing)
  - Docker & Docker Compose (Containerization)

## Project Structure

```
Deepfake-Detector/
├── frontend/             # React frontend application
│   ├── src/              # Frontend source code
│   ├── package.json      # Frontend dependencies
│   ├── tailwind.config.js# Tailwind CSS configuration
│   └── vite.config.js    # Vite configuration
└── backend/              # Python FastAPI application
    ├── app/
    │   ├── core/         # Configuration and app settings
    │   ├── models/       # Machine learning models (.pth/.pt)
    │   ├── routes/       # API endpoints (`/predict/image`, `/predict/video`)
    │   ├── schemas/      # Pydantic data schemas/validation
    │   ├── services/     # Core inference service and batch processing
    │   └── utils/        # Image/video processing helpers
    ├── Dockerfile        # Backend containerization
    ├── docker-compose.yml# Multi-container orchestration
    └── requirements.txt  # Python dependencies
```

## API Endpoints

The backend exposes the following key REST endpoints:
- `GET /health` - Check API status and device (CPU/GPU) info.
- `POST /predict/image` - Analyze a single image for deepfakes.
- `POST /predict/video` - Extract frames from a video and perform batch inference to detect deepfakes.

## Getting Started

### Prerequisites

- Node.js (for the frontend)
- Python 3.10+ (for running the backend locally)
- Docker & Docker Compose (optional, for containerized backend)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

You can run the backend either locally or using Docker.

#### Option 1: Using Docker (Recommended)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Build and start the container:
   ```bash
   docker-compose up --build
   ```
The API will be available at `http://localhost:8000`.

#### Option 2: Local Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the backend server:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
