"use client";

import { UploadSimple, MusicNote, X, Image } from "@phosphor-icons/react";
import { useAudioUpload } from "@/hooks/useAudioUpload";
import { useState } from "react";
import { AudioMetadata } from "@/types/AudioMetadataType";

interface FormField {
  label: string;
  key: keyof AudioMetadata;
  type?: string;
}

const AudioUpload = () => {
  const {
    audioData,
    setAudioData,
    isLoading,
    handleAudioChange,
    handleUpload,
  } = useAudioUpload();
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleInputChange = (
    field: keyof AudioMetadata,
    value: string | number
  ) => {
    if (audioData) {
      setAudioData({ ...audioData, [field]: value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (audioData) {
        setAudioData({ ...audioData, imageUrl });
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("audio/")) {
      handleAudioChange({
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const formFields: FormField[] = [
    { label: "Title", key: "title" },
    { label: "Album", key: "album" },
    { label: "Genre", key: "genre" },
    { label: "Track", key: "track", type: "number" },
  ];

  if (!audioData) {
    return (
      <div className="p-14 h-full">
        <h1 className="text-2xl font-medium text-white mb-6">Upload Track</h1>
        <div className="bg-zinc-800/50 p-6 h-[calc(100%-2rem)] rounded-2xl">
          <input
            type="file"
            onChange={handleAudioChange}
            accept="audio/*"
            className="hidden"
            id="audio-upload"
          />

          <label
            htmlFor="audio-upload"
            onDragOver={(e: React.DragEvent<HTMLLabelElement>) =>
              e.preventDefault()
            }
            onDragEnter={(e: React.DragEvent<HTMLLabelElement>) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e: React.DragEvent<HTMLLabelElement>) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onDrop={handleDrop}
            className={`w-full h-full  rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer ${
              isDragging
                ? "border-orange-500 bg-orange-500/10"
                : "border-zinc-700/50"
            }`}>
            <div className="text-center">
              <UploadSimple
                size={48}
                className="mx-auto mb-4 text-orange-500/80"
              />
              <p className="text-zinc-300/90 text-lg">
                {isDragging
                  ? "Drop your audio file here"
                  : "Click or drag audio file here"}
              </p>
              <p className="text-zinc-500 text-sm mt-2">MP3, WAV up to 50MB</p>
            </div>
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="p-14">
      <h1 className="text-2xl font-medium text-white mb-6">
        Edit Track Details
      </h1>

      <div className="bg-zinc-800/50 rounded-2xl p-6 h-[calc(100%-2rem)]">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/5">
            <div className="text-center">
              {audioData.imageUrl ? (
                <div className="relative group w-40 h-40 mx-auto">
                  <img
                    src={audioData.imageUrl}
                    alt="Album Art"
                    className="rounded-lg object-cover"
                  />
                  <label
                    htmlFor="image-upload"
                    className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 rounded-lg cursor-pointer">
                    <Image size={24} className="text-white" />
                  </label>
                </div>
              ) : (
                <div
                  className="w-40 h-40 mx-auto rounded-lg bg-zinc-700/50 flex items-center justify-center cursor-pointer"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }>
                  <MusicNote size={48} className="text-orange-500/80" />
                </div>
              )}
              <p className="text-white/90 mt-4">
                {audioData.title || "Untitled Track"}
              </p>
            </div>

            <input
              type="file"
              accept="image/*"
              id="image-upload"
              onChange={handleImageChange}
              className="hidden"
            />

            <button
              onClick={handleUpload}
              disabled={isLoading}
              className="w-full mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg disabled:opacity-70">
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                ""
              )}
              {isLoading ? "Uploading..." : "Upload Track"}
            </button>
          </div>

          <div className="lg:w-3/5">
            <div className="relative">
              <button
                onClick={() => setAudioData(null)}
                className="absolute -top-2 -right-2 p-2 text-zinc-400 hover:text-zinc-300 rounded-full">
                <X size={20} />
              </button>

              {formFields.map((field) => (
                <div key={field.key} className="mb-6">
                  <label className="text-zinc-400 text-sm mb-2 block">
                    {field.label}
                  </label>
                  <input
                    type={field.type || "text"}
                    value={audioData[field.key] || ""}
                    onChange={(e) =>
                      handleInputChange(
                        field.key,
                        field.type === "number"
                          ? Number(e.target.value)
                          : e.target.value
                      )
                    }
                    className="w-full px-4 py-3 rounded-lg bg-zinc-700/30 text-white border border-zinc-600/30"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioUpload;
