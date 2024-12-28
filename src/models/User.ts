import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profile_picture: string;
  account_type: string;
  created_at: Date;
  last_login: Date;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  profile_picture: { type: String },
  account_type: {
    type: String,
    enum: ["free", "premium", "creator"],
    default: "free",
  },
  created_at: { type: Date, default: Date.now },
  last_login: { type: Date, default: null },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
