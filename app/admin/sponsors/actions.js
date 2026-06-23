"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createSponsor, updateSponsor, deleteSponsor } from "@/lib/sponsors";

export async function createSponsorAction(prevState, formData) {
  await requireAdmin();
  try {
    await createSponsor(formData);
  } catch (e) {
    return { error: e.message };
  }
  revalidatePath("/sponsorship");
  revalidatePath("/admin/sponsors");
  redirect("/admin/sponsors");
}

export async function updateSponsorAction(prevState, formData) {
  await requireAdmin();
  const id = (formData.get("id") || "").toString();
  try {
    await updateSponsor(id, formData);
  } catch (e) {
    return { error: e.message };
  }
  revalidatePath("/sponsorship");
  revalidatePath("/admin/sponsors");
  redirect("/admin/sponsors");
}

export async function deleteSponsorAction(formData) {
  await requireAdmin();
  const id = (formData.get("id") || "").toString();
  await deleteSponsor(id);
  revalidatePath("/sponsorship");
  revalidatePath("/admin/sponsors");
  redirect("/admin/sponsors");
}
