# AI Content Generator - Backend API

FastAPI-based backend service that generates content for blogs, Instagram, and YouTube using Google Vertex AI (Gemini).

## Tech Stack

- **Framework**: FastAPI
- **AI Service**: Google Vertex AI (Gemini 2.5 Flash)
- **Python**: 3.x

## Project Structure

```
management-api/
├── app/
│   ├── api/routes/      # API endpoints
│   ├── core/            # Configuration
│   ├── models/          # Request/Response models
│   ├── services/        # Business logic
│   └── utils/           # Helper functions
├── .env                 # Environment variables
├── requirements.txt     # Dependencies
└── main.py             # Application entry point
```

## Setup

1. **Create virtual environment**:
```bash
python -m venv env
env\Scripts\activate  # Windows
```

2. **Install dependencies**:
```bash
pip install -r requirements.txt
```

3. **Configure environment variables** (`.env`):
```
PROJECT_ID=your-gcp-project-id
LOCATION=us-central1
MODEL_NAME=gemini-2.5-flash
```

4. **Run the server**:
```bash
uvicorn app.main:app --reload --port 8000
```

## API Endpoints

### Generate Content
- **POST** `/api/story/generate`
- **Body**:
```json
{
  "bullet_points": ["Point 1", "Point 2"],
  "emotional_answers": ["Answer 1", "Answer 2"]
}
```
- Generates content for any topic: travel, fitness, lifestyle, etc.
```

### API Documentation
- Swagger UI: `http://localhost:8000/docs`

## CORS Configuration

Allowed origins:
- `http://localhost:3000`
- `http://127.0.0.1:3000`
