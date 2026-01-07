'use client';

import { useState, useCallback } from 'react';
import type { Goal, GoalValidationState } from '@/shared/types/goal';
import { validateGoal } from '@/shared/utils/validation';
import IntentionBlock from './IntentionBlock';
import ObservableBlock from './ObservableBlock';
import VerificationBlock from './VerificationBlock';
import TimeHorizonBlock from './TimeHorizonBlock';
import ReversibilityBlock from './ReversibilityBlock';
import ResourceConstraintsBlock from './ResourceConstraintsBlock';
import ValidationSidebar from './ValidationSidebar';

export default function Canvas() {
  const [goal, setGoal] = useState<Partial<Goal>>({
    description: '',
    observable_return: '',
    external_verification: null,
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

  const getFieldError = (fieldName: string): string | undefined => {
    if (validationState.status === 'ambiguous' || validationState.status === 'rejected') {
      return validationState.reasons.find((r: string) => r.startsWith(`${fieldName}:`)) ??
        validationState.reasons.find((r: string) => r.includes(`${fieldName}.`));
    }
    return undefined;
  };

  const hasFieldError = (fieldName: string): boolean => {
    if (validationState.status === 'ambiguous') {
      return validationState.missing.includes(fieldName) || 
             validationState.reasons.some((r: string) => r.startsWith(`${fieldName}:`)) ||
             validationState.reasons.some((r: string) => r.includes(`${fieldName}.`));
    }
    if (validationState.status === 'rejected') {
      return validationState.reasons.some((r: string) => r.startsWith(`${fieldName}:`)) ||
        validationState.reasons.some((r: string) => r.includes(`${fieldName}.`));
    }
    return false;
  };

  return (
    <div className="w-full h-screen flex">
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-2xl font-semibold mb-8">Goal Deliberation</h1>
          
          <IntentionBlock
            value={goal.description || ''}
            onChange={(value) => updateGoal({ description: value })}
            hasError={hasFieldError('description')}
          />

          <ObservableBlock
            value={goal.observable_return || ''}
            onChange={(value) => updateGoal({ observable_return: value })}
            hasError={hasFieldError('observable_return')}
            errorMessage={getFieldError('observable_return')}
          />

          <VerificationBlock
            value={goal.external_verification}
            onChange={(value) => updateGoal({ external_verification: value })}
            hasError={hasFieldError('external_verification')}
            errorMessage={getFieldError('external_verification')}
          />

          <TimeHorizonBlock
            value={goal.time_horizon_days || 0}
            onChange={(value) => updateGoal({ time_horizon_days: value })}
            hasError={hasFieldError('time_horizon_days')}
            errorMessage={getFieldError('time_horizon_days')}
          />

          <ReversibilityBlock
            value={goal.reversibility}
            onChange={(value) => updateGoal({ reversibility: value })}
            hasError={hasFieldError('reversibility')}
          />

          <ResourceConstraintsBlock
            value={goal.resource_constraints || { time: 0, energy: 0, attention: 0 }}
            onChange={(value) => updateGoal({ resource_constraints: value })}
            hasError={hasFieldError('resource_constraints')}
            errorMessage={getFieldError('resource_constraints')}
          />
        </div>
      </div>
      <ValidationSidebar validationState={validationState} />
    </div>
  );
}

