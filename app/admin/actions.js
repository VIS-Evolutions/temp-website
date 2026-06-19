"use server";

import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase";
import { verifyPassword, createSession, destroySession } from "@/lib/auth";

export async function login(prevState, formData) {
  const username = (formData.get("username") || "").toString().trim();
  const password = (formData.get("password") || "").toString();
  if (!username || !password) {
    return { error: "Enter your username and password." };
  }

  let admin;
  try {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from("admins")
      .select("*")
      .eq("username", username)
      .maybeSingle();
    admin = data;
  } catch {
    return { error: "Server not configured yet. Add the Supabase env vars." };
  }

  // Always run a compare to avoid leaking whether the username exists.
  const ok = admin
    ? await verifyPassword(password, admin.password_hash)
    : await verifyPassword(password, "$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinv");
  if (!admin || !ok) {
    return { error: "Invalid username or password." };
  }

  await createSession(admin);
  redirect("/admin/dashboard");
}

export async function logout() {
  await destroySession();
  redirect("/admin");
}
