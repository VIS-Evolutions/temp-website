import Link from "next/link";
import { s } from "@/lib/style";
import { requireAdmin } from "@/lib/auth";
import { getTeamMembers } from "@/lib/team";
import TeamForm from "./team-form";
import { createTeamAction, deleteTeamAction } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Team · VIS Evolutions Admin", robots: { index: false, follow: false } };

export default async function TeamAdminPage() {
  await requireAdmin();
  let members = [];
  try {
    members = await getTeamMembers();
  } catch {
    members = [];
  }

  return (
    <div style={s("max-width:760px;margin:0 auto;padding:56px 24px 96px")}>
      <Link href="/admin/dashboard" style={s("font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#8A1416")}>‹ Dashboard</Link>
      <h1 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:30px;color:#1B1A16;margin:24px 0 8px;letter-spacing:-.01em")}>Team members</h1>
      <p style={s("margin:0 0 28px;font-size:16px;line-height:1.6;color:#6F6B64")}>Add the people that appear in the team grid on the About page.</p>

      <div style={s("background:#fff;border:1px solid #ECEAE4;border-radius:16px;padding:28px;box-shadow:0 14px 40px rgba(27,26,22,.06);margin-bottom:32px")}>
        <h2 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:18px;color:#1B1A16;margin:0 0 20px")}>Add a team member</h2>
        <TeamForm action={createTeamAction} submitLabel="Add member" />
      </div>

      {members.length > 0 && (
        <div style={s("display:flex;flex-direction:column;gap:12px")}>
          {members.map((m) => (
            <div key={m.id} style={s("display:flex;align-items:center;gap:16px;background:#fff;border:1px solid #ECEAE4;border-radius:14px;padding:14px 18px")}>
              <div style={s("width:52px;height:52px;flex-shrink:0;border-radius:10px;overflow:hidden;background:#F2F0EB;display:flex;align-items:center;justify-content:center")}>
                {m.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.photo_url} alt="" style={s("width:100%;height:100%;object-fit:cover")} />
                ) : (
                  <span style={s("font-size:11px;color:#A29C92;font-family:'Space Mono',monospace")}>—</span>
                )}
              </div>
              <div style={s("flex:1;min-width:0")}>
                <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:16px;color:#1B1A16")}>{m.name}</div>
                <div style={s("font-size:13px;color:#8A1416;font-family:'Chakra Petch',sans-serif;text-transform:uppercase;letter-spacing:.06em")}>{m.role}</div>
              </div>
              <Link href={`/admin/team/${m.id}/edit`} style={s("font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:13px;letter-spacing:.04em;text-transform:uppercase;color:#8A1416;padding:8px 10px")}>Edit</Link>
              <form action={deleteTeamAction}>
                <input type="hidden" name="id" value={m.id} />
                <button type="submit" style={s("background:none;border:none;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:13px;letter-spacing:.04em;text-transform:uppercase;color:#A29C92;padding:8px 10px")}>Delete</button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
