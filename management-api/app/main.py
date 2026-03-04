from fastapi import FastAPI
from app.api.routes import story
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AI Content Generator",
    description="API for generating blog posts, Instagram captions, and YouTube descriptions using AI",
    version="1.0.0",
    docs_url="/docs",
)

# Cors
origins = [
    "http://localhost:3000",  # Example frontend development server
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  # Set to True if you need to support cookies or authorization headers
    allow_methods=["*"],     # Allows all standard methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],     # Allows all headers
)

app.include_router(story.router, prefix="/api/story")