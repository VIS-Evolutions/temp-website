"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createPost, updatePost, deletePost } from "@/lib/posts";

export async function createPostAction(prevState, formData) {
  const session = await requireAdmin();
  try {
    await createPost(formData, session);
  } catch (e) {
    return { error: e.message };
  }
  revalidatePath("/news");
  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
}

export async function updatePostAction(prevState, formData) {
  await requireAdmin();
  const id = (formData.get("id") || "").toString();
  try {
    await updatePost(id, formData);
  } catch (e) {
    return { error: e.message };
  }
  revalidatePath("/news");
  revalidatePath(`/news`);
  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
}

export async function deletePostAction(formData) {
  await requireAdmin();
  const id = (formData.get("id") || "").toString();
  await deletePost(id);
  revalidatePath("/news");
  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
}
