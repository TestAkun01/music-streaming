import React, { ReactNode } from "react";

interface BaseCarousel {
  title: string;
  children: ReactNode;
}

export default function BaseCarousel({ title, children }: BaseCarousel) {
  return (
    <section className="mb-12">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-white pl-2">{title}</h1>
      </header>
      <div className="overflow-x-auto scrollbar-none">
        <div className="grid grid-rows-1 grid-flow-col auto-cols-max gap-6 mb-8">
          {children}
        </div>
      </div>
    </section>
  );
}
