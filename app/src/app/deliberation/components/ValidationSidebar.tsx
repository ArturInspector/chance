'use client';

import type { GoalValidationState } from '@/shared/types/goal';

interface ValidationSidebarProps {
  validationState: GoalValidationState;
}

export default function ValidationSidebar({ validationState }: ValidationSidebarProps) {
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
            <h3 className="font-semibold mb-2">Missing Fields</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {validationState.missing.map((field, idx) => (
                <li key={idx} className="text-gray-700">{field}</li>
              ))}
            </ul>
          </div>
        )}

        {(validationState.status === 'ambiguous' || validationState.status === 'rejected') && (
          <div>
            <h3 className="font-semibold mb-2">Reasons</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {validationState.reasons.map((reason, idx) => (
                <li key={idx} className="text-gray-700">{reason}</li>
              ))}
            </ul>
          </div>
        )}

        {validationState.status === 'admissible' && (
          <div>
            <p className="text-sm text-gray-700">
              Goal is complete and valid. Ready for next phase.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

