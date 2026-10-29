import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const PORT = Number(process.env.PORT) || 4000;

// Frontend origin allowed by CORS
export const CLIENT_URL = process.env.CLIENT_URL || "https://ainvoiceai.vercel.app/";

// Public base URL of this API (used to build links to uploaded files)
export const API_BASE = process.env.API_BASE_URL || `http://localhost:${PORT}`;

// backend/uploads (resolved from this file, so it works from any working directory)
export const UPLOADS_DIR = path.resolve(__dirname, "../../uploads");
