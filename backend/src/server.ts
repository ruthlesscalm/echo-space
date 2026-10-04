import config from "./config/config.js"
import connectDB from "./database/db.js";
import app from "./app.js";

await connectDB();

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} as ${config.nodeEnv}`);
});
