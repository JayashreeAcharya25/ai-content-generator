from pydantic import BaseModel
from typing import List

class TravelInput(BaseModel):
    bullet_points: List[str]
    emotional_answers: List[str] | None = None