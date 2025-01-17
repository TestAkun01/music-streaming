import { createClient } from "@/utils/supabase/client";

export type GroupByOption = "collection" | "artist" | "genre";

export type GroupedTracks = {
  groupName: string;
  tracks: Track[];
}[];

export type GetCollectionTracksParams = {
  offset?: number;
  artistId?: string;
  collectionId?: number;
  groupBy?: GroupByOption;
};

export type Track = {
  id: number;
  title: string;
  genre: string | null;
  cover_url: string | null;
  duration: number;
  file_url: string;
  track_order: number;
  artist: {
    id: string;
    display_name: string;
    avatar_url: string | null;
  };
  collection: {
    id: number;
    name: string;
    description: string | null;
    cover_url: string | null;
    artists: {
      id: string;
      display_name: string;
      avatar_url: string | null;
    }[];
  };
};

const supabase = createClient();

export async function getCollectionTracks({
  offset = 100,
  artistId,
  collectionId,
  groupBy,
}: GetCollectionTracksParams): Promise<GroupedTracks> {
  let query = supabase
    .from("collections")
    .select(
      `id,
      name,
      description,
      cover_url,
      collection_tracks!inner (
        track_order,
        tracks!inner (
          id,
          title,
          genre,
          cover_url,
          duration,
          file_url,
          artist_id,
          profiles!inner (
            id,
            display_name,
            avatar_url
          )
        )
      ),
      collection_artists!inner (
        profiles!inner (
          id,
          display_name,
          avatar_url
        )
      )`
    )
    .order("id")
    .order("track_order", { referencedTable: "collection_tracks" })
    .range(0, offset);

  if (artistId) {
    query = query.eq("collection_artists.profiles.id", artistId);
  }

  if (collectionId) {
    query = query.eq("id", collectionId);
  }

  const { data: rawData, error } = await query;

  if (error) {
    throw error;
  }

  const formattedTracks: Track[] = rawData.flatMap((collection) => {
    return collection.collection_tracks.map((ct) => {
      const track = ct.tracks;
      return {
        id: track.id!,
        title: track.title!,
        genre: track.genre!,
        cover_url: track.cover_url!,
        duration: track.duration!,
        file_url: track.file_url!,
        track_order: ct.track_order!,
        artist: {
          id: track.profiles.id!,
          display_name: track.profiles.display_name!,
          avatar_url: track.profiles.avatar_url!,
        },
        collection: {
          id: collection.id!,
          name: collection.name!,
          description: collection.description!,
          cover_url: collection.cover_url!,
          artists: collection.collection_artists.map((ca) => ({
            id: ca.profiles.id!,
            display_name: ca.profiles.display_name!,
            avatar_url: ca.profiles.avatar_url!,
          })),
        },
      };
    });
  });

  if (groupBy) {
    const groupedTracks = Object.entries(
      formattedTracks.reduce((acc, track) => {
        let key: string;
        switch (groupBy) {
          case "collection":
            key = track.collection.name;
            break;
          case "artist":
            key = track.artist.display_name;
            break;
          case "genre":
            key = track.genre || "Unknown";
            break;
          default:
            key = "Ungrouped";
        }

        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(track);
        return acc;
      }, {} as Record<string, Track[]>)
    ).map(([groupName, tracks]) => ({ groupName, tracks }));

    return groupedTracks;
  }

  return [{ groupName: "Ungrouped", tracks: formattedTracks }];
}
