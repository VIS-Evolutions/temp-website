"use client";

import { useRef, useState, useTransition } from "react";
import { s } from "@/lib/style";
import { uploadCoverImage } from "@/lib/uploadCoverImage";

const field =
  "width:100%;padding:13px 15px;border:1.5px solid #ECEAE4;border-radius:10px;font-family:'Public Sans',sans-serif;font-size:16px;color:#1B1A16;outline:none;background:#FAFAF8";
const label =
  "display:block;font-size:13px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#6F6B64;margin-bottom:7px;font-family:'Chakra Petch',sans-serif";

export default function TeamForm({ action, member, submitLabel = "Add member" }) {
  const isEdit = !!member;
  const fileRef = useRef(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [pending, startTransition] = useTransition();
  const [photoUrl, setPhotoUrl] = useState(member?.photo_url || "");
  const [localPreview, setLocalPreview] = useState("");

  const busy = pending || !!status;
  const previewSrc = localPreview || photoUrl;

  function onPickFile(e) {
    const f = e.target.files?.[0];
    setError(null);
    if (f) setLocalPreview(URL.createObjectURL(f));
  }

  function removePhoto() {
    setPhotoUrl("");
    setLocalPreview("");
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.delete("photo");

    const file = fileRef.current?.files?.[0];
    let finalUrl = photoUrl;
    try {
      if (file && file.size) {
        if (!file.type.startsWith("image/")) throw new Error("Please choose an image file.");
        finalUrl = await uploadCoverImage(file, setStatus, "team-photos");
      }
    } catch (err) {
      setStatus("");
      setError(err.message || "Photo upload failed.");
      return;
    }

    fd.set("photo_url", finalUrl || "");
    setStatus("Saving…");
    startTransition(async () => {
      const res = await action(null, fd);
      if (res?.error) setError(res.error);
      setStatus("");
    });
  }

  return (
    <form onSubmit={handleSubmit} style={s("display:flex;flex-direction:column;gap:18px")}>
      {isEdit && <input type="hidden" name="id" defaultValue={member.id} />}

      <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:18px")}>
        <div>
          <label style={s(label)}>Name</label>
          <input name="name" defaultValue={member?.name || ""} placeholder="Alex Smith" style={s(field)} />
        </div>
        <div>
          <label style={s(label)}>Role</label>
          <input name="role" defaultValue={member?.role || ""} placeholder="Team Principal" style={s(field)} />
        </div>
      </div>

      <div>
        <label style={s(label)}>Display order</label>
        <input name="sort_order" type="number" defaultValue={member?.sort_order ?? 0} style={s(field)} />
      </div>

      <div>
        <label style={s(label)}>Photo</label>
        {previewSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewSrc} alt="" style={s("width:120px;height:120px;object-fit:cover;border:1px solid #ECEAE4;border-radius:12px;margin-bottom:10px;display:block")} />
        )}
        <div style={s("display:flex;gap:12px;align-items:center;flex-wrap:wrap")}>
          <input ref={fileRef} name="photo" type="file" accept="image/*" onChange={onPickFile} style={s("font-family:'Public Sans',sans-serif;font-size:14px;color:#4a4843")} />
          {previewSrc && (
            <button type="button" onClick={removePhoto} style={s("background:none;border:none;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:13px;letter-spacing:.04em;text-transform:uppercase;color:#A29C92;padding:4px")}>
              Remove
            </button>
          )}
        </div>
        <p style={s("margin:8px 0 0;font-size:13px;color:#A29C92")}>A square headshot looks best. Optimised automatically.</p>
      </div>

      {error && <p style={s("margin:0;font-size:14px;color:#8A1416;font-weight:600")}>{error}</p>}

      <button
        type="submit"
        disabled={busy}
        style={s(
          "align-self:flex-start;background:#8A1416;border:none;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:15px;letter-spacing:.04em;text-transform:uppercase;color:#fff;padding:14px 26px;border-radius:10px" +
            (busy ? ";opacity:.6" : "")
        )}
      >
        {status || submitLabel}
      </button>
    </form>
  );
}
