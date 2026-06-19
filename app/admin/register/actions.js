"use server";

import { redirect } from "next/navigation";
import { registerAdminViaInvite } from "@/lib/invites";
import { createSession } from "@/lib/auth";

export async function registerAction(prevState, formData) {
  const token = (formData.get("token") || "").toString();
  const username = (formData.get("username") || "").toString();
  const password = (formData.get("password") || "").toString();
  const confirm = (formData.get("confirm") || "").toString();
  const displayName = (formData.get("display_name") || "").toString();

  if (password !== confirm) {
    return { error: "Passwords don't match." };
  }

  let admin;
  try {
    admin = await registerAdminViaInvite(token, { username, password, displayName });
  } catch (e) {
    return { error: e.message };
  }

  // Log the new admin straight in.
  await createSession(admin);
  redirect("/admin/dashboard");
}
