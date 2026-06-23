"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createTeamMember, updateTeamMember, deleteTeamMember } from "@/lib/team";

export async function createTeamAction(prevState, formData) {
  await requireAdmin();
  try {
    await createTeamMember(formData);
  } catch (e) {
    return { error: e.message };
  }
  revalidatePath("/about");
  revalidatePath("/admin/team");
  redirect("/admin/team");
}

export async function updateTeamAction(prevState, formData) {
  await requireAdmin();
  const id = (formData.get("id") || "").toString();
  try {
    await updateTeamMember(id, formData);
  } catch (e) {
    return { error: e.message };
  }
  revalidatePath("/about");
  revalidatePath("/admin/team");
  redirect("/admin/team");
}

export async function deleteTeamAction(formData) {
  await requireAdmin();
  const id = (formData.get("id") || "").toString();
  await deleteTeamMember(id);
  revalidatePath("/about");
  revalidatePath("/admin/team");
  redirect("/admin/team");
}
