import { MusicNote } from "@phosphor-icons/react";

export default function PlaylistEmpty() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fade-in">
      <MusicNote className="w-16 h-16 text-orange-500 mb-4" />
      <p className="text-lg font-semibold text-zinc-300 mb-2">
        Your playlist is empty
      </p>
      <p className="text-sm text-zinc-400">Add some songs to get started</p>
    </div>
  );
}
