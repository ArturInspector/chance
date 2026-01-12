from typing import List
from app.models import CompletionEvent, BreakpointPattern, Breakpoint
from datetime import datetime


def detect_breakpoints(events: List[CompletionEvent]) -> List[dict]:
    action_failures = {}
    
    for event in events:
        if event.status.value == "failed":
            if event.action_id not in action_failures:
                action_failures[event.action_id] = []
            action_failures[event.action_id].append(event)
    
    breakpoints = []
    for action_id, failures in action_failures.items():
        if len(failures) >= 2:
            reasons = [f.failure_reason for f in failures if f.failure_reason]
            
            pattern = BreakpointPattern.time
            if reasons:
                if "energy" in reasons[0]:
                    pattern = BreakpointPattern.energy
                elif "clarity" in reasons[0]:
                    pattern = BreakpointPattern.clarity
                elif "external" in reasons[0]:
                    pattern = BreakpointPattern.external
            
            breakpoints.append({
                "action_id": action_id,
                "failure_count": len(failures),
                "pattern": pattern,
                "reasons": reasons
            })
    
    return breakpoints
