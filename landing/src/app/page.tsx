import Examples from "@/components/landing/Examples";
import Algorithms from "@/components/landing/Algorithms";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white dark:bg-zinc-950 dark:text-zinc-50">
      <main className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
        <header className="mb-24">
          <h1 className="mb-8 text-5xl font-bold tracking-tight sm:text-7xl">
            Chance
          </h1>
          <p className="text-lg leading-relaxed text-zinc-500 dark:text-zinc-500">
            Human is a procedural machine. But without a specification of procedures, "we are not machines". But what if - we are?
          </p>
        </header>

        <section className="mb-24 space-y-12">
          <div className="grid gap-12 sm:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold">Our Goal</h2>
              <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
                Formalize the procedures of life. Decompose them into atomic actions. Identify the gaps where awareness is replaced by automatism.
              </p>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold">Mathematical Foundation</h2>
              <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
                We use graph theory and procedural decomposition to transform uncertainty into a deterministic path.
              </p>
            </div>
          </div>
        </section>

        <Examples />
        
        <Algorithms />

        <section className="rounded-2xl bg-zinc-50 p-8 dark:bg-zinc-900 sm:p-12">
          <h2 className="mb-6 text-3xl font-bold">Concept</h2>
          <div className="prose prose-zinc dark:prose-invert max-w-none space-y-4">
            <p className="text-lg text-zinc-600 dark:text-zinc-400 italic">
              "If a goal is not decomposed into procedures that can be physically performed daily (with a timeline) — it is not a goal, but a hallucination."
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              Trello gives us a task manager. But does it ever ask: <span className="font-semibold">Why</span> do you want this task? <span className="font-semibold">What</span> is this really for? Aren't these the fundamental questions?
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              We aim to design not just for action, but for meaning—tracing tasks back to their purpose, not merely automating the "how", but elevating the "why" and "what".
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
