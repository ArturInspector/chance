export default function Examples() {
  return (
    <section className="grid lg:grid-cols-2">
      <div className="border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 p-6 sm:p-12">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold lowercase tracking-tight">case: tiktok</h3>
        </div>
        
        <div className="mb-8 text-sm opacity-60">
          A perfect loop. Input (trigger), Action (swipe), Output (dopamine). Infinite recursion.
        </div>

        <div className="bg-zinc-100 p-4 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <code className="block text-xs leading-relaxed text-zinc-900 dark:text-zinc-50">
            (defun tiktok () (open) (watch) (close))<br/>
            <span className="opacity-40">(repeat 1000 (tiktok))</span><br/>
            <span className="opacity-40">return nil</span>
          </code>
        </div>
      </div>

      <div className="p-6 sm:p-12">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold lowercase tracking-tight">case: lisp</h3>
        </div>

        <div className="mb-8 text-sm opacity-60">
           Life is just composition. Small functions making up a big program.
        </div>

        <div className="bg-zinc-100 p-4 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <code className="block text-xs leading-relaxed text-zinc-900 dark:text-zinc-50">
            (defun life (day)<br/>
            &nbsp;&nbsp;(compose (work) (learn) (reflect) day))
          </code>
        </div>
      </div>
    </section>
  );
}
