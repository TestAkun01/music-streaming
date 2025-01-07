"use client";
import { useState } from "react";
import {
  UploadSimple,
  MusicNote,
  Clock,
  User,
  VinylRecord,
  Hash,
} from "@phosphor-icons/react";
import { parseBlob } from "music-metadata";
import { createClient } from "@/utils/supabase/client";
import { Enums } from "@/types/DatabaseType";
import { v4 as uuidv4 } from "uuid";

interface AudioMetadata {
  title: string;
  type: string;
  size: string;
  duration: number;
  artist?: string;
  genre: string[] | null;
  album?: string;
  track?: number | null;
  imageUrl?: string;
}

interface CollectionType {
  id: string;
  user_id: string;
  name: string;
  description: string;
  type: Enums<"collection_type_enum">;
  is_public: boolean;
  cover_url: string | null;
}

const AudioUpload: React.FC = () => {
  const [audioData, setAudioData] = useState<AudioMetadata | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const supabase = createClient();

  const handleAudioChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(
        `Audio file is too large. Maximum size is ${maxSize / (1024 * 1024)}MB`
      );
      return;
    }

    const validTypes = ["audio/mpeg", "audio/wav", "audio/mp3"] as const;
    type ValidAudioType = (typeof validTypes)[number];

    if (!validTypes.includes(file.type as ValidAudioType)) {
      alert(
        `Invalid audio file type. Supported formats: ${validTypes.join(", ")}`
      );
      return;
    }

    try {
      const metadata = await parseBlob(file);
      const imageUrl = metadata.common.picture?.[0]?.data
        ? URL.createObjectURL(new Blob([metadata.common.picture[0].data]))
        : undefined;

      setAudioData({
        title: metadata.common.title || file.name,
        type: file.type,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        duration: Math.round(metadata.format.duration || 0),
        genre: metadata.common.genre || null,
        artist: metadata.common.artist,
        album: metadata.common.album,
        track: metadata.common.track.no || null,
        imageUrl,
      });
    } catch (error) {
      console.error("Error reading audio file:", error);
    }
  };

  const handleUpload = async (): Promise<void> => {
    if (!audioData) return;
    setIsLoading(true);

    try {
      const userResponse = await supabase.auth.getUser();
      if (!userResponse.data.user) throw new Error("User not authenticated");
      const userId = userResponse.data.user.id;

      const audioFile =
        document.querySelector<HTMLInputElement>("#audio-upload")?.files?.[0];
      if (!audioFile) throw new Error("No audio file selected");

      // Upload audio file
      const { data: audioUpload, error: audioError } = await supabase.storage
        .from("music-streaming")
        .upload(`${userId}/audio/${uuidv4()}`, audioFile);

      if (audioError) throw audioError;

      const audioUrl = supabase.storage
        .from("music-streaming")
        .getPublicUrl(audioUpload.path).data.publicUrl;

      let coverUrl: string | undefined;
      if (audioData.imageUrl) {
        const response = await fetch(audioData.imageUrl);
        const imageBlob = await response.blob();
        const { data: imageUpload, error: imageError } = await supabase.storage
          .from("music-streaming")
          .upload(`${userId}/cover/${uuidv4()}-cover.jpg`, imageBlob);

        if (imageError) throw imageError;
        coverUrl = supabase.storage
          .from("music-streaming")
          .getPublicUrl(imageUpload.path).data.publicUrl;
      }

      // Create track record
      const { data: newTrack, error: errorTrack } = await supabase
        .from("tracks")
        .insert([
          {
            title: audioData.title,
            artist_id: userId,
            genre: audioData.genre?.join(", "),
            file_url: audioUrl,
            cover_url: coverUrl,
            duration: audioData.duration,
            visibility: "Private" as const,
          },
        ])
        .select("id")
        .single();

      if (errorTrack) throw errorTrack;

      // Handle collection
      if (audioData.album) {
        const { data: collections } = await supabase
          .from("collections")
          .select("id")
          .eq("user_id", userId)
          .eq("name", audioData.album);

        let collectionId = collections?.[0]?.id;

        if (!collectionId) {
          const { data: newCollection, error: newCollectionError } =
            await supabase
              .from("collections")
              .insert([
                {
                  user_id: userId,
                  name: audioData.album,
                  description: `Album: ${audioData.album}`,
                  type: "Album" as Enums<"collection_type_enum">,
                  is_public: false,
                  cover_url: coverUrl || null,
                },
              ])
              .select("id")
              .single();

          if (newCollectionError) throw newCollectionError;
          collectionId = newCollection.id;
        }

        const { error: collectionError } = await supabase
          .from("collection_tracks")
          .insert([
            {
              collection_id: collectionId,
              track_id: newTrack.id,
              track_order: audioData.track || null,
            },
          ]);

        if (collectionError) throw collectionError;
      }

      alert("Upload successful!");
      setAudioData(null);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-zinc-900 p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Upload Your Track
        </h1>

        <div className="card bg-zinc-800 shadow-xl">
          <div className="card-body">
            <input
              type="file"
              onChange={handleAudioChange}
              accept="audio/*"
              className="hidden"
              id="audio-upload"
            />
            <label
              htmlFor="audio-upload"
              className={`w-full rounded-lg border-2 border-dashed p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                audioData
                  ? "border-orange-500 bg-zinc-700/30"
                  : "border-zinc-700 hover:border-orange-500/50 hover:bg-zinc-700/10"
              }`}>
              {audioData ? (
                <div className="flex flex-col items-center gap-4">
                  {audioData.imageUrl ? (
                    <img
                      src={audioData.imageUrl}
                      alt="Album Art"
                      className="w-32 h-32 rounded-lg object-cover shadow-lg"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-lg bg-zinc-700 flex items-center justify-center">
                      <MusicNote size={48} className="text-orange-500" />
                    </div>
                  )}
                  <div className="text-center">
                    <p className="text-white font-semibold">
                      {audioData.title}
                    </p>
                    <p className="text-zinc-400 text-sm">{audioData.type}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <UploadSimple
                    size={48}
                    className="text-orange-500 mx-auto mb-4"
                  />
                  <p className="text-zinc-300 font-medium">
                    Drop your audio file here
                  </p>
                  <p className="text-zinc-500 text-sm mt-2">
                    MP3, WAV up to 50MB
                  </p>
                </div>
              )}
            </label>

            {audioData && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Clock className="text-orange-500" size={20} />
                    <span>{formatDuration(audioData.duration)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Hash className="text-orange-500" size={20} />
                    <span>Track {audioData.track || "N/A"}</span>
                  </div>
                  {audioData.artist && (
                    <div className="flex items-center gap-2 text-zinc-300">
                      <User className="text-orange-500" size={20} />
                      <span>{audioData.artist}</span>
                    </div>
                  )}
                  {audioData.album && (
                    <div className="flex items-center gap-2 text-zinc-300">
                      <VinylRecord className="text-orange-500" size={20} />
                      <span>{audioData.album}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleUpload}
                  disabled={isLoading}
                  className="btn btn-primary w-full bg-orange-500 hover:bg-orange-600 border-none text-white mt-6">
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Uploading...
                    </>
                  ) : (
                    "Upload Track"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioUpload;
