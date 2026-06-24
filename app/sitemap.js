import { getPublishedPosts } from "@/lib/posts";
import { SITE } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  const base = SITE.url;
  const now = new Date();

  const staticRoutes = [
    { url: `${base}/`, priority: 1, changeFrequency: "weekly" },
    { url: `${base}/about`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/sponsorship`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/news`, priority: 0.7, changeFrequency: "weekly" },
    { url: `${base}/donate`, priority: 0.7, changeFrequency: "monthly" },
  ].map((r) => ({ ...r, lastModified: now }));

  let posts = [];
  try {
    posts = await getPublishedPosts();
  } catch {
    posts = [];
  }
  const postRoutes = posts.map((p) => ({
    url: `${base}/news/${p.slug}`,
    lastModified: new Date(p.updated_at || p.created_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
