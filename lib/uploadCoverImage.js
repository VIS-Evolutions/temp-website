"use client";

import { compressImage, extFromType } from "./imageCompress";
import { getSupabaseBrowser } from "./supabase-browser";
import { createUploadTicket } from "@/app/admin/posts/upload-actions";

// Compresses an image in the browser, then uploads it straight to Supabase
// Storage via a server-issued signed URL. Returns the public image URL.
// onStatus(label) reports progress for the UI. `bucket` picks the target
// (news-images | sponsor-logos | team-photos).
export async function uploadCoverImage(file, onStatus = () => {}, bucket = "news-images") {
  onStatus("Optimising image…");
  const blob = await compressImage(file);
  const ext = extFromType(blob.type);

  onStatus("Uploading image…");
  const ticket = await createUploadTicket(ext, bucket);
  const supabase = getSupabaseBrowser();
  const { error } = await supabase.storage
    .from(bucket)
    .uploadToSignedUrl(ticket.path, ticket.token, blob, {
      contentType: blob.type || "image/webp",
    });
  if (error) throw new Error(error.message || "Image upload failed.");

  return ticket.publicUrl;
}
