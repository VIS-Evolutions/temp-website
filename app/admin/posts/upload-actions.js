"use server";

import { requireAdmin } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";

const ALLOWED_BUCKETS = ["news-images", "sponsor-logos", "team-photos"];

// Issues a one-time signed URL the browser can upload a single image to.
// Gated behind requireAdmin, so only signed-in admins can obtain one — the
// bucket needs no public write policy because the signed token authorizes
// just this one upload.
export async function createUploadTicket(ext, bucket = "news-images") {
  await requireAdmin();
  if (!ALLOWED_BUCKETS.includes(bucket)) throw new Error("Unknown upload bucket.");
  const supabase = getSupabaseAdmin();

  const safeExt = /^[a-z0-9]{1,5}$/i.test(ext) ? ext.toLowerCase() : "webp";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;

  const { data, error } = await supabase.storage.from(bucket).createSignedUploadUrl(path);
  if (error) throw new Error(error.message);

  const { data: pub } = supabase.storage.from(bucket).getPublicUrl(path);
  return { path, token: data.token, publicUrl: pub.publicUrl };
}
