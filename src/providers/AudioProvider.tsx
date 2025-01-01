"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";

import AudioContextType from "@/types/AudioContextType";
import AudioProviderProps from "@/types/AudioProviderProps";
import PlaylistItem from "@/types/PlaylistItemType";
import PlayOptions from "@/types/PlayOptionType";
import { Track } from "@/types/TableDatabaseType";

import usePlaylistManager from "@/hooks/usePlaylistManager";
import useAudioTiming from "@/hooks/useAudioTiming";
import useTrackOperations from "@/hooks/useTrackOperations";

import { useGlobalAudioPlayer } from "react-use-audio-player";

const LOOP_STATES = {
  NO_LOOP: 0,
  LOOP_PLAYLIST: 1,
  LOOP_TRACK: 2,
} as const;

const SKIP_DURATION = 5;
const UPDATE_TIME_INTERVAL = 500;

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [loop, setLoop] = useState<0 | 1 | 2>(LOOP_STATES.NO_LOOP);
  const [trigger, setTrigger] = useState(0);
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

  const {
    playlist,
    currentTrack,
    playlistIsOpen,
    findNextTrack,
    setCurrentTrack,
    setPlaylist,
    addToPlaylist,
    removeFromPlaylist,
    clearPlaylist,
    togglePlaylistIsOpen,
  } = usePlaylistManager();

  const {
    currentTime,
    seekTime,
    isSeeking,
    setCurrentTime,
    setSeekTime,
    setIsSeeking,
    updateCurrentTime,
  } = useAudioTiming(getPosition);

  const { handleSourceTrack, handleTemporaryIdTrack } = useTrackOperations(
    playlist,
    currentTrack,
    addToPlaylist,
    setCurrentTrack,
    togglePlayPause
  );

  const playlistRef = useRef(playlist);
  const loopRef = useRef(loop);
  const currentTrackRef = useRef(currentTrack);

  useEffect(() => {
    playlistRef.current = playlist;
    loopRef.current = loop;
    currentTrackRef.current = currentTrack;
  }, [playlist, loop, currentTrack]);

  const handleTrackChange = useCallback(() => {
    const currentPlaylist = playlistRef.current;
    const currentLoop = loopRef.current;
    const currentTrackNow = currentTrackRef.current;

    if (currentPlaylist.length === 0 || !currentTrackNow) return;

    const currentTrackIndex = currentPlaylist.findIndex(
      (item) => item.temporaryId === currentTrackNow.temporaryId
    );

    switch (currentLoop) {
      case LOOP_STATES.NO_LOOP:
        if (currentTrackIndex < currentPlaylist.length - 1) {
          setCurrentTrack(currentPlaylist[currentTrackIndex + 1]);
          setTrigger((prev) => prev + 1);
        }
        break;
      case LOOP_STATES.LOOP_PLAYLIST:
        setCurrentTrack(
          currentPlaylist[(currentTrackIndex + 1) % currentPlaylist.length]
        );
        setTrigger((prev) => prev + 1);
        break;
      case LOOP_STATES.LOOP_TRACK:
        setCurrentTrack(currentTrackNow);
        setTrigger((prev) => prev + 1);
        break;
    }
  }, []);

  useEffect(() => {
    if (currentTrack) {
      let intervalId: NodeJS.Timeout;

      load(currentTrack.file_url, {
        autoplay: true,
        onload: () => {
          intervalId = setInterval(updateCurrentTime, UPDATE_TIME_INTERVAL);
        },
        onend: handleTrackChange,
      });

      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }
  }, [
    currentTrack?.temporaryId,
    trigger,
    updateCurrentTime,
    handleTrackChange,
    load,
  ]);

  const handlers = useMemo(
    () => ({
      handleTimeChange: (time: number) => {
        setSeekTime(time);
        seek(time);
        setCurrentTime(time);
      },

      handleSeekStart: () => {
        setIsSeeking(true);
        setSeekTime(currentTime);
      },

      handleSeekEnd: () => {
        setIsSeeking(false);
        seek(seekTime);
      },

      handleSkipForward: () => {
        const newTime = Math.min(currentTime + SKIP_DURATION, duration);
        seek(newTime);
        setCurrentTime(newTime);
      },

      handleSkipBackward: () => {
        const newTime = Math.max(currentTime - SKIP_DURATION, 0);
        seek(newTime);
        setCurrentTime(newTime);
      },

      handleNextTrack: handleTrackChange,

      handlePreviousTrack: () => {
        if (!currentTrack || playlist.length === 0) return;

        const currentTrackIndex = playlist.findIndex(
          (item) => item.temporaryId === currentTrack.temporaryId
        );
        const previousTrack =
          playlist[(currentTrackIndex - 1 + playlist.length) % playlist.length];
        setCurrentTrack(previousTrack);
      },

      handlePlayPause: (
        options?: PlayOptions,
        track?: Track | PlaylistItem
      ) => {
        if (!options) {
          togglePlayPause();
          return;
        }

        if (!track) return;

        switch (options.sourceOrTemporaryId) {
          case "source":
            handleSourceTrack(track as Track);
            break;
          case "temporaryId":
            handleTemporaryIdTrack(track as PlaylistItem);
            break;
        }
      },

      handleLoopChange: () => {
        setLoop((prevState) => ((prevState + 1) % 3) as 0 | 1 | 2);
      },

      handleVolumeChange: (newVolume: number) => {
        setVolume(Math.max(0, Math.min(1, newVolume)));
      },

      handleRemoveFromPlaylist: (temporaryId: string) => {
        if (temporaryId === currentTrack?.temporaryId) {
          const nextTrack = findNextTrack(temporaryId);

          if (nextTrack) {
            removeFromPlaylist(temporaryId);
            setCurrentTrack(nextTrack);
          } else {
            setCurrentTrack(null);
            setCurrentTime(0);
            stop();
            removeFromPlaylist(temporaryId);
          }
        } else {
          removeFromPlaylist(temporaryId);
        }
      },

      handleAddToPlaylist: (track: Track) => {
        addToPlaylist(track);
      },

      handleClearPlaylist: () => {
        clearPlaylist();
        stop();
      },

      handleTogglePlaylistIsOpen: togglePlaylistIsOpen,
    }),
    [
      currentTime,
      seekTime,
      duration,
      playlist,
      currentTrack,
      handleSourceTrack,
      handleTemporaryIdTrack,
      togglePlayPause,
      seek,
      setVolume,
      stop,
      addToPlaylist,
      removeFromPlaylist,
      setCurrentTrack,
      handleTrackChange,
    ]
  );

  const contextValue = useMemo(
    () => ({
      loop,
      currentTime,
      volume,
      playing,
      duration,
      playlist,
      currentTrack,
      playlistIsOpen,
      setPlaylist,
      ...handlers,
    }),
    [
      loop,
      currentTime,
      volume,
      playing,
      duration,
      playlist,
      currentTrack,
      playlistIsOpen,
      handlers,
    ]
  );

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be used within AudioProvider");
  }
  return context;
};
