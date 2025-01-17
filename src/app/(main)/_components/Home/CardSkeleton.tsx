export default function CardSkeleton() {
  return (
    <>
      <section className="mb-12">
        <header className="mb-6">
          <h1 className="skeleton w-40 h-9 rounded-lg pl-2 bg-zinc-800/30"></h1>
        </header>
        <div className="overflow-x-auto scrollbar-none">
          <div className="grid grid-rows-1 grid-flow-col auto-cols-max gap-6 mb-8">
            {Array(9)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="w-48 p-3">
                  <div className="relative aspect-square w-full mb-4">
                    <div className="skeleton w-full h-full rounded-xl bg-zinc-800/30"></div>
                  </div>

                  <div className="space-y-2">
                    <div className="skeleton w-full h-4 rounded-full bg-zinc-800/30"></div>
                    <div className="skeleton w-2/3 h-3 rounded-full bg-zinc-800/30"></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      <section className="mb-12">
        <header className="mb-6">
          <h1 className="skeleton w-40 h-9 rounded-lg pl-2 bg-zinc-800/30"></h1>
        </header>
        <div className="overflow-x-auto scrollbar-none">
          <div className="grid grid-rows-1 grid-flow-col auto-cols-max gap-6 mb-8">
            {Array(9)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="w-48 p-3">
                  <div className="relative aspect-square w-full mb-4">
                    <div className="skeleton w-full h-full rounded-xl bg-zinc-800/30"></div>
                  </div>

                  <div className="space-y-2">
                    <div className="skeleton w-full h-4 rounded-full bg-zinc-800/30"></div>
                    <div className="skeleton w-2/3 h-3 rounded-full bg-zinc-800/30"></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
