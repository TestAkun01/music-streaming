import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const isArtistInCollection = async (
  collectionId: number,
  artistId: string
): Promise<boolean> => {
  const { data, error } = await supabase
    .from("collection_artists")
    .select("id")
    .eq("collection_id", collectionId)
    .eq("artist_id", artistId)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return Boolean(data);
};

export const addArtistToCollection = async (
  collectionId: number,
  artistId: string
): Promise<void> => {
  const { error } = await supabase.from("collection_artists").insert([
    {
      collection_id: collectionId,
      artist_id: artistId,
    },
  ]);

  if (error) throw error;
};
