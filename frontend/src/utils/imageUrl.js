import { API_BASE } from "../config/api";

// Normalizes image URLs coming from the server:
// - keeps data:/blob: URLs as-is
// - rewrites localhost/127.0.0.1 absolute URLs to API_BASE (preserving path/search/hash)
// - prefixes relative paths like "/uploads/..." with API_BASE
export function resolveImageUrl(url) {
  if (!url) return null;
  const s = String(url).trim();

  // keep data/blobs as-is
  if (s.startsWith("data:") || s.startsWith("blob:")) return s;

  // absolute http(s)
  if (/^https?:\/\//i.test(s)) {
    try {
      const parsed = new URL(s);
      if (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") {
        const path =
          parsed.pathname + (parsed.search || "") + (parsed.hash || "");
        return `${API_BASE.replace(/\/+$/, "")}${path}`;
      }
      return parsed.href;
    } catch (e) {
      // fall through to relative handling
    }
  }

  // relative paths like "/uploads/..." or "uploads/..." -> prefix with API_BASE
  return `${API_BASE.replace(/\/+$/, "")}/${s.replace(/^\/+/, "")}`;
}
