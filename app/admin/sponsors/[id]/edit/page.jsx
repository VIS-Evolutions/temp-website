import { notFound } from "next/navigation";
import Link from "next/link";
import { s } from "@/lib/style";
import { requireAdmin } from "@/lib/auth";
import { getSponsorById } from "@/lib/sponsors";
import SponsorForm from "../../sponsor-form";
import { updateSponsorAction } from "../../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit sponsor · VIS Evolutions Admin", robots: { index: false, follow: false } };

export default async function EditSponsorPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  const sponsor = await getSponsorById(id);
  if (!sponsor) notFound();

  return (
    <div style={s("max-width:760px;margin:0 auto;padding:56px 24px 96px")}>
      <Link href="/admin/sponsors" style={s("font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#8A1416")}>‹ Sponsors</Link>
      <h1 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:30px;color:#1B1A16;margin:24px 0 28px;letter-spacing:-.01em")}>Edit sponsor</h1>
      <div style={s("background:#fff;border:1px solid #ECEAE4;border-radius:16px;padding:28px;box-shadow:0 14px 40px rgba(27,26,22,.06)")}>
        <SponsorForm action={updateSponsorAction} sponsor={sponsor} submitLabel="Save changes" />
      </div>
    </div>
  );
}
