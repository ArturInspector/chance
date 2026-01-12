from typing import List
from openai import OpenAI
from app.config import settings
from pydantic import BaseModel


class ActionDecomposition(BaseModel):
    description: str
    duration_min: int
    energy_level: str
    dependencies: List[int] = []


def decompose_goal(goal_description: str) -> List[ActionDecomposition]:
    if not settings.openai_api_key:
        return [
            ActionDecomposition(
                description=f"Step 1 for: {goal_description}",
                duration_min=30,
                energy_level="medium",
                dependencies=[]
            )
        ]
    
    client = OpenAI(api_key=settings.openai_api_key)
    
    prompt = f"""Break down this goal into 3-7 atomic actions. Each action should be:
- Measurable and completable in ≤60 minutes
- Clearly defined with specific outcomes
- Energy-aware (low/medium/high)

Goal: {goal_description}

Return JSON array with format:
[{{"description": "...", "duration_min": 30, "energy_level": "medium", "dependencies": []}}]

Keep it practical and atomic."""
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a goal decomposition expert. Break goals into atomic, measurable steps."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )
    
    import json
    result = json.loads(response.choices[0].message.content)
    return [ActionDecomposition(**item) for item in result]
