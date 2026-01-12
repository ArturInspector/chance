from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List, Optional
from app.db import get_session
from app.models import CompletionEvent, CompletionStatus, Action, ActionStatus
from app.services.breakpoints import breakpoint_service
from pydantic import BaseModel
from datetime import datetime


router = APIRouter(prefix="/events", tags=["events"])


class LogEventRequest(BaseModel):
    action_id: int
    status: CompletionStatus
    failure_reason: Optional[str] = None


class BatchLogRequest(BaseModel):
    events: List[LogEventRequest]


@router.post("/", response_model=CompletionEvent)
def log_event(
    request: LogEventRequest,
    session: Session = Depends(get_session)
):
    """Log completion event for an action."""
    
    action = session.get(Action, request.action_id)
    if not action:
        raise HTTPException(status_code=404, detail="Action not found")
    
    event = CompletionEvent(
        action_id=request.action_id,
        goal_id=action.goal_id,
        status=request.status,
        failure_reason=request.failure_reason
    )
    session.add(event)
    
    if request.status == CompletionStatus.done:
        action.status = ActionStatus.done
    elif request.status == CompletionStatus.blocked:
        action.status = ActionStatus.blocked
    
    session.add(action)
    session.commit()
    session.refresh(event)
    
    if request.status in [CompletionStatus.failed, CompletionStatus.blocked]:
        breakpoint_service.detect_breakpoints(session, request.action_id)
    
    return event


@router.get("/", response_model=List[CompletionEvent])
def get_events(
    goal_id: Optional[int] = None,
    action_id: Optional[int] = None,
    session: Session = Depends(get_session)
):
    """Get event history with optional filters."""
    
    statement = select(CompletionEvent)
    
    if goal_id:
        statement = statement.where(CompletionEvent.goal_id == goal_id)
    if action_id:
        statement = statement.where(CompletionEvent.action_id == action_id)
    
    statement = statement.order_by(CompletionEvent.timestamp.desc())
    
    return session.exec(statement).all()


@router.post("/batch", response_model=List[CompletionEvent])
def log_batch_events(
    request: BatchLogRequest,
    session: Session = Depends(get_session)
):
    """Log multiple events at once."""
    
    events = []
    
    for event_req in request.events:
        action = session.get(Action, event_req.action_id)
        if not action:
            continue
        
        event = CompletionEvent(
            action_id=event_req.action_id,
            goal_id=action.goal_id,
            status=event_req.status,
            failure_reason=event_req.failure_reason
        )
        session.add(event)
        events.append(event)
        
        if event_req.status == CompletionStatus.done:
            action.status = ActionStatus.done
        elif event_req.status == CompletionStatus.blocked:
            action.status = ActionStatus.blocked
        
        session.add(action)
    
    session.commit()
    
    return events
