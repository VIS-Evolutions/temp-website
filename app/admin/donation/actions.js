"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { updateDonationSettings } from "@/lib/settings";

export async function updateDonationAction(prevState, formData) {
  await requireAdmin();

  const goalAmount = parseInt((formData.get("goal_amount") || "").toString().replace(/[^0-9]/g, ""), 10);
  const raisedAmount = parseInt((formData.get("raised_amount") || "").toString().replace(/[^0-9]/g, ""), 10);

  if (!Number.isFinite(goalAmount) || goalAmount <= 0) {
    return { error: "Enter a valid goal amount (a number above 0)." };
  }
  if (!Number.isFinite(raisedAmount) || raisedAmount < 0) {
    return { error: "Enter a valid raised amount (0 or more)." };
  }

  try {
    await updateDonationSettings({ goalAmount, raisedAmount });
  } catch (e) {
    return { error: e.message };
  }

  revalidatePath("/donate");
  return { success: true, goalAmount, raisedAmount };
}
