import { create } from "zustand";

interface PlaylistState {
  playlistIsOpen: boolean;
  handlePlaylistIsOpen: () => void;
}

const usePlaylistStore = create<PlaylistState>((set) => ({
  playlistIsOpen: false,
  handlePlaylistIsOpen: () =>
    set((state) => ({ playlistIsOpen: !state.playlistIsOpen })),
}));

export default usePlaylistStore;
