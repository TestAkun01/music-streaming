"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "../Sidebar";

export default function LeftMainComponent() {
  const [isOpen, setIsOpen] = useState(true);

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ width: "200px" }}
      animate={{ width: isOpen ? "200px" : "80px" }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      className="relative h-full">
      <Sidebar onToggle={handleIsOpen} isOpen={isOpen} />
    </motion.div>
  );
}
