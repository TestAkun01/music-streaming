import { createClient } from "@/utils/supabase/client";
const supabase = createClient();

export const addTrackToCollection = async (
  collectionId: number,
  trackId: number,
  trackOrder: number | null
) => {
  const { error } = await supabase.from("collection_tracks").insert([
    {
      collection_id: collectionId,
      track_id: trackId,
      track_order: trackOrder,
    },
  ]);

  if (error) throw error;
};
