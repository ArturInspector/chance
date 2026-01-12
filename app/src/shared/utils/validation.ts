import type { Goal, GoalValidationState } from '../types/goal';

export function validateGoal(goal: Partial<Goal>): GoalValidationState {
  const missing: string[] = [];
  const reasons: string[] = [];
  const hardRejectionReasons: string[] = [];

  if (!goal.description || goal.description.trim() === '') {
    missing.push('description');
  }

  if (!goal.observable_return || goal.observable_return.trim() === '') {
    missing.push('observable_return');
  } else {
    const observable = goal.observable_return.trim();
    if (observable.length < 15) {
      reasons.push('observable_return: make it specific enough to check in the real world (aim for a full sentence)');
    }
    const vagueWords = ['something', 'better', 'improve', 'good', 'nice'];
    const hasVagueWords = vagueWords.some(word => 
      observable.toLowerCase().includes(word)
    );
    if (hasVagueWords && observable.length < 30) {
      reasons.push('observable_return: avoid vague words; describe the concrete observable change');
    }
    const hasNumber = /\d/.test(observable);
    if (!hasNumber && observable.length < 40) {
      reasons.push('observable_return: include a measurable indicator (a count, %, threshold, or clear yes/no test)');
    }
  }

  if (goal.external_verification === undefined) {
    missing.push('external_verification');
  } else if (goal.external_verification !== null) {
    if (goal.external_verification.trim() === '') {
      reasons.push('external_verification: leave it empty to mean “none”, or write a specific verifier');
    } else if (goal.external_verification.trim().length < 10) {
      reasons.push('external_verification: specify who/what can verify it (and how)');
    }
  }

  if (goal.time_horizon_days === undefined || goal.time_horizon_days === null) {
    missing.push('time_horizon_days');
  } else {
    if (goal.time_horizon_days <= 0) {
      missing.push('time_horizon_days');
    }
    if (goal.time_horizon_days > 36500) {
      hardRejectionReasons.push('time_horizon_days: this is longer than a human planning horizon; pick a smaller time window');
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
      hardRejectionReasons.push('resource_constraints.time: cannot be negative');
    }
    if (energy === undefined || energy === null) {
      missing.push('resource_constraints.energy');
    } else if (energy < 0) {
      hardRejectionReasons.push('resource_constraints.energy: cannot be negative');
    }
    if (attention === undefined || attention === null) {
      missing.push('resource_constraints.attention');
    } else if (attention < 0) {
      hardRejectionReasons.push('resource_constraints.attention: cannot be negative');
    }

    if (time !== undefined && energy !== undefined && attention !== undefined) {
      const total = time + energy + attention;
      if (total === 0) {
        missing.push('resource_constraints');
      }
      if (total > 1000) {
        hardRejectionReasons.push('resource_constraints: the total budget is unreasonably high; either scale the goal down or pick a shorter horizon');
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

  if (hardRejectionReasons.length > 0) {
    return {
      status: 'rejected',
      reasons: hardRejectionReasons
    };
  }

  if (reasons.length > 0) {
    return {
      status: 'ambiguous',
      missing: [],
      reasons
    };
  }

  return {
    status: 'admissible',
    goal: goal as Goal
  };
}

