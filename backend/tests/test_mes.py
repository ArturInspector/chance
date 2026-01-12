import pytest
from app.services.mes import find_mes
from app.models import Action, ActionStatus, EnergyLevel


def test_find_mes_with_no_dependencies():
    actions = [
        Action(
            id=1,
            goal_id=1,
            description="Action 1",
            duration_min=30,
            energy_level=EnergyLevel.medium,
            priority=5,
            status=ActionStatus.pending,
            dependencies="[]"
        ),
        Action(
            id=2,
            goal_id=1,
            description="Action 2",
            duration_min=15,
            energy_level=EnergyLevel.low,
            priority=8,
            status=ActionStatus.pending,
            dependencies="[]"
        )
    ]
    
    result = find_mes(actions)
    
    assert len(result) == 2
    assert result[0].action_id == 2
    assert result[0].priority == 8


def test_find_mes_with_dependencies():
    actions = [
        Action(
            id=1,
            goal_id=1,
            description="Action 1",
            duration_min=30,
            energy_level=EnergyLevel.medium,
            priority=5,
            status=ActionStatus.done,
            dependencies="[]"
        ),
        Action(
            id=2,
            goal_id=1,
            description="Action 2",
            duration_min=15,
            energy_level=EnergyLevel.low,
            priority=8,
            status=ActionStatus.pending,
            dependencies="[1]"
        ),
        Action(
            id=3,
            goal_id=1,
            description="Action 3",
            duration_min=20,
            energy_level=EnergyLevel.high,
            priority=6,
            status=ActionStatus.pending,
            dependencies="[1]"
        )
    ]
    
    result = find_mes(actions)
    
    assert len(result) == 2
    assert result[0].action_id == 2


def test_find_mes_blocked_actions():
    actions = [
        Action(
            id=1,
            goal_id=1,
            description="Action 1",
            duration_min=30,
            energy_level=EnergyLevel.medium,
            priority=5,
            status=ActionStatus.blocked,
            dependencies="[]"
        )
    ]
    
    result = find_mes(actions)
    
    assert len(result) == 0
