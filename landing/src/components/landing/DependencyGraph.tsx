"use client";

const nodes = [
  { id: "G", label: "wake_up", x: 200, y: 50, color: "border-zinc-900 bg-zinc-900 text-white dark:bg-white dark:text-black dark:border-white" },
  { id: "G1", label: "alarm", x: 100, y: 150, color: "bg-white border-zinc-200 text-zinc-900 dark:bg-black dark:border-zinc-800 dark:text-zinc-50" },
  { id: "G2", label: "no_phone", x: 300, y: 150, color: "bg-white border-zinc-200 text-zinc-900 dark:bg-black dark:border-zinc-800 dark:text-zinc-50" },
  { id: "G1_1", label: "battery", x: 100, y: 250, color: "bg-white border-zinc-200 text-zinc-500 dark:bg-black dark:border-zinc-800 dark:text-zinc-500" },
];

const edges = [
  { from: "G", to: "G1" },
  { from: "G", to: "G2" },
  { from: "G1", to: "G1_1" },
];

export default function DependencyGraph() {
  return (
    <section className="grid lg:grid-cols-3">
      <div className="p-6 sm:p-12 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800">
         <h2 className="mb-4 text-lg font-bold lowercase tracking-tight">graph</h2>
         <p className="text-sm opacity-60 mb-8">Visualizing the dependencies.</p>
         
         <div className="space-y-4 text-xs font-mono opacity-80">
           <div className="flex justify-between border-b border-zinc-100 pb-2 dark:border-zinc-900">
             <span>Nodes</span>
             <span>Actions</span>
           </div>
           <div className="flex justify-between border-b border-zinc-100 pb-2 dark:border-zinc-900">
             <span>Edges</span>
             <span>Deps</span>
           </div>
         </div>
      </div>

      <div className="col-span-2 relative h-[400px] w-full bg-zinc-50 dark:bg-zinc-900/20 overflow-hidden">
        {/* GRID BACKGROUND */}
        <div className="absolute inset-0" style={{ 
            backgroundImage: 'linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
        }}></div>

        <svg className="h-full w-full relative z-10" viewBox="0 0 400 300">
          <defs>
            <marker
              id="arrow-strict"
              viewBox="0 0 10 10"
              refX="10"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" className="fill-zinc-900 dark:fill-zinc-50" />
            </marker>
          </defs>

          {edges.map((edge, i) => {
            const from = nodes.find((n) => n.id === edge.from)!;
            const to = nodes.find((n) => n.id === edge.to)!;
            // Orthogonal lines style
            return (
              <path
                key={i}
                d={`M ${from.x} ${from.y + 20} L ${from.x} ${from.y + (to.y - from.y)/2} L ${to.x} ${from.y + (to.y - from.y)/2} L ${to.x} ${to.y - 20}`}
                className="stroke-zinc-900 dark:stroke-zinc-50 fill-none"
                strokeWidth="1"
                markerEnd="url(#arrow-strict)"
              />
            );
          })}
        </svg>

        {nodes.map((node) => (
          <div
            key={node.id}
            style={{
              position: "absolute",
              left: `${(node.x / 400) * 100}%`,
              top: `${(node.y / 300) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
            className={`z-20 flex h-8 items-center justify-center border px-3 text-[10px] lowercase font-bold tracking-wider shadow-none transition-colors ${node.color}`}
          >
            <span>{node.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
