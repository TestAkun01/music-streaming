import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  }
};

export default connectToDatabase;
