from pydantic import BaseModel

class StoryResponse(BaseModel):
    blog: str
    instagram_caption: str
    youtube_description: str