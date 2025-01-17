import { createClient } from "@/utils/supabase/client";
import { Enums } from "@/types/DatabaseType";
import {
  addArtistToCollection,
  isArtistInCollection,
} from "./collection_artists";

const supabase = createClient();

export const findCollectionByName = async (
  albumName: string
): Promise<number | null> => {
  const { data, error } = await supabase
    .from("collections")
    .select("id")
    .eq("name", albumName)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data?.id || null;
};

export const createCollection = async (
  albumName: string,
  coverUrl: string | null
): Promise<number> => {
  const { data, error } = await supabase
    .from("collections")
    .insert([
      {
        name: albumName,
        description: `Album: ${albumName}`,
        type: "Single" as Enums<"collection_type_enum">,
        is_public: false,
        cover_url: coverUrl,
      },
    ])
    .select("id")
    .single();

  if (error) throw error;
  return data.id;
};

export const findOrCreateAlbumCollection = async (
  userId: string,
  albumName: string,
  coverUrl: string | null
): Promise<number> => {
  const collectionId = await findCollectionByName(albumName);
  console.log("this is good3");

  if (collectionId) {
    const isArtist = await isArtistInCollection(collectionId, userId);
    if (isArtist) {
      return collectionId;
    }
  }
  console.log("this is good4");

  const newCollectionId = await createCollection(albumName, coverUrl);
  console.log("this is good5");

  await addArtistToCollection(newCollectionId, userId);

  return newCollectionId;
};
