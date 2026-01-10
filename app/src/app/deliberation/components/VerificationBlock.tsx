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
          Who or what can verify this goal independently of you? External verification makes goals objective. Examples: a code reviewer, a test suite, a customer survey, a bank statement. If truly impossible to verify externally, leave blank—but most goals can be verified.
        </p>
      )}
      <textarea
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Example: 'Automated test suite' or 'Customer satisfaction survey' or 'Bank transaction record'. Leave blank only if no external verification is possible."
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


