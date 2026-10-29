// Single source of truth for the backend URL.
// Optional override: set VITE_API_URL in frontend/.env (defaults to local backend).
export const API_BASE = import.meta.env.VITE_API_URL || "https://backendinvoiceai.vercel.app/";
