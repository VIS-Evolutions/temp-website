import { s } from "@/lib/style";
import { getTeamMembers } from "@/lib/team";
import { SITE } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About VIS Evolutions | F1 in Schools STEM Racing Team",
  description:
    "Meet VIS Evolutions (Vision · Improvement · Success) — a six-student F1 in Schools STEM racing team designing, building and racing a miniature Formula 1 car.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About VIS Evolutions | F1 in Schools STEM Racing Team",
    description: "Meet VIS Evolutions — a student F1 in Schools STEM racing team building a miniature Formula 1 car.",
    url: "/about",
    images: [SITE.ogImage],
  },
};

const photoBox = "width:100%;height:100%;aspect-ratio:1/1;background:repeating-linear-gradient(135deg,#F2F0EB,#F2F0EB 11px,#EBE8E2 11px,#EBE8E2 22px);display:flex;align-items:center;justify-content:center;color:#A29C92;font-family:'Space Mono',monospace;font-size:11px;letter-spacing:.14em";

export default async function AboutPage() {
  const team = await getTeamMembers();

  return (
    <div style={s("animation:fadeIn .5s ease both")}>

      {/* PAGE HERO */}
      <section style={s("background:#fff;border-bottom:1px solid #ECEAE4")}>
        <div style={s("max-width:900px;margin:0 auto;padding:84px 24px 70px;text-align:center")}>
          <p style={s("font-family:'Chakra Petch',sans-serif;font-size:13px;letter-spacing:.3em;text-transform:uppercase;color:#8A1416;font-weight:600;margin:0")}>About us</p>
          <h1 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:clamp(30px,5vw,50px);color:#1B1A16;margin:14px 0 18px;letter-spacing:-.01em")}>Six engineers, one relentless pursuit of speed.</h1>
          <p style={s("margin:0 auto;font-size:18px;line-height:1.65;color:#6F6B64;max-width:58ch")}>VIS Evolutions is a student STEM racing team competing in the F1 in Schools challenge — designing, building and racing a miniature Formula 1 car against teams from across the country.</p>
        </div>
      </section>

      {/* MISSION */}
      <section style={s("max-width:1000px;margin:0 auto;padding:88px 24px 30px")}>
        <div data-reveal style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:48px;align-items:start")}>
          <div>
            <p style={s("font-family:'Chakra Petch',sans-serif;font-size:13px;letter-spacing:.3em;text-transform:uppercase;color:#8A1416;font-weight:600;margin:0 0 8px")}>Our mission</p>
            <h2 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:30px;color:#1B1A16;margin:0;letter-spacing:-.01em")}>Faster every iteration.</h2>
          </div>
          <div>
            <p style={s("margin:0 0 16px;font-size:17px;line-height:1.7;color:#4a4843")}>We exist to prove that careful engineering beats guesswork. Every decision — from the curve of the nose cone to the grade of the wheels — is backed by testing and data, not opinion.</p>
            <p style={s("margin:0;font-size:17px;line-height:1.7;color:#4a4843")}>Along the way we&apos;re building more than a car. We&apos;re learning CAD, aerodynamics, manufacturing, project management and how to pitch to the people who believe in us.</p>
          </div>
        </div>
      </section>

      {/* WHAT IS F1 IN SCHOOLS */}
      <section style={s("max-width:1180px;margin:0 auto;padding:60px 24px 30px")}>
        <div data-reveal style={s("text-align:center;max-width:620px;margin:0 auto 44px")}>
          <h2 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:clamp(24px,3.4vw,34px);color:#1B1A16;margin:0;letter-spacing:-.01em")}>What is F1 in Schools?</h2>
          <p style={s("margin:14px 0 0;font-size:16px;line-height:1.65;color:#6F6B64")}>The world&apos;s largest STEM competition — where teams run like a real F1 outfit, from the drawing board to the start line.</p>
        </div>
        <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:20px")}>
          <div data-reveal style={s("background:#fff;border:1px solid #ECEAE4;border-radius:12px;padding:30px")}>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:15px;color:#8A1416;letter-spacing:.1em")}>01 / DESIGN</div>
            <p style={s("margin:14px 0 0;font-size:15px;line-height:1.65;color:#4a4843")}>Engineer a CO₂-powered car in CAD, then simulate its aerodynamics to cut drag before a single part is cut.</p>
          </div>
          <div data-reveal style={s("background:#fff;border:1px solid #ECEAE4;border-radius:12px;padding:30px")}>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:15px;color:#D3A00B;letter-spacing:.1em")}>02 / MANUFACTURE</div>
            <p style={s("margin:14px 0 0;font-size:15px;line-height:1.65;color:#4a4843")}>Machine the chassis, assemble the components and refine the finish — chasing the lightest, fastest build possible.</p>
          </div>
          <div data-reveal style={s("background:#fff;border:1px solid #ECEAE4;border-radius:12px;padding:30px")}>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:15px;color:#1B1A16;letter-spacing:.1em")}>03 / RACE</div>
            <p style={s("margin:14px 0 0;font-size:15px;line-height:1.65;color:#4a4843")}>Sprint down a 20-metre track in under a second, while judges score our engineering, enterprise and team presentation.</p>
          </div>
        </div>
      </section>

      {/* THE TEAM */}
      <section style={s("background:#fff;border-top:1px solid #ECEAE4;border-bottom:1px solid #ECEAE4;margin-top:60px")}>
        <div style={s("max-width:1180px;margin:0 auto;padding:84px 24px")}>
          <div data-reveal style={s("text-align:center;margin:0 auto 48px;max-width:560px")}>
            <p style={s("font-family:'Chakra Petch',sans-serif;font-size:13px;letter-spacing:.3em;text-transform:uppercase;color:#8A1416;font-weight:600;margin:0")}>The team</p>
            <h2 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:clamp(24px,3.4vw,36px);color:#1B1A16;margin:12px 0 0;letter-spacing:-.01em")}>Meet the team.</h2>
          </div>
          <div style={s("display:flex;flex-wrap:wrap;justify-content:center;gap:24px")}>
            {team.map((m) => (
              <div key={m.id || m.name} data-reveal style={s("width:260px;max-width:100%;border:1px solid #ECEAE4;border-radius:12px;overflow:hidden;background:#FAFAF8")}>
                <div style={s("aspect-ratio:1/1;overflow:hidden")}>
                  {m.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.photo_url} alt={m.name} style={s("width:100%;height:100%;object-fit:cover;display:block")} />
                  ) : (
                    <div style={s(photoBox)}>[ PHOTO ]</div>
                  )}
                </div>
                <div style={s("padding:20px 22px")}>
                  <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:19px;color:#1B1A16")}>{m.name}</div>
                  <div style={s("font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8A1416;font-family:'Chakra Petch',sans-serif;margin-top:4px")}>{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY TIMELINE */}
      <section style={s("max-width:820px;margin:0 auto;padding:88px 24px 96px")}>
        <div data-reveal style={s("text-align:center;margin:0 auto 48px")}>
          <h2 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:clamp(24px,3.4vw,34px);color:#1B1A16;margin:0;letter-spacing:-.01em")}>The road so far.</h2>
        </div>
        <div style={s("display:flex;flex-direction:column;gap:0")}>
          <div data-reveal style={s("display:grid;grid-template-columns:84px 1fr;gap:22px;padding-bottom:30px;border-left:2px solid #ECEAE4;margin-left:8px;padding-left:26px;position:relative")}>
            <div style={s("position:absolute;left:-9px;top:2px;width:16px;height:16px;border-radius:50%;background:#8A1416")}></div>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;color:#8A1416;font-size:15px")}>PHASE 01</div>
            <div>
              <h3 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:19px;color:#1B1A16;margin:0 0 6px")}>Team formed &amp; roles assigned</h3>
              <p style={s("margin:0;font-size:15px;line-height:1.65;color:#6F6B64")}>Six members, six specialisms — from design to finance — set up like a real racing outfit.</p>
            </div>
          </div>
          <div data-reveal style={s("display:grid;grid-template-columns:84px 1fr;gap:22px;padding-bottom:30px;border-left:2px solid #ECEAE4;margin-left:8px;padding-left:26px;position:relative")}>
            <div style={s("position:absolute;left:-9px;top:2px;width:16px;height:16px;border-radius:50%;background:#D3A00B")}></div>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;color:#D3A00B;font-size:15px")}>PHASE 02</div>
            <div>
              <h3 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:19px;color:#1B1A16;margin:0 0 6px")}>First car designed in CAD</h3>
              <p style={s("margin:0;font-size:15px;line-height:1.65;color:#6F6B64")}>Concept locked, aerodynamics simulated, and the first prototype taking shape on screen.</p>
            </div>
          </div>
          <div data-reveal style={s("display:grid;grid-template-columns:84px 1fr;gap:22px;padding-bottom:30px;border-left:2px solid #ECEAE4;margin-left:8px;padding-left:26px;position:relative")}>
            <div style={s("position:absolute;left:-9px;top:2px;width:16px;height:16px;border-radius:50%;background:#1B1A16")}></div>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;color:#1B1A16;font-size:15px")}>PHASE 03</div>
            <div>
              <h3 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:19px;color:#1B1A16;margin:0 0 6px")}>Manufacturing &amp; testing</h3>
              <p style={s("margin:0;font-size:15px;line-height:1.65;color:#6F6B64")}>Cutting, assembling and timing runs — refining the build until the data says we&apos;re faster.</p>
            </div>
          </div>
          <div data-reveal style={s("display:grid;grid-template-columns:84px 1fr;gap:22px;margin-left:8px;padding-left:26px;position:relative")}>
            <div style={s("position:absolute;left:-9px;top:2px;width:16px;height:16px;border-radius:50%;background:#fff;border:3px solid #8A1416;animation:pulseGlow 2s ease infinite")}></div>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;color:#8A1416;font-size:15px")}>NEXT</div>
            <div>
              <h3 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:19px;color:#1B1A16;margin:0 0 6px")}>Regional finals</h3>
              <p style={s("margin:0;font-size:15px;line-height:1.65;color:#6F6B64")}>Taking our car to the start line — and we&apos;d love your support getting there.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
