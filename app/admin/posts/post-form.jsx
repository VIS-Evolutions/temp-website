"use client";

import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import { s } from "@/lib/style";
import { uploadCoverImage } from "@/lib/uploadCoverImage";

const field =
  "width:100%;padding:13px 15px;border:1.5px solid #ECEAE4;border-radius:10px;font-family:'Public Sans',sans-serif;font-size:16px;color:#1B1A16;outline:none;background:#FAFAF8";
const label =
  "display:block;font-size:13px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#6F6B64;margin-bottom:7px;font-family:'Chakra Petch',sans-serif";

export default function PostForm({ action, post, submitLabel = "Publish post" }) {
  const isEdit = !!post;
  const fileRef = useRef(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [pending, startTransition] = useTransition();
  // The image currently attached to the post (existing one, or "" if removed).
  const [imageUrl, setImageUrl] = useState(post?.image_url || "");
  // Local preview for a freshly picked (not-yet-uploaded) file.
  const [localPreview, setLocalPreview] = useState("");

  const busy = pending || !!status;
  const previewSrc = localPreview || imageUrl;

  function onPickFile(e) {
    const f = e.target.files?.[0];
    setError(null);
    if (f) setLocalPreview(URL.createObjectURL(f));
  }

  function removeImage() {
    setImageUrl("");
    setLocalPreview("");
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.delete("image"); // never send the raw file through the server action

    const file = fileRef.current?.files?.[0];
    let finalUrl = imageUrl;

    try {
      if (file && file.size) {
        if (!file.type.startsWith("image/")) throw new Error("Please choose an image file (JPG, PNG or WebP).");
        finalUrl = await uploadCoverImage(file, setStatus);
      }
    } catch (err) {
      setStatus("");
      setError(err.message || "Image upload failed.");
      return;
    }

    fd.set("image_url", finalUrl || "");
    setStatus("Saving…");
    startTransition(async () => {
      const res = await action(null, fd);
      // On success the action redirects; we only get here on error.
      if (res?.error) setError(res.error);
      setStatus("");
    });
  }

  return (
    <form onSubmit={handleSubmit} style={s("display:flex;flex-direction:column;gap:20px")}>
      {isEdit && <input type="hidden" name="id" defaultValue={post.id} />}

      <div>
        <label style={s(label)}>Headline</label>
        <input name="title" defaultValue={post?.title || ""} placeholder="We hit a sub-second run" style={s(field)} />
      </div>

      <div>
        <label style={s(label)}>Short summary (shown on the card)</label>
        <input name="excerpt" defaultValue={post?.excerpt || ""} placeholder="One or two lines that tease the story." style={s(field)} />
      </div>

      <div>
        <label style={s(label)}>Cover image</label>
        {previewSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewSrc} alt="" style={s("width:100%;max-width:320px;border-radius:10px;border:1px solid #ECEAE4;margin-bottom:10px;display:block")} />
        )}
        <div style={s("display:flex;gap:12px;align-items:center;flex-wrap:wrap")}>
          <input ref={fileRef} name="image" type="file" accept="image/*" onChange={onPickFile} style={s("font-family:'Public Sans',sans-serif;font-size:14px;color:#4a4843")} />
          {previewSrc && (
            <button type="button" onClick={removeImage} style={s("background:none;border:none;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:13px;letter-spacing:.04em;text-transform:uppercase;color:#A29C92;padding:4px")}>
              Remove
            </button>
          )}
        </div>
        <p style={s("margin:8px 0 0;font-size:13px;color:#A29C92")}>
          Photos are automatically optimised before upload. JPG, PNG or WebP.
        </p>
      </div>

      <div>
        <label style={s(label)}>Post content</label>
        <textarea name="content" defaultValue={post?.content || ""} rows={14} placeholder="Write the full update here…" style={s(field + ";font-family:'Public Sans',sans-serif;line-height:1.6;resize:vertical")} />
      </div>

      <label style={s("display:flex;align-items:center;gap:10px;font-size:15px;color:#1B1A16;font-family:'Public Sans',sans-serif;cursor:pointer")}>
        <input type="checkbox" name="published" defaultChecked={post ? post.published : true} style={s("width:18px;height:18px;cursor:pointer")} />
        Published (visible on the public news page)
      </label>

      {error && <p style={s("margin:0;font-size:14px;color:#8A1416;font-weight:600")}>{error}</p>}

      <div style={s("display:flex;gap:12px;align-items:center;flex-wrap:wrap")}>
        <button
          type="submit"
          disabled={busy}
          style={s(
            "background:#8A1416;border:none;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:15px;letter-spacing:.04em;text-transform:uppercase;color:#fff;padding:14px 28px;border-radius:10px" +
              (busy ? ";opacity:.6" : "")
          )}
        >
          {status || submitLabel}
        </button>
        <Link href="/admin/dashboard" style={s("font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#6F6B64;padding:14px 4px")}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
