"use client";

import { ReactSortable } from "react-sortablejs";

import { MusicNote } from "@phosphor-icons/react/MusicNote";
import { Trash } from "@phosphor-icons/react/Trash";
import { Play } from "@phosphor-icons/react/Play";
import { X } from "@phosphor-icons/react/X";
import { DotsSixVertical } from "@phosphor-icons/react/DotsSixVertical";

import { useAudioContext } from "@/providers/AudioProvider";
import formatSongName from "@/utils/formatSongName";
import PlaylistItem from "@/types/PlaylistItemType";

export default function Playlist() {
  const {
    playlist,
    currentTrack,
    playing,
    setPlaylist,
    handlePlayPause,
    handleRemoveFromPlaylist,
    handleClearPlaylist,
  } = useAudioContext();

  return (
    <div className="flex flex-col h-full rounded-xl shadow-xl overflow-hidden bg-zinc-900">
      <div className="p-4 flex items-center justify-between border-b border-zinc-700">
        <h2 className="font-semibold text-zinc-100 text-lg">
          Playlist ({playlist.length})
        </h2>
        {playlist.length > 0 && (
          <button
            className="btn btn-circle btn-sm bg-zinc-700 hover:bg-zinc-600 text-zinc-200"
            onClick={handleClearPlaylist}>
            <Trash size={16} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-auto">
        {playlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center text-zinc-400">
            <MusicNote size={48} className="mb-2 text-zinc-500" />
            <p className="text-lg font-semibold text-zinc-300">
              Your playlist is empty
            </p>
            <p className="text-sm">Add some songs to get started</p>
          </div>
        ) : (
          <ReactSortable
            list={playlist}
            setList={(newState) => setPlaylist(newState)}
            className="">
            {playlist.map((track: PlaylistItem) => (
              <div
                key={track.temporaryId}
                onClick={() => {
                  if (currentTrack?.temporaryId !== track.temporaryId) {
                    handlePlayPause(
                      { sourceOrTemporaryId: "temporaryId" },
                      track
                    );
                  } else {
                    handlePlayPause();
                  }
                }}
                className={`flex items-center justify-between gap-4 p-4 hover:bg-zinc-800 transition-colors group ${
                  currentTrack?.temporaryId === track.temporaryId
                    ? "bg-zinc-700"
                    : ""
                }`}>
                {/* Thumbnail and Song Info */}
                <div className="flex gap-3 items-center">
                  {/* Drag Handle */}
                  <DotsSixVertical
                    size={20}
                    className="cursor-grab text-zinc-400 group-hover:text-zinc-300 transition-all"
                  />
                  <img
                    src={track.thumbnail || "https://placehold.co/24"}
                    alt={track.title || "Song Thumbnail"}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-200">
                      {formatSongName(track.source)}
                    </span>
                    <span className="text-sm text-zinc-400">
                      {track.artist}
                    </span>
                  </div>
                  <button className="flex items-center gap-3 text-left text-zinc-200">
                    {currentTrack?.temporaryId === track.temporaryId && (
                      <Play
                        size={20}
                        className={`flex-shrink-0 ${
                          playing ? "text-primary" : "text-zinc-400"
                        }`}
                      />
                    )}
                  </button>
                </div>
                {/* Play Button */}

                {/* Remove Button */}
                <button
                  className="btn btn-circle btn-sm opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-700 hover:bg-zinc-600"
                  onClick={(e) => {
                    e.preventDefault;
                    handleRemoveFromPlaylist(track.temporaryId!);
                  }}>
                  <X size={16} />
                </button>
              </div>
            ))}
          </ReactSortable>
        )}
      </div>
    </div>
  );
}
