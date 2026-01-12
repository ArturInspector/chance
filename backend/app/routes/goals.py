from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List
from app.db import get_session
from app.models import Goal, Action, GoalStatus, ActionStatus, EnergyLevel, MESResponse
from app.services.decompose import decompose_service
from app.services.mes import mes_service
from pydantic import BaseModel
import json


router = APIRouter(prefix="/goals", tags=["goals"])


class CreateGoalRequest(BaseModel):
    description: str
    measurable: bool = True
    time_bound: str = None


class UpdateGoalRequest(BaseModel):
    description: str = None
    status: GoalStatus = None


class GoalDetailResponse(BaseModel):
    goal: Goal
    actions: List[Action]


@router.post("/", response_model=Goal)
def create_goal(
    request: CreateGoalRequest,
    session: Session = Depends(get_session)
):
    """Create goal with auto-decomposition."""
    
    goal = Goal(
        description=request.description,
        measurable=request.measurable
    )
    session.add(goal)
    session.commit()
    session.refresh(goal)
    
    steps = decompose_service.decompose_with_llm(request.description)
    
    for idx, step in enumerate(steps):
        action = Action(
            goal_id=goal.id,
            description=step["description"],
            duration_min=step["duration_min"],
            energy_level=EnergyLevel(step["energy_level"]),
            priority=step.get("priority", 5),
            dependencies=json.dumps(step.get("dependencies", [])),
            atomic=True,
            status=ActionStatus.available if not step.get("dependencies") else ActionStatus.pending
        )
        session.add(action)
    
    session.commit()
    session.refresh(goal)
    
    return goal


@router.get("/", response_model=List[Goal])
def list_goals(session: Session = Depends(get_session)):
    """List all goals."""
    return session.exec(select(Goal)).all()


@router.get("/{goal_id}", response_model=GoalDetailResponse)
def get_goal(goal_id: int, session: Session = Depends(get_session)):
    """Get goal details with actions."""
    goal = session.get(Goal, goal_id)
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    actions = session.exec(
        select(Action).where(Action.goal_id == goal_id)
    ).all()
    
    return GoalDetailResponse(goal=goal, actions=list(actions))


@router.patch("/{goal_id}", response_model=Goal)
def update_goal(
    goal_id: int,
    request: UpdateGoalRequest,
    session: Session = Depends(get_session)
):
    """Update goal."""
    goal = session.get(Goal, goal_id)
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    if request.description:
        goal.description = request.description
    if request.status:
        goal.status = request.status
    
    session.add(goal)
    session.commit()
    session.refresh(goal)
    
    return goal


@router.delete("/{goal_id}")
def delete_goal(goal_id: int, session: Session = Depends(get_session)):
    """Soft delete goal."""
    goal = session.get(Goal, goal_id)
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    goal.status = GoalStatus.cancelled
    session.add(goal)
    session.commit()
    
    return {"status": "deleted"}


@router.post("/{goal_id}/decompose", response_model=List[Action])
def redecompose_goal(
    goal_id: int,
    session: Session = Depends(get_session)
):
    """Regenerate decomposition for goal."""
    goal = session.get(Goal, goal_id)
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    old_actions = session.exec(
        select(Action).where(Action.goal_id == goal_id)
    ).all()
    for action in old_actions:
        session.delete(action)
    
    steps = decompose_service.decompose_with_llm(goal.description)
    
    new_actions = []
    for step in steps:
        action = Action(
            goal_id=goal.id,
            description=step["description"],
            duration_min=step["duration_min"],
            energy_level=EnergyLevel(step["energy_level"]),
            priority=step.get("priority", 5),
            dependencies=json.dumps(step.get("dependencies", [])),
            atomic=True,
            status=ActionStatus.available if not step.get("dependencies") else ActionStatus.pending
        )
        session.add(action)
        new_actions.append(action)
    
    session.commit()
    
    return new_actions


@router.get("/{goal_id}/mes", response_model=List[MESResponse])
def get_mes(
    goal_id: int,
    limit: int = 5,
    session: Session = Depends(get_session)
):
    """Get ranked Minimal Executable Steps."""
    goal = session.get(Goal, goal_id)
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    return mes_service.find_mes(session, goal_id, limit)


@router.post("/{goal_id}/similar")
def find_similar(goal_id: int, session: Session = Depends(get_session)):
    """Find similar goals using embeddings."""
    from app.services.embeddings import find_similar_goals
    
    goal = session.get(Goal, goal_id)
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    all_goals = session.exec(select(Goal)).all()
    similar = find_similar_goals(goal, all_goals)
    return similar
