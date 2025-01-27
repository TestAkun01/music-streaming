"use client";

import { DotsThreeVertical, Globe, Lock, Plus } from "@phosphor-icons/react";
import { Collection } from "../type";

interface CollectionsViewProps {
  collections: Collection[];
}

const CollectionsView: React.FC<CollectionsViewProps> = ({ collections }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-zinc-100">Collections</h1>
        <button
          onClick={() => console.log("Button Click")}
          className="btn btn-primary bg-orange-500 hover:bg-orange-600 border-none gap-2">
          <Plus size={20} />
          Add Collection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((collection) => (
          <div key={collection.id} className="card bg-zinc-900">
            <figure className="px-4 pt-4">
              <img
                src={collection.cover_url || "/api/placeholder/300/200"}
                alt={collection.name}
                className="rounded-lg h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="card-title text-zinc-100">
                    {collection.name}
                  </h2>
                  <p className="text-zinc-400 text-sm">
                    {collection.description}
                  </p>
                </div>
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-sm btn-square">
                    <DotsThreeVertical size={20} className="text-zinc-400" />
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow-lg bg-zinc-800 rounded-box w-52">
                    <li>
                      <a className="text-zinc-200">Edit</a>
                    </li>
                    <li>
                      <a className="text-zinc-200">Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="badge badge-outline text-orange-500 border-orange-500/30">
                  {collection.type}
                </div>
                <span
                  className={`badge ${
                    collection.is_public
                      ? "badge-success gap-1"
                      : "badge-warning gap-1"
                  }`}>
                  {collection.is_public ? (
                    <Globe size={14} />
                  ) : (
                    <Lock size={14} />
                  )}
                  {collection.is_public ? "Public" : "Private"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionsView;
