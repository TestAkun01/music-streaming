import mongoose, { Schema, Document } from "mongoose";

interface IPlaylist extends Document {
  user_id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  is_public: boolean;
  created_at: Date;
}

const PlaylistSchema: Schema = new Schema({
  user_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: { type: String },
  is_public: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.Playlist ||
  mongoose.model<IPlaylist>("Playlist", PlaylistSchema);
