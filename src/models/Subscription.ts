import mongoose, { Schema, Document } from "mongoose";

interface ISubscription extends Document {
  user_id: mongoose.Types.ObjectId;
  start_date: Date;
  end_date: Date;
  plan: string;
}

const SubscriptionSchema: Schema = new Schema({
  user_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  plan: { type: String, enum: ["monthly", "annual"], required: true },
});

export default mongoose.models.Subscription ||
  mongoose.model<ISubscription>("Subscription", SubscriptionSchema);
