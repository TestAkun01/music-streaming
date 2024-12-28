"use client";

import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import {
  Audiotrack,
  Delete,
  PlayArrow,
  Close,
  DragIndicator,
} from "@mui/icons-material";
import { useAudioContext } from "@/providers/AudioProvider";
import formatSongName from "@/utils/formatSongName";

export default function Playlist() {
  const {
    playlist,
    currentId,
    playing,
    setPlaylist,
    handlePlayPause,
    handleReorderPlaylist,
    handleRemoveFromPlaylist,
    handleClearPlaylist,
  } = useAudioContext();

  return (
    <div className="w-80 flex flex-col h-full bg-gray-800 border-l border-gray-700 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <h2 className="font-semibold text-white text-lg">
          Playlist ({playlist.length})
        </h2>
        {playlist.length > 0 && (
          <button
            className="h-8 w-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
            onClick={handleClearPlaylist}>
            <Delete className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex-1">
        {playlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center text-gray-400">
            <Audiotrack className="h-12 w-12 mb-2 text-gray-500" />
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
                  currentId === song.id ? "bg-gray-600" : ""
                }`}>
                <DragIndicator className="h-5 w-5 cursor-grab text-gray-400 group-hover:text-gray-300 transition-all" />

                <button
                  onClick={() => {
                    if (currentId !== song.id) {
                      handlePlayPause({ id: song.id });
                    } else {
                      handlePlayPause();
                    }
                  }}
                  className="flex-1 flex items-center gap-3 text-left text-gray-300">
                  {currentId === song.id && (
                    <PlayArrow
                      className={`h-5 w-5 flex-shrink-0 ${
                        playing ? "text-primary" : ""
                      }`}
                    />
                  )}
                  <span className="text-sm truncate">
                    {formatSongName(song.source)}
                  </span>
                </button>

                <button
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-gray-300"
                  onClick={() => handleRemoveFromPlaylist(song.id)}>
                  <Close className="h-4 w-4" />
                </button>
              </div>
            ))}
          </ReactSortable>
        )}
      </div>
    </div>
  );
}
