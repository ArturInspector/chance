'use client';

import { useState } from 'react';

interface TimeHorizonBlockProps {
  value: number;
  onChange: (value: number) => void;
  hasError: boolean;
  errorMessage?: string;
}

export default function TimeHorizonBlock({ value, onChange, hasError, errorMessage }: TimeHorizonBlockProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(e.target.value, 10);
    if (!isNaN(numValue)) {
      onChange(numValue);
    } else if (e.target.value === '') {
      onChange(0);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-lg font-semibold">Time Horizon (days)</label>
      {isFocused && (
        <p className="text-sm text-gray-600 mb-2">
          How many days until this goal should be achieved? Must be realistic and greater than 0.
        </p>
      )}
      <input
        type="number"
        value={value || ''}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Number of days"
        min="1"
        max="36500"
        className={`w-full p-4 border border-gray-300 rounded-none focus:outline-2 focus:outline-black focus:outline-offset-2 ${
          hasError ? 'border-red-500' : ''
        }`}
      />
      {hasError && errorMessage && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}
      {hasError && !errorMessage && (
        <p className="text-sm text-red-600">Time horizon is required and must be greater than 0</p>
      )}
    </div>
  );
}

