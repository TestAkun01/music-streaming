import mongoose, { Schema, Document } from "mongoose";

interface IAnalytics extends Document {
  song_id: mongoose.Types.ObjectId;
  user_id?: mongoose.Types.ObjectId;
  played_at: Date;
  location: string;
}

const AnalyticsSchema: Schema = new Schema({
  song_id: { type: mongoose.Types.ObjectId, ref: "Song", required: true },
  user_id: { type: mongoose.Types.ObjectId, ref: "User" },
  played_at: { type: Date, default: Date.now },
  location: { type: String },
});

export default mongoose.models.Analytics ||
  mongoose.model<IAnalytics>("Analytics", AnalyticsSchema);
