import { notFound } from "next/navigation";
import { s } from "@/lib/style";
import { requireAdmin } from "@/lib/auth";
import { getPostById } from "@/lib/posts";
import PostForm from "../../post-form";
import { updatePostAction } from "../../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit post · VIS Evolutions Admin", robots: { index: false, follow: false } };

export default async function EditPostPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div style={s("max-width:760px;margin:0 auto;padding:56px 24px 96px")}>
      <h1 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:30px;color:#1B1A16;margin:0 0 28px;letter-spacing:-.01em")}>Edit post</h1>
      <PostForm action={updatePostAction} post={post} submitLabel="Save changes" />
    </div>
  );
}
