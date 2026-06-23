import "server-only";
import { getSupabaseAdmin } from "./supabase";

export function slugify(text) {
  return (
    (text || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "post"
  );
}

async function uniqueSlug(supabase, base, ignoreId) {
  let slug = base;
  for (let i = 0; i < 5; i++) {
    let q = supabase.from("news_posts").select("id").eq("slug", slug).limit(1);
    if (ignoreId) q = q.neq("id", ignoreId);
    const { data } = await q;
    if (!data || data.length === 0) return slug;
    slug = `${base}-${Math.random().toString(36).slice(2, 6)}`;
  }
  return `${base}-${Date.now().toString(36)}`;
}

// Cover images are compressed and uploaded directly to Supabase Storage from
// the browser; the form submits only the resulting public URL. We accept it as
// long as it points at our own Supabase project (defence against a tampered URL).
function cleanImageUrl(value) {
  const url = (value || "").toString().trim();
  if (!url) return null;
  const base = process.env.SUPABASE_URL;
  if (base && !url.startsWith(base)) {
    throw new Error("Invalid image URL.");
  }
  return url;
}

// ---- Public reads (degrade gracefully if Supabase isn't configured yet) ----

export async function getPublishedPosts() {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("news_posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug) {
  try {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from("news_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    return data || null;
  } catch {
    return null;
  }
}

// ---- Admin reads/writes ----------------------------------------------------

export async function getAllPosts() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("news_posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
}

export async function getPostById(id) {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("news_posts").select("*").eq("id", id).maybeSingle();
  return data || null;
}

export async function createPost(formData, session) {
  const supabase = getSupabaseAdmin();
  const title = (formData.get("title") || "").toString().trim();
  const content = (formData.get("content") || "").toString().trim();
  const excerpt = (formData.get("excerpt") || "").toString().trim();
  const published = formData.get("published") != null;
  if (!title || !content) throw new Error("Title and content are required.");

  const image_url = cleanImageUrl(formData.get("image_url"));
  const slug = await uniqueSlug(supabase, slugify(title));

  const { error } = await supabase.from("news_posts").insert({
    title,
    slug,
    excerpt: excerpt || null,
    content,
    image_url,
    author_id: session.sub,
    author_name: session.name || session.username,
    published,
  });
  if (error) throw new Error(error.message);
}

export async function updatePost(id, formData) {
  const supabase = getSupabaseAdmin();
  const title = (formData.get("title") || "").toString().trim();
  const content = (formData.get("content") || "").toString().trim();
  const excerpt = (formData.get("excerpt") || "").toString().trim();
  const published = formData.get("published") != null;
  if (!title || !content) throw new Error("Title and content are required.");

  const image_url = cleanImageUrl(formData.get("image_url"));

  const { error } = await supabase
    .from("news_posts")
    .update({ title, content, excerpt: excerpt || null, image_url, published, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deletePost(id) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("news_posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
