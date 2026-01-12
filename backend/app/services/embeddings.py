from typing import List
from openai import OpenAI
from app.config import settings
from app.models import Goal
import numpy as np


def get_embedding(text: str) -> List[float]:
    if not settings.openai_api_key:
        return []
    
    client = OpenAI(api_key=settings.openai_api_key)
    
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    
    return response.data[0].embedding


def cosine_similarity(a: List[float], b: List[float]) -> float:
    if not a or not b:
        return 0.0
    
    arr_a = np.array(a)
    arr_b = np.array(b)
    
    return float(np.dot(arr_a, arr_b) / (np.linalg.norm(arr_a) * np.linalg.norm(arr_b)))


def find_similar_goals(target_goal: Goal, all_goals: List[Goal], threshold: float = 0.7) -> List[dict]:
    target_embedding = get_embedding(target_goal.description)
    
    if not target_embedding:
        return []
    
    similarities = []
    for goal in all_goals:
        if goal.id == target_goal.id:
            continue
        
        goal_embedding = get_embedding(goal.description)
        similarity = cosine_similarity(target_embedding, goal_embedding)
        
        if similarity >= threshold:
            similarities.append({
                "goal_id": goal.id,
                "description": goal.description,
                "similarity": similarity
            })
    
    similarities.sort(key=lambda x: x["similarity"], reverse=True)
    return similarities[:5]

