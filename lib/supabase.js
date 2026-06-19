import "server-only";
import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client using the service-role key. It bypasses RLS, so
// it must NEVER be imported into client components — the "server-only" import
// above makes that a build error.
let cached = null;

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local"
    );
  }
  if (!cached) {
    cached = createClient(url, key, { auth: { persistSession: false } });
  }
  return cached;
}

export const NEWS_BUCKET = "news-images";
