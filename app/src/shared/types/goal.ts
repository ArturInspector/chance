export type Goal = {
  description: string;
  observable_return: string;
  external_verification: string | null;
  time_horizon_days: number;
  reversibility: boolean;
  resource_constraints: {
    time: number;
    energy: number;
    attention: number;
  };
};

export type GoalValidationState =
  | { status: 'admissible'; goal: Goal }
  | { status: 'ambiguous'; missing: string[]; reasons: string[] }
  | { status: 'rejected'; reasons: string[] };

