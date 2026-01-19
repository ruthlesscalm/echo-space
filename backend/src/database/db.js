import dotenv from "dotenv";
dotenv.config();
import mongooose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongooose.connect(MONGO_URI);
    console.log("MongoDB connection successful");
  } catch (err) {
    console.log(`MongoDB connection failed: ${err}`);
    process.exit(1);
  }
}

export default connectDB;
