from fastapi import APIRouter, Depends
from sqlmodel import Session, select, func
from datetime import datetime, timedelta
from typing import List
from app.db import get_session
from app.models import CompletionEvent, CompletionStatus, Goal, GoalStatus, Breakpoint, BreakpointPattern

router = APIRouter(prefix="/stats", tags=["stats"])


@router.get("/summary")
def get_summary(session: Session = Depends(get_session)):
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    
    mes_done_7d = session.exec(
        select(func.count(CompletionEvent.id))
        .where(CompletionEvent.status == CompletionStatus.done)
        .where(CompletionEvent.timestamp >= seven_days_ago)
    ).one()
    
    stuck_goals = session.exec(
        select(func.count(Goal.id))
        .where(Goal.status == GoalStatus.blocked)
    ).one()
    
    failure_reasons = session.exec(
        select(CompletionEvent.failure_reason, func.count(CompletionEvent.id))
        .where(CompletionEvent.status == CompletionStatus.failed)
        .where(CompletionEvent.timestamp >= seven_days_ago)
        .where(CompletionEvent.failure_reason.isnot(None))
        .group_by(CompletionEvent.failure_reason)
    ).all()
    
    return {
        "mes_done_7d": mes_done_7d,
        "stuck_goals": stuck_goals,
        "failure_reasons": dict(failure_reasons)
    }


@router.get("/parasitic")
def get_parasitic_procedures(session: Session = Depends(get_session)):
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    
    patterns = session.exec(
        select(Breakpoint.pattern, func.count(Breakpoint.id))
        .where(Breakpoint.detected_at >= seven_days_ago)
        .group_by(Breakpoint.pattern)
    ).all()
    
    negative_utility_actions = session.exec(
        select(CompletionEvent.action_id, func.count(CompletionEvent.id).label("failure_count"))
        .where(CompletionEvent.status == CompletionStatus.failed)
        .where(CompletionEvent.timestamp >= seven_days_ago)
        .group_by(CompletionEvent.action_id)
        .having(func.count(CompletionEvent.id) >= 3)
    ).all()
    
    return {
        "breakpoint_patterns": dict(patterns),
        "negative_utility_actions": [{"action_id": aid, "failure_count": fc} for aid, fc in negative_utility_actions]
    }


@router.get("/prediction")
def get_prediction(session: Session = Depends(get_session)):
    breakpoints = session.exec(
        select(Breakpoint.pattern, func.count(Breakpoint.id))
        .group_by(Breakpoint.pattern)
    ).all()
    
    pattern_risks = []
    for pattern, count in breakpoints:
        total_events = session.exec(
            select(func.count(CompletionEvent.id))
        ).one()
        
        risk_percentage = (count / max(total_events, 1)) * 100
        pattern_risks.append({
            "pattern": pattern,
            "count": count,
            "risk_percentage": round(risk_percentage, 2)
        })
    
    pattern_risks.sort(key=lambda x: x["risk_percentage"], reverse=True)
    
    return {
        "breakpoint_predictions": pattern_risks
    }

