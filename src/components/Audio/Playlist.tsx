"use client";

import { ReactSortable } from "react-sortablejs";
import {
  MusicNote,
  Trash,
  Play,
  X,
  DotsSixVertical,
} from "@phosphor-icons/react";
import { useAudioContext } from "@/providers/AudioProvider";
import formatSongName from "@/utils/formatSongName";

interface PlaylistProps {
  className?: string;
}

export default function Playlist({ className }: PlaylistProps) {
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
    <div
      className={`flex flex-col h-full bg-gray-800 border-l border-gray-700 rounded-lg shadow-lg overflow-hidden ${className}`}>
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <h2 className="font-semibold text-white text-lg">
          Playlist ({playlist.length})
        </h2>
        {playlist.length > 0 && (
          <button
            className="btn btn-circle btn-sm btn-error"
            onClick={handleClearPlaylist}>
            <Trash size={16} />
          </button>
        )}
      </div>

      <div className="flex-1">
        {playlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center text-gray-400">
            <MusicNote size={48} className="mb-2 text-gray-500" />
            <p>Your playlist is empty</p>
            <p className="text-sm">Add some songs to get started</p>
          </div>
        ) : (
          <ReactSortable
            list={playlist}
            setList={(newState) => setPlaylist(newState)}
            className="space-y-2 p-2">
            {playlist.map((song) => (
              <div
                key={song.id}
                className={`flex items-center gap-3 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors group ${
                  currentTrack?.temporaryId === song.temporaryId
                    ? "bg-gray-600"
                    : ""
                }`}>
                <DotsSixVertical
                  size={20}
                  className="cursor-grab text-gray-400 group-hover:text-gray-300 transition-all"
                />

                <button
                  onClick={() => {
                    if (currentTrack?.temporaryId !== song.temporaryId) {
                      handlePlayPause({ id: song.id });
                    } else {
                      handlePlayPause();
                    }
                  }}
                  className="flex-1 flex items-center gap-3 text-left text-gray-300">
                  {currentTrack?.temporaryId === song.temporaryId && (
                    <Play
                      size={20}
                      className={`flex-shrink-0 ${
                        playing ? "text-primary" : ""
                      }`}
                    />
                  )}
                  <span className="text-sm truncate">
                    {formatSongName(song.source)}
                  </span>
                </button>

                <button
                  className="btn btn-circle btn-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveFromPlaylist(song.temporaryId!)}>
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
