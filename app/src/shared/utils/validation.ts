import type { Goal, GoalValidationState } from '../types/goal';

export function validateGoal(goal: Partial<Goal>): GoalValidationState {
  const missing: string[] = [];
  const reasons: string[] = [];

  if (!goal.description || goal.description.trim() === '') {
    missing.push('description');
  }

  if (!goal.observable_return || goal.observable_return.trim() === '') {
    missing.push('observable_return');
  } else {
    const observable = goal.observable_return.trim();
    if (observable.length < 10) {
      reasons.push('observable_return must be specific and measurable (at least 10 characters)');
    }
    const vagueWords = ['something', 'better', 'improve', 'good', 'nice'];
    const hasVagueWords = vagueWords.some(word => 
      observable.toLowerCase().includes(word)
    );
    if (hasVagueWords && observable.length < 30) {
      reasons.push('observable_return is too vague - be more specific about what changes in reality');
    }
  }

  if (goal.external_verification === undefined) {
    missing.push('external_verification');
  } else if (goal.external_verification !== null) {
    if (goal.external_verification.trim() === '') {
      reasons.push('external_verification cannot be an empty string - use null if not applicable');
    } else if (goal.external_verification.trim().length < 10) {
      reasons.push('external_verification must clearly specify who or what can verify this externally');
    }
  }

  if (goal.time_horizon_days === undefined || goal.time_horizon_days === null) {
    missing.push('time_horizon_days');
  } else {
    if (goal.time_horizon_days <= 0) {
      reasons.push('time_horizon_days must be greater than 0');
    }
    if (goal.time_horizon_days > 36500) {
      reasons.push('time_horizon_days is unrealistic (more than 100 years)');
    }
  }

  if (goal.reversibility === undefined || goal.reversibility === null) {
    missing.push('reversibility');
  }

  if (!goal.resource_constraints) {
    missing.push('resource_constraints');
  } else {
    const { time, energy, attention } = goal.resource_constraints;
    if (time === undefined || time === null) {
      missing.push('resource_constraints.time');
    } else if (time < 0) {
      reasons.push('resource_constraints.time cannot be negative');
    }
    if (energy === undefined || energy === null) {
      missing.push('resource_constraints.energy');
    } else if (energy < 0) {
      reasons.push('resource_constraints.energy cannot be negative');
    }
    if (attention === undefined || attention === null) {
      missing.push('resource_constraints.attention');
    } else if (attention < 0) {
      reasons.push('resource_constraints.attention cannot be negative');
    }

    if (time !== undefined && energy !== undefined && attention !== undefined) {
      const total = time + energy + attention;
      if (total === 0) {
        reasons.push('resource_constraints must have at least one non-zero value');
      }
      if (total > 1000) {
        reasons.push('resource_constraints sum is unreasonably high (total > 1000)');
      }
    }
  }

  if (missing.length > 0) {
    return {
      status: 'ambiguous',
      missing,
      reasons: reasons.length > 0 ? reasons : [`Missing required fields: ${missing.join(', ')}`]
    };
  }

  if (reasons.length > 0) {
    return {
      status: 'rejected',
      reasons
    };
  }

  return {
    status: 'admissible',
    goal: goal as Goal
  };
}

