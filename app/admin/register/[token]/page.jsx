import Link from "next/link";
import { s } from "@/lib/style";
import { getValidInvite } from "@/lib/invites";
import RegisterForm from "./register-form";

export const dynamic = "force-dynamic";
export const metadata = { title: "Register · VIS Evolutions Admin", robots: { index: false, follow: false } };

export default async function RegisterPage({ params }) {
  const { token } = await params;
  const invite = await getValidInvite(token);

  return (
    <div style={s("min-height:70vh;display:flex;align-items:center;justify-content:center;padding:60px 24px")}>
      <div style={s("width:100%;max-width:420px")}>
        <div style={s("text-align:center;margin-bottom:28px")}>
          <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:30px;letter-spacing:.02em")}>
            <span style={s("color:#8A1416")}>V</span>
            <span style={s("color:#D3A00B")}>I</span>
            <span style={s("color:#1B1A16")}>S</span>
            <span style={s("color:#1B1A16")}> Admin</span>
          </div>
        </div>

        <div style={s("background:#fff;border:1px solid #ECEAE4;border-radius:16px;padding:32px;box-shadow:0 14px 40px rgba(27,26,22,.06)")}>
          {invite ? (
            <>
              <h1 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:22px;color:#1B1A16;margin:0 0 6px")}>Create your admin account</h1>
              <p style={s("margin:0 0 22px;font-size:15px;color:#6F6B64")}>You&apos;ve been invited to manage VIS Evolutions news.</p>
              <RegisterForm token={token} />
            </>
          ) : (
            <div style={s("text-align:center")}>
              <h1 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:22px;color:#1B1A16;margin:0 0 10px")}>Invite not valid</h1>
              <p style={s("margin:0 0 20px;font-size:15px;line-height:1.6;color:#6F6B64")}>This invite link is invalid, has expired, or has already been used up. Ask your team for a fresh link.</p>
              <Link href="/admin" style={s("font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#8A1416")}>Go to sign in</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
