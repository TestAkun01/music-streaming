"use client";

import { useState } from "react";
import Sidebar from "../Sidebar";

export default function LeftMainComponent() {
  const [isOpen, setIsOpen] = useState(true);

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`h-full ${isOpen ? "w-[200px]" : "w-[76px]"}`}>
      <Sidebar onToggle={handleIsOpen} isOpen={isOpen} />
    </div>
  );
}
