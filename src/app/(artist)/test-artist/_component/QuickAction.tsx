"use client";

import { Plus, Upload } from "@phosphor-icons/react";

const QuickActions: React.FC = () => (
  <div className="flex gap-4 mb-8">
    <button className="btn btn-primary bg-orange-500 hover:bg-orange-600 border-none gap-2">
      <Upload size={20} />
      Upload Track
    </button>
    <button className="btn btn-outline text-orange-500 border-orange-500 hover:bg-orange-500 hover:border-orange-500 gap-2">
      <Plus size={20} />
      New Collection
    </button>
  </div>
);

export default QuickActions;
