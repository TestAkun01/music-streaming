import { AudioMetadata } from "@/types/AudioMetadataType";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const createTrack = async (
  userId: string,
  audioData: AudioMetadata,
  audioUrl: string,
  coverUrl?: string
) => {
  const { data, error } = await supabase
    .from("tracks")
    .insert([
      {
        title: audioData.title,
        artist_id: userId,
        genre: audioData.genre,
        file_url: audioUrl,
        cover_url: coverUrl,
        duration: audioData.duration,
        visibility: "Private" as const,
      },
    ])
    .select("id")
    .single();

  if (error) throw error;
  return data;
};
