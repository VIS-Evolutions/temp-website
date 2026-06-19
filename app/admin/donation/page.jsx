import Link from "next/link";
import { s } from "@/lib/style";
import { requireAdmin } from "@/lib/auth";
import { getDonationSettings } from "@/lib/settings";
import DonationForm from "./donation-form";

export const dynamic = "force-dynamic";
export const metadata = { title: "Donation goal · VIS Evolutions Admin", robots: { index: false, follow: false } };

export default async function DonationSettingsPage() {
  await requireAdmin();
  const settings = await getDonationSettings();

  return (
    <div style={s("max-width:680px;margin:0 auto;padding:56px 24px 96px")}>
      <Link href="/admin/dashboard" style={s("font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#8A1416")}>‹ Dashboard</Link>
      <h1 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:30px;color:#1B1A16;margin:24px 0 8px;letter-spacing:-.01em")}>Donation goal</h1>
      <p style={s("margin:0 0 28px;font-size:16px;line-height:1.6;color:#6F6B64")}>Set the fundraising goal and the amount raised so far. This drives the progress bar on the public Donate page.</p>
      <div style={s("background:#fff;border:1px solid #ECEAE4;border-radius:16px;padding:30px;box-shadow:0 14px 40px rgba(27,26,22,.06)")}>
        <DonationForm settings={settings} />
      </div>
    </div>
  );
}
