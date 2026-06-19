import "server-only";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "vis_admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secretKey() {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET is not set in .env.local");
  return new TextEncoder().encode(s);
}

export function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

export async function createSession(admin) {
  const token = await new SignJWT({
    username: admin.username,
    name: admin.display_name || admin.username,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(admin.id)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey());

  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

// Returns the session payload ({ sub, username, name }) or null.
export async function getSession() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload;
  } catch {
    return null;
  }
}

// Use inside protected server components / actions. Redirects to /admin if not
// signed in, otherwise returns the session.
export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin");
  return session;
}
