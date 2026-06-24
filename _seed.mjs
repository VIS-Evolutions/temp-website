import { createClient } from "@supabase/supabase-js";
const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const rows = [
  { title: "First chassis off the CNC", slug: "_t_chassis", excerpt: "Our first full chassis came off the machine this week — 40g lighter than the prototype.", content: "x", published: true, author_name: "VIS Evolutions" },
  { title: "Wind tunnel testing begins", slug: "_t_windtunnel", excerpt: "We ran our nose-cone designs through CFD and the numbers look fast.", content: "x", published: true, author_name: "VIS Evolutions" },
  { title: "Regional finals confirmed", slug: "_t_regionals", excerpt: "It's official — we're heading to the regional finals next month.", content: "x", published: true, author_name: "VIS Evolutions" },
];
await sb.from("news_posts").delete().like("slug", "_t_%");
const { error } = await sb.from("news_posts").insert(rows);
console.log("seed:", error?.message || "ok");
