'use client';

import { useState } from 'react';

interface ReversibilityBlockProps {
  value: boolean | undefined;
  onChange: (value: boolean) => void;
  hasError: boolean;
}

export default function ReversibilityBlock({ value, onChange, hasError }: ReversibilityBlockProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2">
      <label className="block text-lg font-semibold">Reversibility</label>
      {isFocused && (
        <p className="text-sm text-gray-600 mb-2">
          If it fails or you change your mind, can you return to the previous state without lasting damage?
        </p>
      )}
      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="reversibility"
            checked={value === true}
            onChange={() => onChange(true)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-4 h-4 border-gray-300 focus:outline-2 focus:outline-black focus:outline-offset-2"
          />
          <span>Reversible</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="reversibility"
            checked={value === false}
            onChange={() => onChange(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-4 h-4 border-gray-300 focus:outline-2 focus:outline-black focus:outline-offset-2"
          />
          <span>Irreversible</span>
        </label>
      </div>
      {hasError && (
        <p className="text-sm text-red-600">Pick one: reversible or irreversible</p>
      )}
    </div>
  );
}

