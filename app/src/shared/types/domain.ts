export enum GoalStatus {
  Active = "active",
  Completed = "completed",
  Blocked = "blocked",
  Cancelled = "cancelled"
}

export enum ActionStatus {
  Pending = "pending",
  Available = "available",
  InProgress = "in_progress",
  Done = "done",
  Blocked = "blocked"
}

export enum CompletionStatus {
  Done = "done",
  Failed = "failed",
  Blocked = "blocked"
}

export enum BreakpointPattern {
  Time = "time",
  Energy = "energy",
  Clarity = "clarity",
  External = "external"
}

export enum EnergyLevel {
  Low = "low",
  Medium = "medium",
  High = "high"
}

export interface Goal {
  id: number;
  description: string;
  measurable: boolean;
  time_bound?: string;
  status: GoalStatus;
  created_at: string;
}

export interface Action {
  id: number;
  goal_id: number;
  description: string;
  duration_min: number;
  energy_level: EnergyLevel;
  atomic: boolean;
  status: ActionStatus;
  priority: number;
  dependencies: string;
}

export interface MES {
  action_id: number;
  description: string;
  duration_min: number;
  energy_level: EnergyLevel;
  priority: number;
  available_now: boolean;
}

export interface CompletionEvent {
  id: number;
  action_id: number;
  goal_id: number;
  status: CompletionStatus;
  timestamp: string;
  failure_reason?: string;
}

export interface Breakpoint {
  id: number;
  action_id: number;
  failure_count: number;
  pattern: BreakpointPattern;
  reasons: string;
  detected_at: string;
}

export interface GoalDetail {
  goal: Goal;
  actions: Action[];
}

export interface CreateGoalRequest {
  description: string;
  measurable?: boolean;
  time_bound?: string;
}

export interface EventRequest {
  action_id: number;
  status: string;
  failure_reason?: string;
}

export interface StatsResponse {
  mes_done_7d: number;
  stuck_goals: number;
  failure_reasons: Record<string, number>;
}

