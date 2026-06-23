// Client-side image compression. Downscales to a sensible max dimension and
// re-encodes as WebP, which keeps photos looking good while cutting file size
// dramatically (a phone photo typically drops from several MB to a few hundred KB).

export function extFromType(type) {
  switch (type) {
    case "image/webp":
      return "webp";
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/gif":
      return "gif";
    default:
      return "webp";
  }
}

export async function compressImage(file, { maxDim = 1600, quality = 0.82 } = {}) {
  if (!file || !file.type?.startsWith("image/")) return file;
  // Don't re-encode GIFs — that would flatten any animation.
  if (file.type === "image/gif") return file;

  let bitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    return file; // fall back to the original if decoding fails
  }

  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close?.();

  const blob = await new Promise((res) => canvas.toBlob(res, "image/webp", quality));
  if (!blob) return file;
  // If we somehow made it bigger and didn't downscale, keep the original.
  if (blob.size >= file.size && scale === 1) return file;
  return blob;
}
