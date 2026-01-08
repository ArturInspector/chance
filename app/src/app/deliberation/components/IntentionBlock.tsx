'use client';

import { useState } from 'react';

interface IntentionBlockProps {
  value: string;
  onChange: (value: string) => void;
  hasError: boolean;
}

export default function IntentionBlock({ value, onChange, hasError }: IntentionBlockProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2">
      <label className="block text-lg font-semibold">Intention</label>
      {isFocused && (
        <p className="text-sm text-gray-600 mb-2">
          Start with your initial goal or intention. Be as free-form as you like - we'll refine it together.
        </p>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="What do you want to achieve?"
        className={`w-full min-h-[120px] p-4 border border-gray-300 rounded-none resize-none focus:outline-2 focus:outline-black focus:outline-offset-2 ${
          hasError ? 'border-red-500' : ''
        }`}
      />
      {hasError && (
        <p className="text-sm text-red-600">Description is required</p>
      )}
    </div>
  );
}


