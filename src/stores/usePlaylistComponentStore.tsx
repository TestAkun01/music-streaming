import { create } from "zustand";

interface PlaylistComponentState {
  playlistIsOpen: boolean;
  handlePlaylistIsOpen: () => void;
}

const usePlaylistComponentStore = create<PlaylistComponentState>((set) => ({
  playlistIsOpen: false,
  handlePlaylistIsOpen: () =>
    set((state) => ({ playlistIsOpen: !state.playlistIsOpen })),
}));

export default usePlaylistComponentStore;
