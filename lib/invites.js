import "server-only";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { getSupabaseAdmin } from "./supabase";

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

// Creates an invite and returns the RAW token (only the hash is stored).
export async function createInvite({ createdBy, label, maxUses, expiresInDays }) {
  const supabase = getSupabaseAdmin();
  const token = crypto.randomBytes(32).toString("base64url");

  let expires_at = null;
  const days = Number(expiresInDays);
  if (days > 0) expires_at = new Date(Date.now() + days * 86400000).toISOString();

  const uses = Number(maxUses);
  const { error } = await supabase.from("admin_invites").insert({
    token_hash: hashToken(token),
    label: (label || "").trim() || null,
    created_by: createdBy || null,
    max_uses: uses > 0 ? uses : null,
    expires_at,
  });
  if (error) throw new Error(error.message);
  return token;
}

// Returns the invite row if the token is valid (exists, not expired, uses left).
export async function getValidInvite(token) {
  if (!token) return null;
  try {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from("admin_invites")
      .select("*")
      .eq("token_hash", hashToken(token))
      .maybeSingle();
    if (!data) return null;
    if (data.expires_at && new Date(data.expires_at) < new Date()) return null;
    if (data.max_uses != null && data.uses >= data.max_uses) return null;
    return data;
  } catch {
    return null;
  }
}

// Validates the token, creates the admin, and consumes one invite use.
// Returns the created admin row.
export async function registerAdminViaInvite(token, { username, password, displayName }) {
  const supabase = getSupabaseAdmin();
  const invite = await getValidInvite(token);
  if (!invite) throw new Error("This invite link is invalid, used up, or expired.");

  username = (username || "").trim();
  if (!username || !password) throw new Error("Choose a username and a password.");
  if (username.length < 3) throw new Error("Username must be at least 3 characters.");
  if (password.length < 8) throw new Error("Password must be at least 8 characters.");

  const { data: existing } = await supabase
    .from("admins")
    .select("id")
    .eq("username", username)
    .maybeSingle();
  if (existing) throw new Error("That username is already taken — pick another.");

  const password_hash = await bcrypt.hash(password, 12);
  const { data: created, error } = await supabase
    .from("admins")
    .insert({ username, password_hash, display_name: (displayName || "").trim() || username })
    .select()
    .single();
  if (error) throw new Error(error.message);

  await supabase.from("admin_invites").update({ uses: invite.uses + 1 }).eq("id", invite.id);
  return created;
}
