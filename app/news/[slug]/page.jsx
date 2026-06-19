import Link from "next/link";
import { notFound } from "next/navigation";
import { s } from "@/lib/style";
import { formatDate } from "@/lib/site";
import { getPostBySlug } from "@/lib/posts";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "News · VIS Evolutions" };
  return {
    title: `${post.title} · VIS Evolutions`,
    description: post.excerpt || undefined,
  };
}

export default async function NewsPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div style={s("animation:fadeIn .5s ease both")}>
      <article style={s("max-width:780px;margin:0 auto;padding:64px 24px 96px")}>
        <Link href="/news" style={s("font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#8A1416")}>‹ All news</Link>

        <p style={s("margin:34px 0 0;font-family:'Chakra Petch',sans-serif;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#8A1416;font-weight:600")}>
          {formatDate(post.created_at)} · {post.author_name || "VIS Evolutions"}
        </p>
        <h1 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:clamp(28px,4.5vw,44px);line-height:1.1;color:#1B1A16;margin:12px 0 0;letter-spacing:-.01em")}>{post.title}</h1>

        {post.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.image_url} alt={post.title} style={s("width:100%;height:auto;display:block;border-radius:16px;margin:30px 0 0;border:1px solid #ECEAE4")} />
        )}

        <div style={s("margin:34px 0 0;font-size:18px;line-height:1.75;color:#33312d;white-space:pre-wrap")}>{post.content}</div>
      </article>
    </div>
  );
}
