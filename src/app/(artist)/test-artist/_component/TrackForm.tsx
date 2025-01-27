import { ImageSquare, MusicNotes, X } from "@phosphor-icons/react";
import { useState } from "react";
import { Track } from "../type";

interface AddTrackFormProps {
  onSubmit: (data: Partial<Track>) => void;
  onCancel: () => void;
}

const AddTrackForm: React.FC<AddTrackFormProps> = ({ onSubmit, onCancel }) => {
  const [coverPreview, setCoverPreview] = useState<string>("");

  return (
    <div className="fixed inset-0 bg-zinc-950/80 flex items-center justify-center p-4">
      <div className="bg-zinc-900 rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-zinc-100">Add New Track</h2>
          <button
            onClick={onCancel}
            className="btn btn-ghost btn-sm btn-square">
            <X size={20} />
          </button>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-zinc-300">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered bg-zinc-800 text-zinc-100"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-zinc-300">Genre</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered bg-zinc-800 text-zinc-100"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-zinc-300">Tags</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered bg-zinc-800 text-zinc-100"
                  placeholder="Separate with commas"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-zinc-300">Visibility</span>
                </label>
                <select className="select select-bordered bg-zinc-800 text-zinc-100">
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-zinc-300">Audio File</span>
                </label>
                <div className="border-2 border-dashed border-zinc-700 rounded-lg p-4 text-center">
                  <input type="file" className="hidden" accept="audio/*" />
                  <div className="flex flex-col items-center gap-2">
                    <MusicNotes size={24} className="text-orange-500" />
                    <p className="text-zinc-400 text-sm">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-zinc-500 text-xs">MP3, WAV up to 10MB</p>
                  </div>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-zinc-300">Cover Image</span>
                </label>
                <div className="border-2 border-dashed border-zinc-700 rounded-lg p-4 text-center">
                  <input type="file" className="hidden" accept="image/*" />
                  {coverPreview ? (
                    <img
                      src={coverPreview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <ImageSquare size={24} className="text-orange-500" />
                      <p className="text-zinc-400 text-sm">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-zinc-500 text-xs">
                        JPG, PNG up to 2MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onCancel} className="btn btn-ghost">
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary bg-orange-500 hover:bg-orange-600 border-none">
              Upload Track
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTrackForm;
