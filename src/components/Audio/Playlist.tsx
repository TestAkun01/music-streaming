"use client";

import { useAudioContext } from "@/providers/AudioProvider";
import {
  DragIndicator,
  Audiotrack,
  Close,
  PlayArrow,
  Delete,
} from "@mui/icons-material";
import { DragEvent, useState } from "react";

export default function Playlist() {
  const {
    playlist,
    currentId,
    playing,
    handlePlayPause,
    handleRemoveFromPlaylist,
    handleClearPlaylist,
    handleReorderPlaylist,
  } = useAudioContext();

  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    if (draggedId === null) return;

    const draggedItem = document.querySelector(`[data-id="${draggedId}"]`);
    const targetItem = document.querySelector(`[data-id="${id}"]`);

    if (draggedItem && targetItem && draggedId !== id) {
      const fromIndex = playlist.findIndex((song) => song.id === draggedId);
      const toIndex = playlist.findIndex((song) => song.id === id);
      handleReorderPlaylist(fromIndex, toIndex);
      setDraggedId(id);
    }
  };

  const handleDragEnd = () => {
    setDraggedId(null);
  };

  const formatSongName = (url: string) => {
    try {
      const fileName = decodeURIComponent(url.split("/").pop() || "");
      return fileName.replace(/\.[^/.]+$/, "");
    } catch {
      return url;
    }
  };

  return (
    <div className="w-72 flex flex-col h-full border-l">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-semibold">Playlist ({playlist.length})</h2>
        {playlist.length > 0 && (
          <button className="h-8 w-8" onClick={handleClearPlaylist}>
            <Delete className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex-1">
        {playlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center text-muted-foreground">
            <Audiotrack className="h-12 w-12 mb-2" />
            <p>Your playlist is empty</p>
            <p className="text-sm">Add some songs to get started</p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {playlist.map((song) => (
              <div
                key={song.id}
                data-id={song.id}
                draggable
                onDragStart={() => handleDragStart(song.id)}
                onDragOver={(e) => handleDragOver(e, song.id)}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-2 p-2 rounded-md select-none group
                  ${draggedId === song.id ? "opacity-50" : ""}
                  ${currentId === song.id ? "bg-accent" : "hover:bg-accent/50"}
                `}>
                <DragIndicator className="h-4 w-4 cursor-grab text-muted-foreground" />

                <button
                  onClick={() => {
                    if (currentId !== song.id) {
                      handlePlayPause(song.source);
                    } else {
                      handlePlayPause();
                    }
                  }}
                  className="flex-1 flex items-center gap-2 text-left">
                  {currentId === song.id && (
                    <PlayArrow
                      className={`h-4 w-4 flex-shrink-0 ${
                        playing ? "text-primary" : ""
                      }`}
                    />
                  )}
                  <span
                    className={`text-sm truncate ${
                      currentId === song.id ? "font-medium" : ""
                    }`}>
                    {formatSongName(song.source)}
                  </span>
                </button>

                <button
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveFromPlaylist(song.id)}>
                  <Close className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
