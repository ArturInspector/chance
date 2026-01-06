export default function UserProcedure() {
  return (
    <section className="grid lg:grid-cols-3 border-y border-zinc-200 dark:border-zinc-800">
      <div className="p-6 sm:p-12 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800">
        <h2 className="mb-4 text-lg font-bold lowercase tracking-tight">procedure</h2>
        <p className="text-sm opacity-60">Reading this page is a function call.</p>
      </div>

      <div className="col-span-2 p-6 sm:p-12 font-mono text-xs sm:text-sm">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <div className="mb-4 text-xs opacity-40">preconditions</div>
            <ul className="space-y-2 opacity-80">
               <li className="flex items-center gap-2">
                 <div className="h-1.5 w-1.5 bg-zinc-400"></div>
                 <span>Internet Access</span>
               </li>
               <li className="flex items-center gap-2">
                 <div className="h-1.5 w-1.5 bg-zinc-400"></div>
                 <span>Attention Span</span>
               </li>
            </ul>
          </div>

          <div>
             <div className="mb-4 text-xs opacity-40">execution</div>
             <ul className="space-y-2">
               <li className="opacity-30 line-through">01. init()</li>
               <li>02. read_manifesto() <span className="animate-pulse">_</span></li>
               <li className="opacity-40">03. understand_logic()</li>
               <li className="opacity-40">04. return intent</li>
             </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
