'use client';

import { useState } from 'react';

interface ObservableBlockProps {
  value: string;
  onChange: (value: string) => void;
  hasError: boolean;
  errorMessage?: string;
}

export default function ObservableBlock({ value, onChange, hasError, errorMessage }: ObservableBlockProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2">
      <label className="block text-lg font-semibold">Observable Return</label>
      {isFocused && (
        <p className="text-sm text-gray-600 mb-2">
          What specific, measurable change will occur in reality? Avoid vague terms like "better" or "improve". Be concrete about what you can observe.
        </p>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="What changes in reality? Be specific and measurable."
        className={`w-full min-h-[120px] p-4 border border-gray-300 rounded-none resize-none focus:outline-2 focus:outline-black focus:outline-offset-2 ${
          hasError ? 'border-red-500' : ''
        }`}
      />
      {hasError && errorMessage && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}
      {hasError && !errorMessage && (
        <p className="text-sm text-red-600">Observable return is required and must be specific</p>
      )}
    </div>
  );
}

