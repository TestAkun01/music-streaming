"use client";

import { ReactSortable } from "react-sortablejs";
import { motion, AnimatePresence } from "framer-motion";
import { MusicNote } from "@phosphor-icons/react/MusicNote";
import { Trash } from "@phosphor-icons/react/Trash";
import { Play } from "@phosphor-icons/react/Play";
import { Pause } from "@phosphor-icons/react/Pause";
import { X } from "@phosphor-icons/react/X";
import { DotsSixVertical } from "@phosphor-icons/react/DotsSixVertical";
import useAudioController from "@/hooks/useAudioController";
import PlaylistItem from "@/types/PlaylistItemType";
import { formatTime } from "@/utils/formatTime";

export default function Playlist() {
  const {
    playlist,
    currentTrack,
    playing,
    setPlaylist,
    handlePlayPause,
    handleRemoveFromPlaylist,
    handleClearPlaylist,
  } = useAudioController();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="flex flex-col h-full rounded-lg px-6 pt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <motion.h2
          className="font-semibold text-zinc-100 text-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}>
          Playlist ({playlist.length})
        </motion.h2>
        {playlist.length > 0 && (
          <motion.button
            className="btn btn-circle btn-sm bg-zinc-800 hover:bg-red-500 text-zinc-200 hover:text-white border-none transition-all duration-300"
            onClick={handleClearPlaylist}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>
            <Trash size={16} />
          </motion.button>
        )}
      </div>

      <div className="flex-1 my-2 overflow-auto scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-700">
        <AnimatePresence>
          {playlist.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full p-8 text-center">
              <MusicNote
                size={64}
                weight="thin"
                className="text-orange-500 mb-4"
              />
              <p className="text-lg font-semibold text-zinc-300 mb-2">
                Your playlist is empty
              </p>
              <p className="text-sm text-zinc-400">
                Add some songs to get started
              </p>
            </motion.div>
          ) : (
            <ReactSortable
              list={playlist}
              setList={(newState) => setPlaylist(newState)}
              animation={200}
              className="space-y-1">
              {playlist.map((track: PlaylistItem) => (
                <motion.div
                  key={track.temporaryId}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -20 }}
                  className={`flex items-center justify-between gap-4 p-3 rounded-lg hover:bg-zinc-800/80 transition-all duration-300 group cursor-pointer
                    ${
                      currentTrack?.temporaryId === track.temporaryId
                        ? "bg-zinc-800/80 border-l-2 border-orange-500"
                        : "border-l-2 border-transparent"
                    }`}
                  onClick={() => {
                    if (currentTrack?.temporaryId !== track.temporaryId) {
                      handlePlayPause("playlist", track);
                    } else {
                      handlePlayPause();
                    }
                  }}>
                  <div className="flex gap-3 items-center flex-1 min-w-0">
                    <DotsSixVertical
                      size={20}
                      weight="bold"
                      className="cursor-grab text-zinc-500 group-hover:text-zinc-300 transition-all"
                    />
                    <div className="relative">
                      <img
                        src={track.cover_url || "https://placehold.co/48"}
                        alt={track.title || "Song Thumbnail"}
                        className={`w-12 h-12 object-cover rounded-md group-hover:brightness-75 transition-all ${
                          currentTrack?.temporaryId === track.temporaryId
                            ? "brightness-75"
                            : ""
                        }`}
                      />
                      {currentTrack?.temporaryId === track.temporaryId && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-md">
                          {playing ? (
                            <Pause
                              size={20}
                              weight="fill"
                              className="text-white"
                            />
                          ) : (
                            <Play
                              size={20}
                              weight="fill"
                              className="text-white"
                            />
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium text-zinc-200 truncate">
                        {track.title}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {formatTime(track.duration)}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    className="btn btn-circle btn-sm opacity-0 group-hover:opacity-100 bg-zinc-700 hover:bg-red-500 hover:text-white border-none transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromPlaylist(track.temporaryId!);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}>
                    <X size={16} />
                  </motion.button>
                </motion.div>
              ))}
            </ReactSortable>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
