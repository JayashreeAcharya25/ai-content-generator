import json, asyncio, re
from typing import List
from google.cloud import aiplatform
from vertexai.generative_models import GenerativeModel
from app.models.request_models import TravelInput
from app.models.response_models import StoryResponse
from app.services.prompt_builder import build_stroy_prompt
from app.core.settings import settings

# Initialize the Vertex AI
aiplatform.init(
    project = settings.PROJECT_ID,
    location= settings.LOCATION
)

# Load Gemini model
model = GenerativeModel(settings.MODEL_NAME)

async def generate_story(data: TravelInput) -> StoryResponse :

    # Build prompt 
    prompt = build_stroy_prompt(
        bullet_points=data.bullet_points,
        answers=data.emotional_answers
    )

    # Force structure JSON output from model
    structured_prompt = f"""
        {prompt}

        You are a professional human travel blogger and content strategist.

        Write content that:
        - Feels 100% human-written
        - Sounds natural and personal
        - Avoids robotic or AI tone
        - Avoids clichés and generic travel phrases
        - Is original and plagiarism-free
        - Uses storytelling with sensory details (sight, sound, smell, emotion)
        - Includes natural SEO keywords without keyword stuffing
        - Uses short and long sentence variation for human rhythm
        - Feels authentic, reflective, and emotionally real

        BLOG REQUIREMENTS:
        - Around 500 words
        - Real blog headline (not generic) and Not more than 60 characters, SEO-friendly, Catchy and emotionally compelling
        - First-person storytelling
        - Hook readers in the first 2–3 lines
        - Include subtle SEO optimization naturally
        - End with a reflective or meaningful closing thought
        - Should not sound like AI-generated content
        - Include 8–12 relevant and trending hashtags
        - Use markdown formatting for headings, lists, and emphasis where appropriate

        INSTAGRAM CAPTION REQUIREMENTS:
        - Scroll-stopping first line
        - Emotional + relatable tone
        - Include emojis naturally (not too many)
        - Include 8–12 relevant and trending hashtags
        - Encourage engagement (question or call-to-action)

        YOUTUBE DESCRIPTION REQUIREMENTS:
        - Strong SEO-optimized first 2 lines (very important for algorithm)
        - Include searchable keywords naturally
        - Add value summary of the story
        - Include 10–15 relevant and trending hashtags at the bottom
        - Add soft call-to-action (subscribe, comment, etc.)
        - Should feel compelling and clickable

        Return response strictly in JSON format like this:

        {{
        "blog": "...",
        "instagram_caption": "...",
        "youtube_description": "..."
        }}

        Do NOT include explanations.
        Do NOT wrap in markdown.
        Return ONLY valid JSON.
        """

    # call gemini asynchronously
    response = await asyncio.to_thread(
        model.generate_content,
        structured_prompt,
        generation_config={
            "temperature": 0.8,
            # bump token limit; 2k was causing truncation during longer blogs
            "max_output_tokens": 4096
        }
    )

    raw_text = response.text
    
    try:
        parsed_output = json.loads(raw_text)
    except json.JSONDecodeError:
        # Fallback if model wraps JSON in markdown
        cleaned_text = raw_text.strip("```json").strip("```")
        parsed_output = json.loads(cleaned_text)

    # Return structured response
    return StoryResponse(
        blog=parsed_output["blog"],
        instagram_caption=parsed_output["instagram_caption"],
        youtube_description=parsed_output["youtube_description"]
    )