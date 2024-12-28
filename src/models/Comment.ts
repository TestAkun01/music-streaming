import mongoose, { Schema, Document } from "mongoose";

interface IComment extends Document {
  user_id: mongoose.Types.ObjectId;
  song_id: mongoose.Types.ObjectId;
  content: string;
  timestamp: Date;
}

const CommentSchema: Schema = new Schema({
  user_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  song_id: { type: mongoose.Types.ObjectId, ref: "Song", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Comment ||
  mongoose.model<IComment>("Comment", CommentSchema);
