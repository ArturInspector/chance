import pytest
from app.services.breakpoints import detect_breakpoints
from app.models import CompletionEvent, CompletionStatus, BreakpointPattern
from datetime import datetime


def test_detect_breakpoints_single_failure():
    events = [
        CompletionEvent(
            id=1,
            action_id=1,
            goal_id=1,
            status=CompletionStatus.failed,
            failure_reason="time constraint",
            timestamp=datetime.utcnow()
        )
    ]
    
    result = detect_breakpoints(events)
    
    assert len(result) == 0


def test_detect_breakpoints_multiple_failures():
    events = [
        CompletionEvent(
            id=1,
            action_id=1,
            goal_id=1,
            status=CompletionStatus.failed,
            failure_reason="time constraint",
            timestamp=datetime.utcnow()
        ),
        CompletionEvent(
            id=2,
            action_id=1,
            goal_id=1,
            status=CompletionStatus.failed,
            failure_reason="time constraint",
            timestamp=datetime.utcnow()
        )
    ]
    
    result = detect_breakpoints(events)
    
    assert len(result) == 1
    assert result[0]["action_id"] == 1
    assert result[0]["failure_count"] == 2
    assert result[0]["pattern"] == BreakpointPattern.time


def test_detect_breakpoints_energy_pattern():
    events = [
        CompletionEvent(
            id=1,
            action_id=2,
            goal_id=1,
            status=CompletionStatus.failed,
            failure_reason="energy too low",
            timestamp=datetime.utcnow()
        ),
        CompletionEvent(
            id=2,
            action_id=2,
            goal_id=1,
            status=CompletionStatus.failed,
            failure_reason="energy issue",
            timestamp=datetime.utcnow()
        )
    ]
    
    result = detect_breakpoints(events)
    
    assert len(result) == 1
    assert result[0]["pattern"] == BreakpointPattern.energy


def test_detect_breakpoints_mixed_actions():
    events = [
        CompletionEvent(
            id=1,
            action_id=1,
            goal_id=1,
            status=CompletionStatus.done,
            timestamp=datetime.utcnow()
        ),
        CompletionEvent(
            id=2,
            action_id=2,
            goal_id=1,
            status=CompletionStatus.failed,
            failure_reason="clarity issue",
            timestamp=datetime.utcnow()
        ),
        CompletionEvent(
            id=3,
            action_id=2,
            goal_id=1,
            status=CompletionStatus.failed,
            failure_reason="clarity unclear",
            timestamp=datetime.utcnow()
        )
    ]
    
    result = detect_breakpoints(events)
    
    assert len(result) == 1
    assert result[0]["action_id"] == 2
    assert result[0]["pattern"] == BreakpointPattern.clarity
