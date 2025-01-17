import { AudioMetadata } from "@/types/AudioMetadataType";
import { parseBlob } from "music-metadata";

export const parseAudioFile = async (file: File): Promise<AudioMetadata> => {
  const metadata = await parseBlob(file);
  const imageUrl = metadata.common.picture?.[0]?.data
    ? URL.createObjectURL(new Blob([metadata.common.picture[0].data]))
    : "";
  const audioUrl = URL.createObjectURL(file);

  return {
    title: metadata.common.title || file.name,
    duration: Math.round(metadata.format.duration || 0),
    genre: metadata.common.genre?.join(", ") || null,
    album: metadata.common.album || "",
    track: metadata.common.track.no || null,
    imageUrl,
    audioUrl,
  };
};

export const validateAudioFile = (
  file: File
): { isValid: boolean; error?: string } => {
  const maxSize = 50 * 1024 * 1024;
  const validTypes = ["audio/mpeg", "audio/wav", "audio/mp3"];

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `Audio file is too large. Maximum size is ${
        maxSize / (1024 * 1024)
      }MB`,
    };
  }

  if (!validTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `Invalid audio file type. Supported formats: ${validTypes.join(
        ", "
      )}`,
    };
  }

  return { isValid: true };
};
