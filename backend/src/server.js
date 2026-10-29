import "dotenv/config"; // must stay first so env vars exist before other modules read them
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { PORT } from "./config/constants.js";

if (!process.env.GEMINI_API_KEY) {
  console.warn("GEMINI_API_KEY is not set - the AI invoice endpoint will return an error until you add it.");
}

// DB Connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
