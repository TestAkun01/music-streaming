import { Tables } from "@/types/DatabaseType";

interface PlaylistItem extends Tables<"tracks"> {
  temporaryId?: string;
}
export default PlaylistItem;
