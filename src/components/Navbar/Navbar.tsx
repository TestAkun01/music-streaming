"use client";

import { X } from "@phosphor-icons/react/X";
import { MagnifyingGlass } from "@phosphor-icons/react/MagnifyingGlass";
import { Bell } from "@phosphor-icons/react/Bell";
import { Gear } from "@phosphor-icons/react/Gear";
import { ShieldCheck } from "@phosphor-icons/react/ShieldCheck";
import { useState } from "react";

export const Navbar = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <nav className="flex items-center justify-between px-6 pt-6 pb-3 bg-zinc-950">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full group ">
          <MagnifyingGlass
            weight={"bold"}
            className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-gray-300 transition duration-300"
            size={24}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for songs, artists, or albums..."
            className="w-full pl-8 py-2 bg-transparent border-b-2 border-gray-500 text-gray-400 focus:text-gray-300 focus:outline-none focus:ring-0 focus:border-white placeholder-gray-500 focus:placeholder:text-gray-300 transition duration-300"
          />
          {search.length > 0 && (
            <X
              onClick={() => setSearch("")}
              weight={"bold"}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-gray-300 transition duration-300 cursor-pointer"
              size={20}
            />
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 ml-4">
        <button className="btn btn-circle btn-ghost">
          <Bell size={20} />
        </button>
        <button className="btn btn-circle btn-ghost">
          <Gear size={20} />
        </button>
        <button className="btn btn-circle btn-ghost">
          <ShieldCheck size={20} />
        </button>
      </div>
    </nav>
  );
};
