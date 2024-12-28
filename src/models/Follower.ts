import mongoose, { Schema, Document } from "mongoose";

interface IFollower extends Document {
  user_id: mongoose.Types.ObjectId;
  following_id: mongoose.Types.ObjectId;
  followed_at: Date;
}

const FollowerSchema: Schema = new Schema({
  user_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  following_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  followed_at: { type: Date, default: Date.now },
});

export default mongoose.models.Follower ||
  mongoose.model<IFollower>("Follower", FollowerSchema);
