import React from "react";

export default function NavbarSkeleton() {
  return (
    <div className="flex items-center justify-between px-6 h-16">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="skeleton h-11 w-full bg-zinc-700/50 max-w-xl rounded-full" />
      </div>
      <div className="flex items-center gap-4 ml-4">
        <div className="flex gap-2">
          <div className="skeleton w-10 h-10 bg-zinc-700/50 rounded-full" />
          <div className="skeleton w-10 h-10 bg-zinc-700/50 rounded-full" />
          <div className="skeleton w-10 h-10 bg-zinc-700/50 rounded-full" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1">
            <div className="skeleton h-8 bg-zinc-700/50 w-[5.5rem]" />
          </div>
          <div className="skeleton w-10 h-10 bg-zinc-700/50 rounded-full" />
        </div>
      </div>
    </div>
  );
}
