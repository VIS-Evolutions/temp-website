// Create (or update) an admin owner. The password is bcrypt-hashed before it
// ever leaves this script — only the hash is stored.
//
// Usage:
//   node --env-file=.env.local scripts/create-admin.mjs <username> <password> "Display Name"
//
// Re-running with an existing username updates that admin's password.

import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

const [, , username, password, ...nameParts] = process.argv;

if (!username || !password) {
  console.error(
    'Usage: node --env-file=.env.local scripts/create-admin.mjs <username> <password> "Display Name"'
  );
  process.exit(1);
}

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (is .env.local filled in?)");
  process.exit(1);
}

const displayName = nameParts.join(" ").trim() || username;
const password_hash = await bcrypt.hash(password, 12);

const supabase = createClient(url, key, { auth: { persistSession: false } });
const { error } = await supabase
  .from("admins")
  .upsert({ username, password_hash, display_name: displayName }, { onConflict: "username" });

if (error) {
  console.error("Failed:", error.message);
  process.exit(1);
}

console.log(`✓ Admin "${username}" (${displayName}) saved.`);
