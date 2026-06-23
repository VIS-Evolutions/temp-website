import { createClient } from "@supabase/supabase-js";

// Browser Supabase client using the public anon key. This is safe to expose —
// it's designed for client-side use and is protected by RLS. It is only used
// to upload images to a server-issued signed upload URL (see uploadCoverImage).
let client = null;

export function getSupabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Image uploads aren't configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local."
    );
  }
  if (!client) {
    client = createClient(url, key, { auth: { persistSession: false } });
  }
  return client;
}
