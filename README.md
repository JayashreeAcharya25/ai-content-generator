# AI Content Generator

Full-stack application for generating AI-powered content for blogs, Instagram, and YouTube using Google Vertex AI.

## Architecture

- **Frontend**: Next.js + Material-UI (`console-ui/`)
- **Backend**: FastAPI + Google Vertex AI (`management-api/`)

## Quick Start

### Backend (management-api)

```bash
cd management-api
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
```

Create `.env`:
```
PROJECT_ID=your-gcp-project-id
LOCATION=us-central1
MODEL_NAME=gemini-2.5-flash
```

Run:
```bash
uvicorn app.main:app --reload --port 8000
```

### Frontend (console-ui)

```bash
cd console-ui
npm install
```

Create `.env`:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

Run:
```bash
npm run dev
```

Access at `http://localhost:3000`

## Docker

### Backend
```bash
cd management-api
docker build -t ai-content-api .
docker run -p 8000:8000 --env-file .env ai-content-api
```

## API Documentation

Swagger UI: `http://localhost:8000/docs`
