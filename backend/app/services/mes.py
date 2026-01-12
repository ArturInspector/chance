from typing import List
import json
from app.models import Action, ActionStatus, MESResponse


def find_mes(actions: List[Action]) -> List[MESResponse]:
    available_actions = []
    
    for action in actions:
        if action.status == ActionStatus.done or action.status == ActionStatus.blocked:
            continue
        
        dependencies = json.loads(action.dependencies) if action.dependencies else []
        
        all_deps_met = True
        for dep_id in dependencies:
            dep_action = next((a for a in actions if a.id == dep_id), None)
            if not dep_action or dep_action.status != ActionStatus.done:
                all_deps_met = False
                break
        
        if all_deps_met:
            available_actions.append(action)
    
    available_actions.sort(key=lambda a: (-a.priority, a.duration_min))
    
    return [
        MESResponse(
            action_id=action.id,
            description=action.description,
            duration_min=action.duration_min,
            energy_level=action.energy_level,
            priority=action.priority,
            available_now=True
        )
        for action in available_actions
    ]
