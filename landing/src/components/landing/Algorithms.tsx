export default function Algorithms() {
  return (
    <section className="grid lg:grid-cols-2">
      <div className="border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 p-6 sm:p-12">
        <h2 className="mb-8 text-lg font-bold lowercase tracking-tight">Applicability</h2>
        <div className="space-y-6 text-sm">
          <div>
            <div className="font-bold mb-1">Measurability</div>
            <div className="opacity-60">Can you say "done" or "not done" objectively?</div>
          </div>
          <div>
            <div className="font-bold mb-1">Controllability</div>
            <div className="opacity-60">Is it in your hands, or do you rely on luck?</div>
          </div>
          <div>
            <div className="font-bold mb-1">Finiteness</div>
            <div className="opacity-60">Will it end, or is it an infinite loop?</div>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-12 bg-zinc-50 dark:bg-zinc-900/20">
        <h2 className="mb-8 text-lg font-bold lowercase tracking-tight">Decomposition</h2>
        <div className="font-mono text-xs space-y-3 opacity-80">
          <div className="flex gap-4 border-b border-zinc-200 pb-2 dark:border-zinc-800">
            <span className="opacity-40 w-6">IN</span>
            <span>Goal G</span>
          </div>
          <div className="flex gap-4 border-b border-zinc-200 pb-2 dark:border-zinc-800">
            <span className="opacity-40 w-6">01</span>
            <span>IF is_atomic(G) RETURN G</span>
          </div>
          <div className="flex gap-4 border-b border-zinc-200 pb-2 dark:border-zinc-800">
            <span className="opacity-40 w-6">02</span>
            <span>G → &#123;G1, G2...Gn&#125;</span>
          </div>
          <div className="flex gap-4 border-b border-zinc-200 pb-2 dark:border-zinc-800">
            <span className="opacity-40 w-6">03</span>
            <span>FOREACH Gi: decompose(Gi)</span>
          </div>
           <div className="flex gap-4">
            <span className="opacity-40 w-6">OUT</span>
            <span>Execution Plan</span>
          </div>
        </div>
      </div>
    </section>
  );
}
