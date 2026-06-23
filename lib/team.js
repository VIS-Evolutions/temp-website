import "server-only";
import { getSupabaseAdmin } from "./supabase";
import { cleanMediaUrl } from "./mediaUrl";

export async function getTeamMembers() {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

export async function getTeamMemberById(id) {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("team_members").select("*").eq("id", id).maybeSingle();
  return data || null;
}

function parse(formData) {
  const name = (formData.get("name") || "").toString().trim();
  const role = (formData.get("role") || "").toString().trim();
  const sort_order = parseInt((formData.get("sort_order") || "0").toString(), 10) || 0;
  if (!name || !role) throw new Error("Name and role are required.");
  const photo_url = cleanMediaUrl(formData.get("photo_url"));
  return { name, role, sort_order, photo_url };
}

export async function createTeamMember(formData) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("team_members").insert(parse(formData));
  if (error) throw new Error(error.message);
}

export async function updateTeamMember(id, formData) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("team_members").update(parse(formData)).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteTeamMember(id) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("team_members").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
