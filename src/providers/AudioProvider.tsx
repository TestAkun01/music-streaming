"use client";

import AudioContextType from "@/types/AudioContextType";
import AudioProviderProps from "@/types/AudioProviderProps";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { v4 as uuidv4 } from "uuid";
import PlaylistItem from "@/types/PlaylistItem";

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be used within AudioProvider");
  }
  return context;
};

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const {
    src,
    duration,
    playing,
    volume,
    setVolume,
    load,
    togglePlayPause,
    seek,
    getPosition,
  } = useGlobalAudioPlayer();

  const [currentTime, setCurrentTime] = useState(0);
  const [dragTime, setDragTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [loop, setLoop] = useState<0 | 1 | 2>(0);
  const [trigger, setTrigger] = useState(0);

  const handleTrackChange = () => {
    if (playlist.length === 0 || !currentId) return;

    const currentTrackIndex = playlist.findIndex(
      (item) => item.id === currentId
    );

    switch (loop) {
      case 0:
        if (currentTrackIndex < playlist.length - 1) {
          setCurrentId(playlist[currentTrackIndex + 1].id);
        }
        break;
      case 1:
        setCurrentId(currentId);
        setTrigger((prevTrigger) => prevTrigger + 1);
        break;
      case 2:
        setCurrentId(playlist[(currentTrackIndex + 1) % playlist.length].id);
        break;
    }
  };
  useEffect(() => {
    if (playlist.length > 0 && currentId) {
      const currentTrack = playlist.find((item) => item.id === currentId);
      if (currentTrack) {
        load(currentTrack.source, {
          autoplay: true,
          onend: () => handleTrackChange(),
        });
      }
    }
  }, [currentId, playlist, trigger]);

  useEffect(() => {
    let animationFrameId: number;
    const updatePosition = () => {
      if (!isDragging) {
        setCurrentTime(getPosition());
      }
      animationFrameId = requestAnimationFrame(updatePosition);
    };
    animationFrameId = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(animationFrameId);
  }, [getPosition, isDragging]);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setDragTime(newTime);
    seek(newTime);
    setCurrentTime(newTime);
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setDragTime(currentTime);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    seek(dragTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value) / 100);
  };

  const handleSkipForward = () => {
    const newTime = Math.min(currentTime + 5, duration);
    seek(newTime);
    setCurrentTime(newTime);
  };

  const handleSkipBackward = () => {
    const newTime = Math.max(currentTime - 5, 0);
    seek(newTime);
    setCurrentTime(newTime);
  };

  const handleNextTrack = () => {
    handleTrackChange();
  };

  const handlePreviousTrack = () => {
    const currentTrackIndex = playlist.findIndex(
      (item) => item.id === currentId
    );
    const previousTrack =
      playlist[(currentTrackIndex - 1 + playlist.length) % playlist.length];
    setCurrentId(previousTrack.id);
  };
  const handlePlayPause = (source?: string) => {
    if (!src) {
      if (source) {
        const newTrack = { id: uuidv4(), source };
        setPlaylist((prevPlaylist) => [...prevPlaylist, newTrack]);
        setCurrentId(newTrack.id);
      } else if (playlist.length > 0) {
        setCurrentId(playlist[0].id);
      }
    } else {
      if (source) {
        const track = playlist.find((item) => item.source === source);
        if (track) {
          setCurrentId(track.id);
        }
      } else {
        togglePlayPause();
      }
    }
  };

  const handleLoopChange = () => {
    setLoop((prevState) => ((prevState + 1) % 3) as 0 | 1 | 2);
  };

  const handleAddToPlaylist = (song: string) => {
    const newTrack = { id: uuidv4(), source: song };
    setPlaylist((prevPlaylist) => [...prevPlaylist, newTrack]);
  };

  const handleRemoveFromPlaylist = (id: string) => {
    setPlaylist((prevPlaylist) => {
      const newPlaylist = prevPlaylist.filter((item) => item.id !== id);
      if (id === currentId) {
        setCurrentId(newPlaylist.length > 0 ? newPlaylist[0].id : null);
      }
      return newPlaylist;
    });
  };

  const handleClearPlaylist = () => {
    setPlaylist([]);
    setCurrentId(null);
  };

  const handleUpdatePlaylistSong = (id: string, newSource: string) => {
    setPlaylist((prevPlaylist) => {
      const newPlaylist = prevPlaylist.map((item) =>
        item.id === id ? { ...item, source: newSource } : item
      );
      if (id === currentId) {
        load(newSource, {
          autoplay: playing,
          onend: () => handleTrackChange(),
        });
      }
      return newPlaylist;
    });
  };

  const handleReorderPlaylist = (fromIndex: number, toIndex: number) => {
    setPlaylist((prevPlaylist) => {
      const updatedPlaylist = [...prevPlaylist];
      const [movedSong] = updatedPlaylist.splice(fromIndex, 1);
      updatedPlaylist.splice(toIndex, 0, movedSong);

      if (currentId === updatedPlaylist[fromIndex].id) {
        setCurrentId(updatedPlaylist[toIndex].id);
      }

      return updatedPlaylist;
    });
  };

  return (
    <AudioContext.Provider
      value={{
        loop,
        currentTime,
        volume,
        playing,
        duration,
        playlist,
        currentId,
        handleLoopChange,
        handlePlayPause,
        handleTimeChange,
        handleDragStart,
        handleDragEnd,
        handleVolumeChange,
        handleSkipForward,
        handleSkipBackward,
        handleNextTrack,
        handlePreviousTrack,
        handleAddToPlaylist,
        handleRemoveFromPlaylist,
        handleClearPlaylist,
        handleReorderPlaylist,
        handleUpdatePlaylistSong,
      }}>
      {children}
    </AudioContext.Provider>
  );
};
