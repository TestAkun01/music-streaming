import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const uploadMediaFile = async (
  mediaUrl: string,
  path: string
): Promise<string | undefined> => {
  if (!mediaUrl) return undefined;
  const response = await fetch(mediaUrl);
  const mediaBlob = await response.blob();

  const { data, error } = await supabase.storage
    .from("music-streaming")
    .upload(path, mediaBlob);

  if (error) throw error;

  const publicUrl = supabase.storage
    .from("music-streaming")
    .getPublicUrl(data.path).data.publicUrl;

  return publicUrl;
};
