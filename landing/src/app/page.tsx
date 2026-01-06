import Image from "next/image";
import Examples from "@/components/landing/Examples";
import Algorithms from "@/components/landing/Algorithms";
import DependencyGraph from "@/components/landing/DependencyGraph";
import MathFoundations from "@/components/landing/MathFoundations";
import UserProcedure from "@/components/landing/UserProcedure";
import GoalInput from "@/components/landing/GoalInput";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-black selection:text-white dark:bg-black dark:text-zinc-50">
      <main className="mx-auto max-w-5xl border-x border-zinc-200 dark:border-zinc-800">
        
        <header className="border-b border-zinc-200 p-6 sm:p-12 dark:border-zinc-800 flex justify-between items-start">
          <div>
            <div className="mb-8 flex items-center gap-4">
              <Image src="/logo.svg" alt="Chance Logo" width={32} height={32} className="rounded-none" />
              <h1 className="text-2xl font-bold tracking-tight lowercase font-mono">
                (chance)
              </h1>
            </div>
            
            <div className="max-w-xl space-y-6">
              <p className="text-xl leading-relaxed">
                We are procedural machines. <br/>
                Every small action is a function call.
              </p>
              <p className="text-lg opacity-60 leading-relaxed">
                We drift when we don't define the procedure. <br/>
                We build when we decompose the chaos into atomic steps.
              </p>
            </div>
          </div>

          <a 
            href="https://github.com/ArturInspector/chance" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-xs opacity-50 hover:opacity-100 transition-opacity"
          >
            <span>source_code</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 4 2c-1.5-.5-3 .5-3 1.5 0 1.15 0 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
              <path d="M9 18c-4.51 2-5-2-7-2"/>
            </svg>
          </a>
        </header>

        <GoalInput />

        <section className="grid sm:grid-cols-2 border-b border-zinc-200 dark:border-zinc-800">
          <div className="border-b sm:border-b-0 sm:border-r border-zinc-200 p-6 sm:p-12 dark:border-zinc-800">
            <p className="text-lg mb-2">The Problem</p>
            <p className="text-sm opacity-60 leading-relaxed">
              We try to solve life with huge, undefined goals. "Be happy", "Get rich". These are not procedures. These are hallucinations.
            </p>
          </div>
          <div className="p-6 sm:p-12">
            <p className="text-lg mb-2">The Method</p>
            <p className="text-sm opacity-60 leading-relaxed">
              Decompose. Break it down until it's atomic. Until you can do it in 5 minutes without thinking. Then compose it back.
            </p>
          </div>
        </section>

        <UserProcedure />

        <div className="border-b border-zinc-200 dark:border-zinc-800">
          <Examples />
        </div>
        
        <div className="border-b border-zinc-200 dark:border-zinc-800">
          <Algorithms />
        </div>

        <div className="border-b border-zinc-200 dark:border-zinc-800">
          <MathFoundations />
        </div>

        <div className="border-b border-zinc-200 dark:border-zinc-800">
          <DependencyGraph />
        </div>

        <section className="p-6 sm:p-12 flex justify-between items-end">
          <div className="max-w-lg text-sm opacity-50">
            "Everything small is not actually small. It is a necessary component of the whole."
          </div>
          
          <a 
            href="https://github.com/ArturInspector/chance" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex sm:hidden items-center gap-2 text-xs opacity-50 hover:opacity-100 transition-opacity"
          >
            <span>github</span>
          </a>
        </section>
      </main>
    </div>
  );
}
