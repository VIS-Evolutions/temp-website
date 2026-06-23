import Link from "next/link";
import { s } from "@/lib/style";
import { formatDate } from "@/lib/site";
import { getPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "News · VIS Evolutions",
  description: "The latest updates from the VIS Evolutions STEM racing team.",
};

const stripe =
  "background:repeating-linear-gradient(135deg,#F2F0EB,#F2F0EB 11px,#EBE8E2 11px,#EBE8E2 22px);display:flex;align-items:center;justify-content:center;color:#A29C92;font-family:'Space Mono',monospace;font-size:12px;letter-spacing:.16em;text-transform:uppercase";

function Card({ post }) {
  return (
    <Link href={`/news/${post.slug}`} data-reveal style={s("display:flex;flex-direction:column;background:#fff;border:1px solid #ECEAE4;border-radius:16px;overflow:hidden")}>
      <div style={{ ...s(stripe), aspectRatio: "16 / 10", width: "100%" }}>
        {post.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.image_url} alt={post.title} style={s("width:100%;height:100%;object-fit:cover;display:block")} />
        ) : (
          "[ No image ]"
        )}
      </div>
      <div style={s("padding:26px 28px 30px;display:flex;flex-direction:column;flex:1")}>
        <div style={s("font-family:'Chakra Petch',sans-serif;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8A1416;font-weight:600")}>
          {formatDate(post.created_at)} · VIS Evolutions
        </div>
        <h2 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:24px;line-height:1.18;color:#1B1A16;margin:12px 0 0;letter-spacing:-.01em")}>{post.title}</h2>
        {post.excerpt && (
          <p style={s("margin:12px 0 0;font-size:16px;line-height:1.6;color:#6F6B64")}>{post.excerpt}</p>
        )}
        <span style={s("margin-top:18px;font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#8A1416")}>Read more ›</span>
      </div>
    </Link>
  );
}

export default async function NewsPage() {
  const posts = await getPublishedPosts();

  return (
    <div style={s("animation:fadeIn .5s ease both")}>
      <section style={s("background:#fff;border-bottom:1px solid #ECEAE4")}>
        <div style={s("max-width:900px;margin:0 auto;padding:84px 24px 70px;text-align:center")}>
          <p style={s("font-family:'Chakra Petch',sans-serif;font-size:13px;letter-spacing:.3em;text-transform:uppercase;color:#8A1416;font-weight:600;margin:0")}>News</p>
          <h1 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:clamp(30px,5vw,50px);color:#1B1A16;margin:14px 0 18px;letter-spacing:-.01em")}>From the workshop floor.</h1>
          <p style={s("margin:0 auto;font-size:18px;line-height:1.65;color:#6F6B64;max-width:56ch")}>Build logs, race updates and milestones — straight from the six engineers behind VIS Evolutions.</p>
        </div>
      </section>

      <section style={s("max-width:1180px;margin:0 auto;padding:72px 24px 96px")}>
        {posts.length === 0 ? (
          <div style={s("text-align:center;max-width:520px;margin:0 auto;padding:60px 24px")}>
            <h2 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:24px;color:#1B1A16;margin:0 0 10px")}>No updates yet.</h2>
            <p style={s("margin:0;font-size:16px;line-height:1.6;color:#6F6B64")}>Check back soon — the team is busy building. Our first news posts will appear here.</p>
          </div>
        ) : (
          <div style={s("display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr));gap:28px")}>
            {posts.map((post) => (
              <Card key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
