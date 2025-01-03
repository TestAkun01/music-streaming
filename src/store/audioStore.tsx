// store/audioStore.ts
import { create } from "zustand";
import PlaylistItem from "@/types/PlaylistItemType";
import { createRef } from "react";

type AudioState = {
  currentTime: number;
  seekTime: number;
  isSeeking: boolean;
  loop: 0 | 1 | 2;
  trigger: number;
  playlist: PlaylistItem[];
  playlistIsOpen: boolean;
  currentTrack: PlaylistItem | null;
  currentTrackRef: React.RefObject<PlaylistItem | null>;
  isSeekingRef: React.RefObject<boolean | null>;
  playlistRef: React.RefObject<PlaylistItem[] | null>;
  loopRef: React.RefObject<0 | 1 | 2 | null>;
  setCurrentTime: (time: number) => void;
  setSeekTime: (time: number) => void;
  setIsSeeking: (seeking: boolean) => void;
  setLoop: (loop: 0 | 1 | 2) => void;
  setTrigger: (trigger: number) => void;
  setPlaylist: (playlist: PlaylistItem[]) => void;
  setPlaylistIsOpen: (isOpen: boolean) => void;
  setCurrentTrack: (track: PlaylistItem | null) => void;
};

const useAudioStore = create<AudioState>((set) => ({
  currentTime: 0,
  seekTime: 0,
  isSeeking: false,
  loop: 0,
  trigger: 0,
  playlist: [],
  playlistIsOpen: false,
  currentTrack: null,
  currentTrackRef: createRef(),
  isSeekingRef: createRef(),
  playlistRef: createRef(),
  loopRef: createRef(),

  setCurrentTime: (time) => set({ currentTime: time }),
  setSeekTime: (time) => set({ seekTime: time }),
  setIsSeeking: (seeking) => set({ isSeeking: seeking }),
  setLoop: (loop) => set({ loop }),
  setTrigger: (trigger) => set({ trigger }),
  setPlaylist: (playlist) => set({ playlist }),
  setPlaylistIsOpen: (isOpen) => set({ playlistIsOpen: isOpen }),
  setCurrentTrack: (track) => set({ currentTrack: track }),
}));

export default useAudioStore;
