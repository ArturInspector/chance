from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime
from enum import Enum


class GoalStatus(str, Enum):
    active = "active"
    completed = "completed"
    blocked = "blocked"
    cancelled = "cancelled"


class ActionStatus(str, Enum):
    pending = "pending"
    available = "available"
    in_progress = "in_progress"
    done = "done"
    blocked = "blocked"


class CompletionStatus(str, Enum):
    done = "done"
    failed = "failed"
    blocked = "blocked"


class BreakpointPattern(str, Enum):
    time = "time"
    energy = "energy"
    clarity = "clarity"
    external = "external"


class EnergyLevel(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


class Goal(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    description: str
    measurable: bool = True
    time_bound: Optional[datetime] = None
    status: GoalStatus = GoalStatus.active
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    actions: List["Action"] = Relationship(back_populates="goal")
    events: List["CompletionEvent"] = Relationship(back_populates="goal")


class Action(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    goal_id: int = Field(foreign_key="goal.id")
    description: str
    duration_min: int
    energy_level: EnergyLevel
    atomic: bool = True
    status: ActionStatus = ActionStatus.pending
    priority: int = 0
    dependencies: str = Field(default="[]")
    
    goal: Optional[Goal] = Relationship(back_populates="actions")
    events: List["CompletionEvent"] = Relationship(back_populates="action")
    breakpoints: List["Breakpoint"] = Relationship(back_populates="action")


class CompletionEvent(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    action_id: int = Field(foreign_key="action.id")
    goal_id: int = Field(foreign_key="goal.id")
    status: CompletionStatus
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    failure_reason: Optional[str] = None
    
    action: Optional[Action] = Relationship(back_populates="events")
    goal: Optional[Goal] = Relationship(back_populates="events")


class Breakpoint(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    action_id: int = Field(foreign_key="action.id")
    failure_count: int = 0
    pattern: BreakpointPattern
    reasons: str = Field(default="[]")
    detected_at: datetime = Field(default_factory=datetime.utcnow)
    
    action: Optional[Action] = Relationship(back_populates="breakpoints")


class MESResponse(SQLModel):
    action_id: int
    description: str
    duration_min: int
    energy_level: EnergyLevel
    priority: int
    available_now: bool

