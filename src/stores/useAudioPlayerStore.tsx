"use client";

import { create } from "zustand";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { v4 as uuidv4 } from "uuid";
import PlaylistItem from "@/types/PlaylistItemType";
import { Track } from "@/services/Database/tracks_view";

interface AudioState {
  currentTime: number;
  seekTime: number;
  isSeeking: boolean;
  loop: 0 | 1 | 2;
  trigger: number;
  playlist: PlaylistItem[];
  currentTrack: PlaylistItem | null;

  setCurrentTime: (time: number) => void;
  setSeekTime: (time: number) => void;
  setIsSeeking: (seeking: boolean) => void;
  setLoop: (loop: 0 | 1 | 2) => void;
  setTrigger: (trigger: number) => void;
  setPlaylist: (playlist: PlaylistItem[]) => void;
  setCurrentTrack: (track: PlaylistItem | null) => void;

  handleAddToPlaylist: (
    tracks: Track[],
    resetPlaylist?: boolean
  ) => PlaylistItem[];
  handleRemoveFromPlaylist: (id: string) => void;
  handleClearPlaylist: () => void;
  handlePlayFromPlaylist: (track: PlaylistItem) => void;
  handlePlayCollection: (tracks: Track[]) => void;
  handleEndTrack: () => void;
  handleNextTrack: () => void;
  handlePreviousTrack: () => void;
  handleSkipForward: (currentPosition: number, duration: number) => number;
  handleSkipBackward: (currentPosition: number) => number;
  handleTimeChange: (time: number) => void;
  handleLoopChange: () => void;
  handleVolumeChange: (volume: number) => number;
}

const SKIP_DURATION = 5;

const useAudioPlayerStore = create<AudioState>((set, get) => {
  const findNextTrack = (removedTrackId: string): PlaylistItem | null => {
    const { playlist, currentTrack } = get();
    if (!currentTrack || playlist.length <= 1) return null;

    const currentIndex = playlist.findIndex(
      (track) => track.playlist_id === removedTrackId
    );
    return currentIndex < playlist.length - 1
      ? playlist[currentIndex + 1]
      : playlist[0];
  };

  const stopPlayback = () => {
    set({ currentTrack: null, playlist: [] });
  };

  return {
    currentTime: 0,
    seekTime: 0,
    isSeeking: false,
    loop: 0,
    trigger: 0,
    playlist: [],
    currentTrack: null,

    setCurrentTime: (time) => set({ currentTime: time }),
    setSeekTime: (time) => set({ seekTime: time }),
    setIsSeeking: (seeking) => set({ isSeeking: seeking }),
    setLoop: (loop) => set({ loop }),
    setTrigger: (trigger) => set({ trigger }),
    setPlaylist: (playlist) => set({ playlist }),
    setCurrentTrack: (track) => set({ currentTrack: track }),

    handleAddToPlaylist: (tracks, resetPlaylist) => {
      const newTracks = tracks.map((track) => ({
        ...track,
        playlist_id: uuidv4(),
      }));

      if (resetPlaylist) {
        set({ playlist: newTracks });
        return newTracks;
      }

      const updatedPlaylist = [...get().playlist, ...newTracks];
      set({ playlist: updatedPlaylist });
      return updatedPlaylist;
    },

    handleRemoveFromPlaylist: (id: string) => {
      const { currentTrack } = get();
      if (id === currentTrack?.playlist_id) {
        const nextTrack = findNextTrack(id);
        nextTrack ? set({ currentTrack: nextTrack }) : stopPlayback();
      }
      set({
        playlist: get().playlist.filter((item) => item.playlist_id !== id),
      });
    },

    handleClearPlaylist: stopPlayback,

    handlePlayFromPlaylist: (track) => {
      const playlistTrack = get().playlist.find(
        (item) => item.playlist_id === track.playlist_id
      );
      set({ currentTrack: playlistTrack || null });
    },

    handlePlayCollection: (tracks) => {
      const newPlaylist = get().handleAddToPlaylist(tracks, true);
      set({ currentTrack: newPlaylist[0] });
    },

    handleEndTrack: () => {
      const { playlist, currentTrack, loop, trigger } = get();
      if (!playlist || !currentTrack) return;

      const currentTrackIndex = playlist.findIndex(
        (item) => item.playlist_id === currentTrack.playlist_id
      );
      if (currentTrackIndex === -1) return;

      const nextTrack =
        loop === 0
          ? playlist[currentTrackIndex + 1] || null
          : loop === 1
          ? playlist[(currentTrackIndex + 1) % playlist.length]
          : currentTrack;

      if (nextTrack === currentTrack) {
        set({ trigger: trigger + 1 });
      } else {
        set({ currentTrack: nextTrack });
      }
    },

    handleNextTrack: () => {
      const { playlist, currentTrack } = get();
      if (!playlist || !currentTrack) return;

      const currentTrackIndex = playlist.findIndex(
        (item) => item.playlist_id === currentTrack.playlist_id
      );
      if (currentTrackIndex === -1) return;

      const nextTrack = playlist[currentTrackIndex + 1] || null;
      set({ currentTrack: nextTrack });
    },

    handlePreviousTrack: () => {
      const { playlist, currentTrack } = get();
      if (!currentTrack || playlist.length === 0) return;

      const currentTrackIndex = playlist.findIndex(
        (item) => item.playlist_id === currentTrack.playlist_id
      );
      const previousTrack =
        playlist[(currentTrackIndex - 1 + playlist.length) % playlist.length];

      set({ currentTrack: previousTrack });
    },

    handleSkipForward: (currentPosition: number, duration: number) => {
      return Math.min(currentPosition + SKIP_DURATION, duration);
    },

    handleSkipBackward: (currentPosition: number) => {
      return Math.max(currentPosition - SKIP_DURATION, 0);
    },

    handleTimeChange: (time) => {
      set({ currentTime: time });
    },

    handleLoopChange: () => {
      set({ loop: ((get().loop + 1) % 3) as 0 | 1 | 2 });
    },

    handleVolumeChange: (volume) => {
      return Math.max(0, Math.min(1, volume));
    },
  };
});

export const useAudioController = () => {
  const store = useAudioPlayerStore();
  const { seek, setVolume, getPosition, duration } = useGlobalAudioPlayer();

  const handleSkipForward = () => {
    const newPosition = store.handleSkipForward(getPosition(), duration);
    seek(newPosition);
  };

  const handleSkipBackward = () => {
    const newPosition = store.handleSkipBackward(getPosition());
    seek(newPosition);
  };

  const handleTimeChange = (time: number) => {
    seek(time);
    store.handleTimeChange(time);
  };

  const handleVolumeChange = (volume: number) => {
    const newVolume = store.handleVolumeChange(volume);
    setVolume(newVolume);
  };

  return {
    ...store,
    handleSkipForward,
    handleSkipBackward,
    handleTimeChange,
    handleVolumeChange,
  };
};

export default useAudioPlayerStore;
