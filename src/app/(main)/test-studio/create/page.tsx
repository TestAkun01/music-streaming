"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  UploadSimple,
  X,
  Image as ImageIcon,
  MusicNote,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const NewTrackUpload: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const supabase = createClient();
  const [formData, setFormData] = useState<{
    title: string;
    genre: string;
    visibility: "Public" | "Private";
  }>({
    title: "",
    genre: "",
    visibility: "Public" as const,
  });

  const [files, setFiles] = useState<{
    audio: File | null;
    cover: File | null;
    audioDuration: number;
    audioPreview: string;
    coverPreview: string;
  }>({
    audio: null,
    cover: null,
    audioDuration: 0,
    audioPreview: "",
    coverPreview: "",
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "audio" | "cover"
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxSize = type === "audio" ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError(
        `${
          type === "audio" ? "Audio" : "Image"
        } file is too large. Maximum size is ${maxSize / (1024 * 1024)}MB`
      );
      return;
    }

    // Validate file type
    const validTypes =
      type === "audio"
        ? ["audio/mpeg", "audio/wav", "audio/mp3"]
        : ["image/jpeg", "image/png", "image/jpg"];

    if (!validTypes.includes(file.type)) {
      setError(
        `Invalid ${type} file type. Supported formats: ${validTypes.join(", ")}`
      );
      return;
    }

    const preview = URL.createObjectURL(file);

    if (type === "audio") {
      // Get audio duration
      const audio = new Audio(preview);
      audio.addEventListener("loadedmetadata", () => {
        setFiles((prev) => ({
          ...prev,
          audio: file,
          audioDuration: Math.round(audio.duration),
          audioPreview: preview,
        }));
      });
    } else {
      setFiles((prev) => ({
        ...prev,
        cover: file,
        coverPreview: preview,
      }));
    }
  };

  const uploadFile = async (file: File, path: string) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { data, error } = await supabase.storage
      .from("music-streaming")
      .upload(filePath, file);

    if (error) throw error;

    return filePath;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!files.audio || !files.cover) {
        throw new Error("Please upload both audio file and cover image");
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error("No user logged in");

      const [audioPath, coverPath] = await Promise.all([
        uploadFile(files.audio, user.id + "/audio"),
        uploadFile(files.cover, user.id + "/cover"),
      ]);

      const audioUrl = supabase.storage
        .from("music-streaming")
        .getPublicUrl(audioPath).data.publicUrl;
      const coverUrl = supabase.storage
        .from("music-streaming")
        .getPublicUrl(coverPath).data.publicUrl;

      const { error: insertError } = await supabase.from("tracks").insert({
        title: formData.title,
        genre: formData.genre,
        visibility: formData.visibility,
        file_url: audioUrl,
        cover_url: coverUrl,
        artist_id: user.id,
        duration: files.audioDuration,
      });

      if (insertError) throw insertError;

      router.push("/test-studio");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during upload"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Upload New Track</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-zinc-400 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full bg-zinc-800 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-zinc-400 mb-2">Genre</label>
              <input
                type="text"
                value={formData.genre}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, genre: e.target.value }))
                }
                className="w-full bg-zinc-800 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-zinc-400 mb-2">Visibility</label>
              <select
                value={formData.visibility}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    visibility: e.target.value as "Public" | "Private",
                  }))
                }
                className="w-full bg-zinc-800 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none">
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-400 mb-2">Audio File</label>
              <div className="relative">
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "audio")}
                  accept="audio/*"
                  className="hidden"
                  id="audio-upload"
                  required
                />
                <label
                  htmlFor="audio-upload"
                  className="w-full bg-zinc-800 px-4 py-8 rounded-lg border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-colors">
                  {files.audio ? (
                    <div className="flex items-center gap-2 text-white">
                      <MusicNote size={24} />
                      {files.audio.name}
                    </div>
                  ) : (
                    <>
                      <UploadSimple size={32} className="text-zinc-500 mb-2" />
                      <span className="text-zinc-500">
                        Click to upload audio file
                      </span>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 mb-2">Cover Image</label>
              <div className="relative">
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "cover")}
                  accept="image/*"
                  className="hidden"
                  id="cover-upload"
                  required
                />
                <label
                  htmlFor="cover-upload"
                  className="w-full bg-zinc-800 px-4 py-8 rounded-lg border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-colors">
                  {files.coverPreview ? (
                    <img
                      src={files.coverPreview}
                      alt="Cover preview"
                      className="w-32 h-32 object-cover rounded"
                    />
                  ) : (
                    <>
                      <ImageIcon size={32} className="text-zinc-500 mb-2" />
                      <span className="text-zinc-500">
                        Click to upload cover image
                      </span>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/tracks")}
              className="px-6 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors">
              Cancel
            </motion.button>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              onClick={handleSubmit}
              className="flex-1 px-6 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Uploading..." : "Upload Track"}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTrackUpload;
