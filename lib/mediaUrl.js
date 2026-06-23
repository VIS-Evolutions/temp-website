import "server-only";

// Validates an image URL submitted by an admin form. Images are uploaded
// directly to Supabase Storage from the browser, so we only accept URLs that
// point at our own Supabase project (defence against a tampered value).
export function cleanMediaUrl(value) {
  const url = (value || "").toString().trim();
  if (!url) return null;
  const base = process.env.SUPABASE_URL;
  if (base && !url.startsWith(base)) {
    throw new Error("Invalid image URL.");
  }
  return url;
}
