import { Track } from "@/services/Database/tracks_view";

interface PlaylistItem extends Track {
  playlist_id: string;
}
export default PlaylistItem;
