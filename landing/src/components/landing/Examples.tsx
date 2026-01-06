export default function Examples() {
  return (
    <section className="space-y-24 py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h3 className="mb-6 text-3xl font-bold tracking-tight">TikTok: Procedural Capture</h3>
          <p className="mb-6 text-lg text-zinc-600 dark:text-zinc-400">
            TikTok is not just video. It is a procedure with a strict specification:
          </p>
          <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white dark:bg-zinc-50 dark:text-zinc-900">1</span>
              <span>Input: Visual impulse (trigger).</span>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white dark:bg-zinc-50 dark:text-zinc-900">2</span>
              <span>Action: Swipe (atomic operation).</span>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white dark:bg-zinc-50 dark:text-zinc-900">3</span>
              <span>Output: Dopamine reward + next impulse.</span>
            </li>
          </ul>
          <p className="mt-8 text-zinc-500">
            A gap occurs where the procedure is performed for you, rather than you performing it.
          </p>
        </div>
        <div className="aspect-video rounded-2xl bg-zinc-100 p-8 dark:bg-zinc-900 flex flex-col items-center justify-center border border-zinc-200 dark:border-zinc-800 gap-4">
          <code className="text-sm sm:text-base leading-relaxed text-zinc-900 dark:text-zinc-50">
            (defun tiktok () (open) (watch) (close))
          </code>
          <code className="text-sm sm:text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            (repeat 1000 (tiktok))
          </code>
          <code className="text-sm sm:text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            return nil
          </code>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="order-last lg:order-first aspect-video rounded-2xl bg-zinc-100 p-8 dark:bg-zinc-900 flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
          <code className="text-sm sm:text-base leading-relaxed text-zinc-900 dark:text-zinc-50">
            (defun life (day) (compose (work) (learn) (reflect) day))
          </code>
        </div>
        <div>
          <h3 className="mb-6 text-3xl font-bold tracking-tight">Lisp: Life as Composition</h3>
          <p className="mb-6 text-lg text-zinc-600 dark:text-zinc-400">
            We take the best from functional programming. In Lisp, everything is a procedure that can be composed.
          </p>
          <div className="space-y-4">
            <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
              <h4 className="font-bold mb-2">Atomicity</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Any complex task in life is just a set of higher-order functions.</p>
            </div>
            <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
              <h4 className="font-bold mb-2">Recursion</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">The procedure of improving procedures is the growth of the system.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
