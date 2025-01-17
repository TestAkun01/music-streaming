export default function NavigationTabs() {
  return (
    <div className="flex gap-6 mb-6 text-sm border-b border-zinc-800 pb-2">
      <button className="text-orange-500 border-b-2 border-orange-500 pb-2">
        Musics
      </button>
      <button className="text-zinc-400 hover:text-white">Playlists</button>
      <button className="text-zinc-400 hover:text-white">Artists</button>
      <button className="text-zinc-400 hover:text-white">Albums</button>
      <button className="text-zinc-400 hover:text-white">Streams</button>
      <button className="text-zinc-400 hover:text-white">
        Friends&apos; playlists
      </button>
    </div>
  );
}
