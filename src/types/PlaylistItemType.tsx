import { Track } from "@/types/TableDatabaseType";

interface PlaylistItem extends Track {
  temporaryId: string;
}
export default PlaylistItem;
