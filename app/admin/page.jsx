import { redirect } from "next/navigation";
import { s } from "@/lib/style";
import { getSession } from "@/lib/auth";
import LoginForm from "./login-form";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin · VIS Evolutions", robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) redirect("/admin/dashboard");

  return (
    <div style={s("min-height:70vh;display:flex;align-items:center;justify-content:center;padding:60px 24px")}>
      <div style={s("width:100%;max-width:400px")}>
        <div style={s("text-align:center;margin-bottom:28px")}>
          <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:30px;letter-spacing:.02em")}>
            <span style={s("color:#8A1416")}>V</span>
            <span style={s("color:#D3A00B")}>I</span>
            <span style={s("color:#1B1A16")}>S</span>
            <span style={s("color:#1B1A16")}> Admin</span>
          </div>
          <p style={s("margin:8px 0 0;font-size:14px;color:#6F6B64")}>Sign in to manage news posts.</p>
        </div>
        <div style={s("background:#fff;border:1px solid #ECEAE4;border-radius:16px;padding:32px;box-shadow:0 14px 40px rgba(27,26,22,.06)")}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
