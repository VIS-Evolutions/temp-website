import "server-only";
import { getSupabaseAdmin } from "./supabase";
import { cleanMediaUrl } from "./mediaUrl";

export async function getSponsors() {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("sponsors")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

export async function getSponsorById(id) {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("sponsors").select("*").eq("id", id).maybeSingle();
  return data || null;
}

function parse(formData) {
  const name = (formData.get("name") || "").toString().trim();
  let website = (formData.get("website") || "").toString().trim();
  const sort_order = parseInt((formData.get("sort_order") || "0").toString(), 10) || 0;
  if (!name) throw new Error("Sponsor name is required.");
  if (website && !/^https?:\/\//i.test(website)) website = "https://" + website;
  const logo_url = cleanMediaUrl(formData.get("logo_url"));
  return { name, website: website || null, sort_order, logo_url };
}

export async function createSponsor(formData) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("sponsors").insert(parse(formData));
  if (error) throw new Error(error.message);
}

export async function updateSponsor(id, formData) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("sponsors").update(parse(formData)).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteSponsor(id) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("sponsors").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
