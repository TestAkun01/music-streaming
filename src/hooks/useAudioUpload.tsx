import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { AudioMetadata } from "@/types/AudioMetadataType";
import { parseAudioFile, validateAudioFile } from "@/utils/AudioMetadataHelper";

import { addTrackToCollection } from "@/services/Database/collection_tracks";
import { getUser } from "@/services/Auth/User";
import { uploadMediaFile } from "@/services/Storage/music-streaming";
import { createTrack } from "@/services/Database/tracks";
import { findOrCreateAlbumCollection } from "@/services/Database/collections";

export const useAudioUpload = () => {
  const [audioData, setAudioData] = useState<AudioMetadata | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAudioChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = validateAudioFile(file);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    try {
      const metadata = await parseAudioFile(file);

      setAudioData(metadata);
    } catch (error) {
      console.error("Error reading audio file:", error);
      alert("Failed to read audio file metadata");
    }
  };

  const handleUpload = async () => {
    if (!audioData) return;
    setIsLoading(true);

    try {
      const user = await getUser();
      if (!user) throw new Error("User not authenticated");
      const userId = user.id;

      const audioPath = `${userId}/audio/${uuidv4()}-audio.mp3`;
      const imagePath = `${userId}/cover/${uuidv4()}-cover.jpg`;

      const [audioUrl, imageUrl] = await Promise.all([
        uploadMediaFile(audioData.audioUrl, audioPath),
        uploadMediaFile(audioData?.imageUrl!, imagePath),
      ]);

      const newTrack = await createTrack(
        userId,
        audioData,
        audioUrl!,
        imageUrl
      );

      const collectionId = await findOrCreateAlbumCollection(
        userId,
        audioData.album,
        imageUrl || null
      );

      await addTrackToCollection(
        collectionId,
        newTrack.id,
        audioData.track || null
      );

      alert("Upload successful!");
      setAudioData(null);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    audioData,
    setAudioData,
    isLoading,
    handleAudioChange,
    handleUpload,
  };
};
