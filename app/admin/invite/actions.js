"use server";

import { headers } from "next/headers";
import { requireAdmin } from "@/lib/auth";
import { createInvite } from "@/lib/invites";

export async function generateInvite(prevState, formData) {
  const session = await requireAdmin();

  let token;
  try {
    token = await createInvite({
      createdBy: session.sub,
      label: (formData.get("label") || "").toString(),
      maxUses: (formData.get("max_uses") || "").toString(),
      expiresInDays: (formData.get("expires") || "").toString(),
    });
  } catch (e) {
    return { error: e.message };
  }

  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") || (host?.includes("localhost") ? "http" : "https");
  return { url: `${proto}://${host}/admin/register/${token}` };
}
