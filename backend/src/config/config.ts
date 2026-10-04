import dotenv from "dotenv";

dotenv.config();

type Config = {
  port: number;
  mongoUri: string;
  mongoDbName: string;
  nodeEnv: "production" | "development";
  jwtAccessToken: string;
};

const PORT = Number(process.env.PORT);
let NODE_ENV = process.env.NODE_ENV;

if (Number.isNaN(PORT)) {
  throw new Error("PORT must be a number");
}
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing");
}
if (!process.env.MONGO_DB_NAME) {
  throw new Error("MONGO_DB_NAME is missing");
}
let nodeEnv: Config["nodeEnv"];
if (NODE_ENV === "production" || NODE_ENV === "development") {
  nodeEnv = NODE_ENV;
} else {
  console.log("NODE_ENV is not set correctly, defaulting to development");
  nodeEnv = "development";
}

const config: Config = {
  port: PORT,
  mongoUri: process.env.MONGO_URI,
  mongoDbName: process.env.MONGO_DB_NAME,
  nodeEnv,
};

export default config;
