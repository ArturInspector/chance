'use client';

import { useState } from 'react';

interface ResourceConstraintsBlockProps {
  value: {
    time: number;
    energy: number;
    attention: number;
  };
  onChange: (value: { time: number; energy: number; attention: number }) => void;
  hasError: boolean;
  errorMessage?: string;
}

export default function ResourceConstraintsBlock({ value, onChange, hasError, errorMessage }: ResourceConstraintsBlockProps) {
  const [isFocused, setIsFocused] = useState(false);

  const updateConstraint = (key: 'time' | 'energy' | 'attention', numValue: number) => {
    onChange({
      ...value,
      [key]: numValue,
    });
  };

  const handleChange = (key: 'time' | 'energy' | 'attention', e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(e.target.value, 10);
    if (!isNaN(numValue)) {
      updateConstraint(key, numValue);
    } else if (e.target.value === '') {
      updateConstraint(key, 0);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-lg font-semibold">Resource Constraints</label>
      {isFocused && (
        <p className="text-sm text-gray-600 mb-2">
          Estimate the resources needed: time (hours), energy (scale 0-100), and attention (scale 0-100). At least one must be non-zero.
        </p>
      )}
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Time (hours)</label>
          <input
            type="number"
            value={value.time || ''}
            onChange={(e) => handleChange('time', e)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="0"
            min="0"
            className={`w-full p-3 border border-gray-300 rounded-none focus:outline-2 focus:outline-black focus:outline-offset-2 ${
              hasError ? 'border-red-500' : ''
            }`}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Energy (0-100)</label>
          <input
            type="number"
            value={value.energy || ''}
            onChange={(e) => handleChange('energy', e)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="0"
            min="0"
            max="100"
            className={`w-full p-3 border border-gray-300 rounded-none focus:outline-2 focus:outline-black focus:outline-offset-2 ${
              hasError ? 'border-red-500' : ''
            }`}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Attention (0-100)</label>
          <input
            type="number"
            value={value.attention || ''}
            onChange={(e) => handleChange('attention', e)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="0"
            min="0"
            max="100"
            className={`w-full p-3 border border-gray-300 rounded-none focus:outline-2 focus:outline-black focus:outline-offset-2 ${
              hasError ? 'border-red-500' : ''
            }`}
          />
        </div>
      </div>
      {hasError && errorMessage && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}
      {hasError && !errorMessage && (
        <p className="text-sm text-red-600">Resource constraints are required</p>
      )}
    </div>
  );
}

