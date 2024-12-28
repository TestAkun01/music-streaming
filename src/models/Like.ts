import mongoose, { Schema, Document } from "mongoose";

interface ILike extends Document {
  user_id: mongoose.Types.ObjectId;
  song_id: mongoose.Types.ObjectId;
  liked_at: Date;
}

const LikeSchema: Schema = new Schema({
  user_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  song_id: { type: mongoose.Types.ObjectId, ref: "Song", required: true },
  liked_at: { type: Date, default: Date.now },
});

export default mongoose.models.Like ||
  mongoose.model<ILike>("Like", LikeSchema);
