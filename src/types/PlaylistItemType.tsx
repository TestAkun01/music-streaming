import Track from "./TrackType";

interface PlaylistItem extends Track {
  temporaryId: string;
}
export default PlaylistItem;
