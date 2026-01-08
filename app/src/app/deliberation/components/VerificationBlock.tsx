'use client';

import { useState } from 'react';

interface VerificationBlockProps {
  value: string | null;
  onChange: (value: string | null) => void;
  hasError: boolean;
  errorMessage?: string;
}

export default function VerificationBlock({ value, onChange, hasError, errorMessage }: VerificationBlockProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState(value || '');

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    onChange(newValue.trim() === '' ? null : newValue);
  };

  return (
    <div className="space-y-2">
      <label className="block text-lg font-semibold">External Verification</label>
      {isFocused && (
        <p className="text-sm text-gray-600 mb-2">
          Who or what can verify this goal externally? If no external verification is possible, leave blank. A goal needs external verification to be objectively assessable.
        </p>
      )}
      <textarea
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Who or what can verify this externally? (Leave blank if not applicable)"
        className={`w-full min-h-[100px] p-4 border border-gray-300 rounded-none resize-none focus:outline-2 focus:outline-black focus:outline-offset-2 ${
          hasError ? 'border-red-500' : ''
        }`}
      />
      {hasError && errorMessage && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}


