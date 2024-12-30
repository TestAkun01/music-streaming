"use client";

import AudioContextType from "@/types/AudioContextType";
import AudioProviderProps from "@/types/AudioProviderProps";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { v4 as uuidv4 } from "uuid";
import PlaylistItem from "@/types/PlaylistItemType";
import PlayOptions from "@/types/PlayOptionType";
import Track from "@/types/TrackType";
import { log } from "console";

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

  const playlistRef = useRef(playlist);
  const loopRef = useRef(loop);
  const currentTrackRef = useRef(currentTrack);
  const isSeekingRef = useRef(isSeeking);

  useEffect(() => {
    playlistRef.current = playlist;
    loopRef.current = loop;
    currentTrackRef.current = currentTrack;
    isSeekingRef.current = isSeeking;
  }, [playlist, loop, currentTrack, isSeeking]);

  const handleTrackChange = useCallback(() => {
    const currentPlaylist = playlistRef.current;
    const currentLoop = loopRef.current;
    const currentTrackNow = currentTrackRef.current;
    console.log(currentTrackNow);
    console.log(currentPlaylist);
    console.log(currentLoop);

    if (currentPlaylist.length === 0 || !currentTrackNow) return;

    const currentTrackIndex = currentPlaylist.findIndex(
      (item) => item.temporaryId === currentTrackNow.temporaryId
    );

    switch (currentLoop) {
      case 0:
        if (currentTrackIndex < currentPlaylist.length - 1) {
          setCurrentTrack(currentPlaylist[currentTrackIndex + 1]);
          setTrigger((prev) => prev + 1);
        }
        break;
      case 1:
        setCurrentTrack(
          currentPlaylist[(currentTrackIndex + 1) % currentPlaylist.length]
        );
        setTrigger((prev) => prev + 1);
        break;
      case 2:
        setCurrentTrack(currentTrackNow);
        setTrigger((prev) => prev + 1);
        break;
    }
  }, []);

  useEffect(() => {
    if (currentTrack) {
      let intervalId: NodeJS.Timeout;

      load(currentTrack.source, {
        autoplay: true,
        onload: () => {
          intervalId = setInterval(() => {
            if (!isSeekingRef.current) {
              const currentTimeNow = parseFloat(getPosition().toFixed(2));
              setCurrentTime(currentTimeNow);
            }
          }, 500);
        },
        onend: handleTrackChange,
      });

      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }
  }, [currentTrack?.temporaryId, trigger]);

  // handle Progress Bar Functions

  const handleTimeChange = (time: number) => {
    setSeekTime(time);
    seek(time);
    setCurrentTime(time);
  };

  const handleSeekStart = () => {
    setIsSeeking(true);
    setSeekTime(currentTime);
  };

  const handleSeekEnd = () => {
    setIsSeeking(false);
    seek(seekTime);
  };

  // handle Playback Functions
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

  const handleNextTrack = handleTrackChange;

  const handlePreviousTrack = () => {
    const currentTrackIndex = playlist.findIndex(
      (item) => item.temporaryId === currentTrack?.temporaryId
    );
    const previousTrack =
      playlist[(currentTrackIndex - 1 + playlist.length) % playlist.length];
    setCurrentTrack(previousTrack);
  };

  const handlePlayPause = (
    options?: PlayOptions,
    track?: Track | PlaylistItem
  ) => {
    if (options?.sourceOrTemporaryId === "source") {
      const filteredTracks = playlist.filter(
        (item) => item.source === track?.source
      );

      const filteredTrack = filteredTracks.find(
        (track) => track.temporaryId === currentTrack?.temporaryId
      );

      if (filteredTrack) {
        togglePlayPause();
      } else {
        const newTrack = {
          ...(track as Track),
          temporaryId: uuidv4(),
        };
        setPlaylist([newTrack]);
        setCurrentTrack(newTrack);
      }
    } else if (options?.sourceOrTemporaryId === "temporaryId") {
      const filteredTrack = playlist.find(
        (item) => item.temporaryId === (track as PlaylistItem).temporaryId!
      );

      if (filteredTrack) {
        setCurrentTrack(filteredTrack);
      }
    } else {
      togglePlayPause();
    }
  };

  // Handle Additional Functions

  const handleLoopChange = () => {
    setLoop((prevState) => ((prevState + 1) % 3) as 0 | 1 | 2);
  };
  const handleVolumeChange = (time: number) => {
    console.log(time);

    setVolume(time);
  };

  // Handle Playlist Functions
  const handleAddToPlaylist = (track: Track) => {
    const newTrack = { ...track, temporaryId: uuidv4() };
    setPlaylist((prevPlaylist) => [...prevPlaylist, newTrack]);
  };

  const handleRemoveFromPlaylist = (temporaryId: string) => {
    setPlaylist((prevPlaylist) => {
      const newPlaylist = prevPlaylist.filter(
        (item) => item.temporaryId !== temporaryId
      );
      if (temporaryId === currentTrack?.temporaryId) {
        setCurrentTrack(null);
        setCurrentTime(0);
        stop();
      }
      return newPlaylist;
    });
  };

  const handleClearPlaylist = () => {
    setPlaylist([]);
    setCurrentTrack(null);
    stop();
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
      }}>
      {children}
    </AudioContext.Provider>
  );
};
