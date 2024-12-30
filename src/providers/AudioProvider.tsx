"use client";

import AudioContextType from "@/types/AudioContextType";
import AudioProviderProps from "@/types/AudioProviderProps";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { v4 as uuidv4 } from "uuid";
import PlaylistItem from "@/types/PlaylistItemType";
import PlayOptions from "@/types/PlayOptionType";

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
    duration,
    playing,
    volume,
    setVolume,
    load,
    stop,
    togglePlayPause,
    seek,
    getPosition,
  } = useGlobalAudioPlayer();

  const [currentTime, setCurrentTime] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
  const [currentTrack, setCurrentTrack] = useState<PlaylistItem | null>(null);
  const [loop, setLoop] = useState<0 | 1 | 2>(0);
  const [trigger, setTrigger] = useState(0);

  const handleTrackChange = () => {
    if (playlist.length === 0 || !currentTrack) return;

    const currentTrackIndex = playlist.findIndex(
      (item) => item.temporaryId === currentTrack.temporaryId
    );

    switch (loop) {
      case 0:
        if (currentTrackIndex < playlist.length - 1) {
          setCurrentTrack(playlist[currentTrackIndex + 1]);
        }
        break;
      case 1:
        setCurrentTrack(currentTrack);
        setTrigger((prevTrigger) => prevTrigger + 1);
        break;
      case 2:
        setCurrentTrack(playlist[(currentTrackIndex + 1) % playlist.length]);
        break;
    }
  };

  useEffect(() => {
    if (currentTrack) {
      load(currentTrack.source, {
        autoplay: true,
        onend: () => handleTrackChange(),
      });
    }
  }, [currentTrack, trigger]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isSeeking) {
        const currentTimeNow = parseFloat(getPosition().toFixed(2));
        setCurrentTime(currentTimeNow);
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [isSeeking]);

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(event.target.value);
    setSeekTime(newTime);
    seek(newTime);
    setCurrentTime(newTime);
  };

  const handleSeekStart = () => {
    setIsSeeking(true);
    setSeekTime(currentTime);
  };

  const handleSeekEnd = () => {
    setIsSeeking(false);
    seek(seekTime);
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value) / 100);
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
      (item) => item.temporaryId === currentTrack?.temporaryId
    );
    const previousTrack =
      playlist[(currentTrackIndex - 1 + playlist.length) % playlist.length];
    setCurrentTrack(previousTrack);
  };

  const handlePlayPause = (options?: PlayOptions) => {
    if (options?.source) {
      const filteredTracks = playlist.filter(
        (item) => item.source === options.source
      );

      const track = filteredTracks.find(
        (track) => track.temporaryId === currentTrack?.temporaryId
      );

      if (track) {
        togglePlayPause();
      } else {
        const newTrack = {
          id: uuidv4(),
          source: options.source,
          temporaryId: uuidv4(),
        };
        setPlaylist([newTrack]);
        setCurrentTrack(newTrack);
      }
    } else if (options?.id) {
      const track = playlist.find((item) => item.id === options.id);

      if (track) {
        setCurrentTrack(track);
        togglePlayPause();
      }
    } else {
      togglePlayPause();
    }
  };

  const handleLoopChange = () => {
    setLoop((prevState) => ((prevState + 1) % 3) as 0 | 1 | 2);
  };

  const handleAddToPlaylist = (song: string) => {
    const newTrack = { id: uuidv4(), source: song, temporaryId: uuidv4() };
    setPlaylist((prevPlaylist) => [...prevPlaylist, newTrack]);
  };

  const handleRemoveFromPlaylist = (temporaryId: string) => {
    setPlaylist((prevPlaylist) => {
      const newPlaylist = prevPlaylist.filter(
        (item) => item.temporaryId !== temporaryId
      );
      if (temporaryId === currentTrack?.temporaryId) {
        setCurrentTrack(newPlaylist.length > 0 ? newPlaylist[0] : null);
      }
      return newPlaylist;
    });
  };

  const handleClearPlaylist = () => {
    setPlaylist([]);
    setCurrentTrack(null);
    stop();
  };

  const handleUpdatePlaylistSong = (id: string, newSource: string) => {
    setPlaylist((prevPlaylist) => {
      const newPlaylist = prevPlaylist.map((item) =>
        item.id === id ? { ...item, source: newSource } : item
      );
      if (id === currentTrack?.id) {
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

      if (
        currentTrack?.temporaryId === updatedPlaylist[fromIndex].temporaryId
      ) {
        setCurrentTrack(updatedPlaylist[toIndex]);
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
        currentTrack,
        setPlaylist,
        handleLoopChange,
        handlePlayPause,
        handleTimeChange,
        handleSeekStart,
        handleSeekEnd,
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
