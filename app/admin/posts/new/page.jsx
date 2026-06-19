import { s } from "@/lib/style";
import { requireAdmin } from "@/lib/auth";
import PostForm from "../post-form";
import { createPostAction } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "New post · VIS Evolutions Admin", robots: { index: false, follow: false } };

export default async function NewPostPage() {
  await requireAdmin();

  return (
    <div style={s("max-width:760px;margin:0 auto;padding:56px 24px 96px")}>
      <h1 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:30px;color:#1B1A16;margin:0 0 28px;letter-spacing:-.01em")}>New news post</h1>
      <PostForm action={createPostAction} submitLabel="Publish post" />
    </div>
  );
}
