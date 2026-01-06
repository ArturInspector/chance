export default function Algorithms() {
  return (
    <section className="py-24 space-y-32">
      <div>
        <h2 className="mb-12 text-4xl font-bold tracking-tight">Applicability Algorithm</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <h3 className="font-bold text-xl mb-4 text-zinc-900 dark:text-zinc-50">Measurability</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Goal G must have a clear binary state (completed/not) or a progress metric.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <h3 className="font-bold text-xl mb-4 text-zinc-900 dark:text-zinc-50">Controllability</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              There exists a set of actions (MES) that a person (agent) can physically perform.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <h3 className="font-bold text-xl mb-4 text-zinc-900 dark:text-zinc-50">Finiteness</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              The goal has a time horizon and a finite set of decomposition steps.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 text-zinc-50 p-8 sm:p-12 rounded-3xl overflow-hidden relative">
        <div className="relative z-10 max-w-2xl">
          <h2 className="mb-8 text-4xl font-bold tracking-tight">Decomposition Algorithm</h2>
          <div className="space-y-8 font-mono text-sm sm:text-base opacity-90">
            <p className="flex gap-4">
              <span className="text-zinc-500">01</span>
              <span>INPUT Goal G</span>
            </p>
            <p className="flex gap-4">
              <span className="text-zinc-500">02</span>
              <span>IF is_atomic(G) THEN return G</span>
            </p>
            <p className="flex gap-4">
              <span className="text-zinc-500">03</span>
              <span>G → Subgoals &#123;G1, G2, ..., Gn&#125;</span>
            </p>
            <p className="flex gap-4 pl-8">
              <span className="text-zinc-500">04</span>
              <span>FOR EACH Gi DO decompose(Gi)</span>
            </p>
            <p className="flex gap-4">
              <span className="text-zinc-500">05</span>
              <span>VALIDATE Graph(G) is DAG</span>
            </p>
            <p className="flex gap-4">
              <span className="text-zinc-500">06</span>
              <span>OUTPUT Execution Plan</span>
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-zinc-800/50 to-transparent hidden lg:block" />
      </div>
    </section>
  );
}
