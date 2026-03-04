from fastapi import APIRouter
from app.models.request_models import TravelInput
from app.services.ai_service import generate_story

router = APIRouter()

@router.post('/generate')

async def create_story(data: TravelInput):
    return await generate_story(data)
    