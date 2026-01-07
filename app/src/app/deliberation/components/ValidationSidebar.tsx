'use client';

import type { GoalValidationState } from '@/shared/types/goal';

interface ValidationSidebarProps {
  validationState: GoalValidationState;
}

export default function ValidationSidebar({ validationState }: ValidationSidebarProps) {
  const fieldLabel = (field: string): string => {
    if (field === 'description') return 'Intention';
    if (field === 'observable_return') return 'Observable return';
    if (field === 'external_verification') return 'External verification';
    if (field === 'time_horizon_days') return 'Time horizon';
    if (field === 'reversibility') return 'Reversibility';
    if (field === 'resource_constraints') return 'Resource constraints';
    if (field === 'resource_constraints.time') return 'Time budget';
    if (field === 'resource_constraints.energy') return 'Energy budget';
    if (field === 'resource_constraints.attention') return 'Attention budget';
    return field;
  };

  const displayReason = (reason: string): string => {
    const idx = reason.indexOf(':');
    if (idx <= 0) return reason;
    return reason.slice(idx + 1).trim();
  };

  return (
    <div className="w-80 border-l border-gray-300 p-6 bg-white h-screen overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6">Validation Status</h2>
      
      <div className="space-y-4">
        <div>
          <div className="mb-2">
            {validationState.status === 'admissible' && (
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-black"></span>
                <span className="font-semibold">Admissible</span>
              </div>
            )}
            {validationState.status === 'ambiguous' && (
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-gray-600"></span>
                <span className="font-semibold">Ambiguous</span>
              </div>
            )}
            {validationState.status === 'rejected' && (
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-black"></span>
                <span className="font-semibold">Rejected</span>
              </div>
            )}
          </div>
        </div>

        {validationState.status === 'ambiguous' && (
          <div>
            <h3 className="font-semibold mb-2">Next constraints</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {validationState.missing.map((field, idx) => (
                <li key={idx} className="text-gray-700">{fieldLabel(field)}</li>
              ))}
            </ul>
          </div>
        )}

        {(validationState.status === 'ambiguous' || validationState.status === 'rejected') && (
          <div>
            <h3 className="font-semibold mb-2">What to clarify</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {validationState.reasons.map((reason, idx) => (
                <li key={idx} className="text-gray-700">{displayReason(reason)}</li>
              ))}
            </ul>
          </div>
        )}

        {validationState.status === 'admissible' && (
          <div>
            <p className="text-sm text-gray-700">
              This goal is admissible.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

