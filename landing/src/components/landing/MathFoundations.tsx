export default function MathFoundations() {
  return (
    <section className="p-6 sm:p-12">
      <div className="mb-12 flex items-center justify-between">
         <h2 className="text-lg font-bold lowercase tracking-tight">logic</h2>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="border border-zinc-200 p-4 dark:border-zinc-800">
            <div className="mb-2 text-xs opacity-40">atomic</div>
            <code className="text-xs sm:text-sm">
              atomic(A) ⟺ <br/>
              (1) single_session(A) ∧<br/>
              (2) clear_completion(A)
            </code>
          </div>
          
          <div className="border border-zinc-200 p-4 dark:border-zinc-800">
             <div className="mb-2 text-xs opacity-40">optimal</div>
            <code className="text-xs sm:text-sm">
              optimal(G) ⟺ <br/>
              measurable(G) ∧ <br/>
              ∃ P: (controllable(P) ∧ finite(P))
            </code>
          </div>
        </div>

        <div className="border border-zinc-200 p-4 dark:border-zinc-800 h-full flex flex-col justify-center">
          <div className="mb-4 text-xs opacity-40">utility</div>
          <code className="mb-4 text-sm sm:text-lg block border-b border-zinc-100 pb-4 dark:border-zinc-900">
            utility(P) = value(post(P)) - cost(P)
          </code>
          <div className="text-xs opacity-60">
            If utility &lt; 0 and frequent, it is parasitic.
          </div>
        </div>
      </div>
    </section>
  );
}
