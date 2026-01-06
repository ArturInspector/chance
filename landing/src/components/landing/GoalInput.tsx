"use client";

import { useState, useEffect, useRef } from "react";

export default function GoalInput() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output' | 'error', text: string }>>([
    { type: 'output', text: 'CHANCE_SYSTEM_READY' },
    { type: 'output', text: 'Enter your goal to validate atomic integrity.' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [...history, { type: 'input' as const, text: input }];
    const lowerInput = input.toLowerCase();

    // Heuristics
    setTimeout(() => {
      let response;
      
      if (lowerInput.includes("rich") || lowerInput.includes("money") || lowerInput.includes("million")) {
        response = { type: 'error' as const, text: 'ERROR: Goal is abstract. Not measurable. \nSUGGESTION: "Increase monthly revenue to $10k".' };
      } else if (lowerInput.includes("happy") || lowerInput.includes("happiness")) {
        response = { type: 'error' as const, text: 'ERROR: "Happiness" is a side-effect, not a procedure. \nSUGGESTION: "Meditate 10min daily" AND "Sleep 8h".' };
      } else if (lowerInput.includes("fit") || lowerInput.includes("lose weight")) {
        response = { type: 'error' as const, text: 'ERROR: Too vague. \nSUGGESTION: "Caloric deficit 300kcal" AND "Run 5km".' };
      } else if (lowerInput.length < 10) {
        response = { type: 'error' as const, text: 'ERROR: Goal description too short for decomposition.' };
      } else {
        response = { type: 'output' as const, text: `ACCEPTED. \nDecomposing "${input}"...\n> 01. Define metrics [OK]\n> 02. Check control [OK]\n> 03. Generate DAG...` };
      }
      
      setHistory(prev => [...prev, response]);
    }, 400);

    setHistory(newHistory);
    setInput("");
  };

  return (
    <section className="border-b border-zinc-200 dark:border-zinc-800 p-6 sm:p-12 bg-zinc-50 dark:bg-zinc-900/10">
      <div className="max-w-3xl font-mono text-sm sm:text-base">
        <div className="mb-4 space-y-2">
          {history.map((line, i) => (
            <div key={i} className={`${line.type === 'error' ? 'text-red-600 dark:text-red-400' : line.type === 'input' ? 'text-zinc-900 dark:text-zinc-50 font-bold' : 'text-zinc-500'} whitespace-pre-wrap`}>
              {line.type === 'input' ? '> ' : ''}{line.text}
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-emerald-600 dark:text-emerald-500 font-bold">{">"}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-zinc-900 dark:text-zinc-50 placeholder-zinc-400"
            placeholder="input_goal"
            autoFocus
          />
        </form>
      </div>
    </section>
  );
}

