import { DotsThreeVertical, Globe, Lock, Plus } from "@phosphor-icons/react";
import { Track } from "../type";

interface TracksViewProps {
  tracks: Track[];
  onAddTrack: () => void;
}

const TracksView: React.FC<TracksViewProps> = ({ tracks, onAddTrack }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-zinc-100">Tracks</h1>
        <button
          onClick={onAddTrack}
          className="btn btn-primary bg-orange-500 hover:bg-orange-600 border-none gap-2">
          <Plus size={20} />
          Add Track
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="bg-zinc-900 rounded-lg p-4 flex items-center gap-4">
            <img
              src={track.cover_url || "/api/placeholder/100/100"}
              alt={track.title}
              className="w-16 h-16 rounded object-cover"
            />

            <div className="flex-1">
              <h3 className="text-zinc-100 font-medium">{track.title}</h3>
              <p className="text-zinc-400 text-sm">
                {track.genre} • {Math.floor(track.duration / 60)}:
                {(track.duration % 60).toString().padStart(2, "0")}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`badge ${
                  track.visibility === "Public"
                    ? "badge-success gap-1"
                    : "badge-warning gap-1"
                }`}>
                {track.visibility === "Public" ? (
                  <Globe size={14} />
                ) : (
                  <Lock size={14} />
                )}
                {track.visibility}
              </span>

              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-sm btn-square">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default TracksView;
