import config from "../config/config.js";
import mongooose from "mongoose";

const MONGO_URI = config.mongoUri + config.mongoDbName;

async function connectDB(): Promise<void> {
  try {
    await mongooose.connect(MONGO_URI);
    console.log("MongoDB connection successful");
  } catch (err) {
    console.log(`MongoDB connection failed: ${err}`);
    process.exit(1);
  }
}

export default connectDB;
