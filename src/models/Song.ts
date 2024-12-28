import mongoose, { Schema, Document } from "mongoose";

interface ISong extends Document {
  title: string;
  artist_id: mongoose.Types.ObjectId;
  genre: string;
  tags: string[];
  file_url: string;
  cover_url: string;
  duration: number;
  uploaded_at: Date;
  visibility: string;
}

const SongSchema: Schema = new Schema({
  title: { type: String, required: true },
  artist_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  genre: { type: String },
  tags: { type: [String] },
  file_url: { type: String, required: true },
  cover_url: { type: String },
  duration: { type: Number, required: true },
  uploaded_at: { type: Date, default: Date.now },
  visibility: {
    type: String,
    enum: ["public", "private", "unlisted"],
    default: "public",
  },
});

export default mongoose.models.Song ||
  mongoose.model<ISong>("Song", SongSchema);
