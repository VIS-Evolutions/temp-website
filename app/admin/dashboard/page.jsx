import Link from "next/link";
import { s } from "@/lib/style";
import { formatDate } from "@/lib/site";
import { requireAdmin } from "@/lib/auth";
import { getAllPosts } from "@/lib/posts";
import { logout } from "../actions";
import { deletePostAction } from "../posts/actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dashboard · VIS Evolutions Admin", robots: { index: false, follow: false } };

export default async function DashboardPage() {
  const session = await requireAdmin();

  let posts = [];
  let loadError = null;
  try {
    posts = await getAllPosts();
  } catch (e) {
    loadError = e.message;
  }

  return (
    <div style={s("max-width:980px;margin:0 auto;padding:56px 24px 96px")}>
      <div style={s("display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap;margin-bottom:32px")}>
        <div>
          <h1 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:32px;color:#1B1A16;margin:0;letter-spacing:-.01em")}>News dashboard</h1>
          <p style={s("margin:8px 0 0;font-size:15px;color:#6F6B64")}>Signed in as {session.name || session.username}.</p>
        </div>
        <div style={s("display:flex;gap:12px;align-items:center")}>
          <Link href="/admin/donation" style={s("background:transparent;border:1.5px solid #ECEAE4;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#1B1A16;padding:12px 18px;border-radius:8px")}>
            Donation goal
          </Link>
          <Link href="/admin/invite" style={s("background:transparent;border:1.5px solid #ECEAE4;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#1B1A16;padding:12px 18px;border-radius:8px")}>
            Invite team
          </Link>
          <Link href="/admin/posts/new" style={s("background:#8A1416;border:none;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#fff;padding:12px 22px;border-radius:8px")}>
            + New post
          </Link>
          <form action={logout}>
            <button type="submit" style={s("background:transparent;border:1.5px solid #ECEAE4;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#6F6B64;padding:12px 18px;border-radius:8px")}>
              Log out
            </button>
          </form>
        </div>
      </div>

      {loadError && (
        <p style={s("font-size:14px;color:#8A1416;font-weight:600;margin-bottom:20px")}>Couldn&apos;t load posts: {loadError}</p>
      )}

      {posts.length === 0 && !loadError ? (
        <div style={s("background:#fff;border:1px solid #ECEAE4;border-radius:14px;padding:48px 28px;text-align:center")}>
          <p style={s("margin:0;font-size:16px;color:#6F6B64")}>No posts yet. Create your first news update.</p>
        </div>
      ) : (
        <div style={s("display:flex;flex-direction:column;gap:12px")}>
          {posts.map((post) => (
            <div key={post.id} style={s("display:flex;align-items:center;gap:18px;background:#fff;border:1px solid #ECEAE4;border-radius:14px;padding:16px 20px")}>
              <div style={{ ...s("width:84px;height:60px;border-radius:8px;background:#F2F0EB;flex-shrink:0;overflow:hidden;display:flex;align-items:center;justify-content:center;color:#A29C92;font-size:11px;font-family:'Space Mono',monospace"), }}>
                {post.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.image_url} alt="" style={s("width:100%;height:100%;object-fit:cover")} />
                ) : (
                  "—"
                )}
              </div>
              <div style={s("flex:1;min-width:0")}>
                <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:17px;color:#1B1A16;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{post.title}</div>
                <div style={s("margin-top:3px;font-size:13px;color:#6F6B64")}>
                  {formatDate(post.created_at)} · {post.author_name || "—"}
                  {!post.published && <span style={s("color:#A29C92")}> · Draft</span>}
                </div>
              </div>
              <div style={s("display:flex;gap:8px;align-items:center;flex-shrink:0")}>
                <Link href={`/admin/posts/${post.id}/edit`} style={s("font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:13px;letter-spacing:.04em;text-transform:uppercase;color:#8A1416;padding:8px 12px")}>
                  Edit
                </Link>
                <form action={deletePostAction}>
                  <input type="hidden" name="id" value={post.id} />
                  <button type="submit" style={s("background:none;border:none;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:13px;letter-spacing:.04em;text-transform:uppercase;color:#A29C92;padding:8px 12px")}>
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
