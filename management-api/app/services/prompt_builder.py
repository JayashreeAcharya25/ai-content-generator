def build_stroy_prompt(bullet_points, answers):
    return f"""
    Create a storytelling blog based on:
    Bullet Points: {bullet_points}
    Emotional reflections: {answers}
"""