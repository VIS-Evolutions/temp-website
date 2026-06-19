import "server-only";
import { getSupabaseAdmin } from "./supabase";
import { DONATION } from "./site";

// Reads the donation goal/raised from the DB, falling back to the defaults in
// lib/site.js if Supabase isn't configured or the row doesn't exist yet.
export async function getDonationSettings() {
  try {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from("donation_settings")
      .select("goal_amount,raised_amount")
      .eq("id", 1)
      .maybeSingle();
    if (!data) return { ...DONATION };
    return { goalAmount: data.goal_amount, raisedAmount: data.raised_amount };
  } catch {
    return { ...DONATION };
  }
}

export async function updateDonationSettings({ goalAmount, raisedAmount }) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("donation_settings")
    .upsert({ id: 1, goal_amount: goalAmount, raised_amount: raisedAmount, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
}
