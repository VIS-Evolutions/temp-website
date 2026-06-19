"use client";

import { useActionState } from "react";
import Link from "next/link";
import { s } from "@/lib/style";

const field =
  "width:100%;padding:13px 15px;border:1.5px solid #ECEAE4;border-radius:10px;font-family:'Public Sans',sans-serif;font-size:16px;color:#1B1A16;outline:none;background:#FAFAF8";
const label =
  "display:block;font-size:13px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#6F6B64;margin-bottom:7px;font-family:'Chakra Petch',sans-serif";

export default function PostForm({ action, post, submitLabel = "Publish post" }) {
  const [state, formAction, pending] = useActionState(action, { error: null });
  const isEdit = !!post;

  return (
    <form action={formAction} style={s("display:flex;flex-direction:column;gap:20px")}>
      {isEdit && <input type="hidden" name="id" defaultValue={post.id} />}
      {isEdit && <input type="hidden" name="existing_image" defaultValue={post.image_url || ""} />}

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
        {post?.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.image_url} alt="" style={s("width:100%;max-width:320px;border-radius:10px;border:1px solid #ECEAE4;margin-bottom:10px;display:block")} />
        )}
        <input name="image" type="file" accept="image/*" style={s("font-family:'Public Sans',sans-serif;font-size:14px;color:#4a4843")} />
        <p style={s("margin:8px 0 0;font-size:13px;color:#A29C92")}>
          {isEdit ? "Leave empty to keep the current image." : "Optional. JPG, PNG or WebP."}
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

      {state?.error && (
        <p style={s("margin:0;font-size:14px;color:#8A1416;font-weight:600")}>{state.error}</p>
      )}

      <div style={s("display:flex;gap:12px;align-items:center;flex-wrap:wrap")}>
        <button
          type="submit"
          disabled={pending}
          style={s(
            "background:#8A1416;border:none;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:15px;letter-spacing:.04em;text-transform:uppercase;color:#fff;padding:14px 28px;border-radius:10px" +
              (pending ? ";opacity:.6" : "")
          )}
        >
          {pending ? "Saving…" : submitLabel}
        </button>
        <Link href="/admin/dashboard" style={s("font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#6F6B64;padding:14px 4px")}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
