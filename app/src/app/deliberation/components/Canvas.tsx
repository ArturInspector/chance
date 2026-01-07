'use client';

import { useState, useCallback } from 'react';
import type { Goal, GoalValidationState } from '@/shared/types/goal';
import { validateGoal } from '@/shared/utils/validation';

export default function Canvas() {
  const [goal, setGoal] = useState<Partial<Goal>>({
    description: '',
    observable_return: '',
    external_verification: null,
    time_horizon_days: 0,
    reversibility: false,
    resource_constraints: {
      time: 0,
      energy: 0,
      attention: 0,
    },
  });


  
  const [validationState, setValidationState] = useState<GoalValidationState>(
    validateGoal(goal)
  );

  const updateGoal = useCallback((updates: Partial<Goal>) => {
    setGoal((prev: Partial<Goal>) => {
      const updated = { ...prev, ...updates };
      const newValidation = validateGoal(updated);
      setValidationState(newValidation);
      return updated;
    });
  }, []);

  return (
    <div className="w-full h-screen flex">
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-2xl font-semibold mb-8">Goal Deliberation</h1>
        </div>
      </div>
    </div>
  );
}

