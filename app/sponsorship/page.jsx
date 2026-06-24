import { s } from "@/lib/style";
import Btn from "@/components/Btn";
import { getSponsors } from "@/lib/sponsors";
import { SITE } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sponsor VIS Evolutions | F1 in Schools STEM Racing",
  description:
    "Partner with VIS Evolutions, a student F1 in Schools STEM racing team. Put your brand on our car, our race suits and our channels — and back the next generation of engineers.",
  alternates: { canonical: "/sponsorship" },
  openGraph: {
    title: "Sponsor VIS Evolutions | F1 in Schools STEM Racing",
    description: "Partner with VIS Evolutions and put your brand on our F1 in Schools car.",
    url: "/sponsorship",
    images: [SITE.ogImage],
  },
};

const li = "font-size:14px;color:#4a4843;line-height:1.5;display:flex;gap:9px";
const liDark = "font-size:14px;color:#C9C5BD;line-height:1.5;display:flex;gap:9px";

function SponsorLogo({ sponsor }) {
  const inner = (
    <>
      <div style={s("height:64px;display:flex;align-items:center;justify-content:center")}>
        {sponsor.logo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={sponsor.logo_url} alt={sponsor.name} style={s("max-width:100%;max-height:64px;object-fit:contain;display:block")} />
        ) : (
          <span style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:20px;color:#1B1A16;text-align:center")}>{sponsor.name}</span>
        )}
      </div>
      <div style={s("margin-top:14px;font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:#6F6B64;text-align:center")}>{sponsor.name}</div>
    </>
  );
  const card = "width:230px;max-width:100%;background:#fff;border:1px solid #ECEAE4;border-radius:14px;padding:28px 24px;display:flex;flex-direction:column;align-items:center;justify-content:center";
  return sponsor.website ? (
    <a href={sponsor.website} target="_blank" rel="noopener noreferrer" data-reveal style={s(card)}>{inner}</a>
  ) : (
    <div data-reveal style={s(card)}>{inner}</div>
  );
}

export default async function SponsorshipPage() {
  const sponsors = await getSponsors();

  return (
    <div style={s("animation:fadeIn .5s ease both")}>

      <section style={s("background:#1B1A16;color:#fff;position:relative;overflow:hidden")}>
        <div style={s("position:absolute;top:-40px;right:-60px;width:420px;height:150px;background:linear-gradient(90deg,transparent,#D3A00B);opacity:.18;transform:skewX(-26deg)")}></div>
        <div style={s("max-width:900px;margin:0 auto;padding:88px 24px 78px;text-align:center;position:relative")}>
          <p style={s("font-family:'Chakra Petch',sans-serif;font-size:13px;letter-spacing:.3em;text-transform:uppercase;color:#D3A00B;font-weight:600;margin:0")}>Sponsorship</p>
          <h1 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:clamp(30px,5vw,50px);margin:14px 0 18px;letter-spacing:-.01em")}>Put your brand on the grid.</h1>
          <p style={s("margin:0 auto;font-size:18px;line-height:1.65;color:#C9C5BD;max-width:56ch")}>Partner with a team of ambitious young engineers and put your name on a car that&apos;s seen by schools, families and the wider STEM community.</p>
        </div>
      </section>

      {/* WHY SPONSOR */}
      <section style={s("max-width:1180px;margin:0 auto;padding:88px 24px 40px")}>
        <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:24px")}>
          <div data-reveal style={s("background:#fff;border:1px solid #ECEAE4;border-radius:12px;padding:32px")}>
            <div style={s("height:5px;width:54px;background:#8A1416;border-radius:3px;margin-bottom:18px")}></div>
            <h3 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:20px;color:#1B1A16;margin:0 0 10px")}>Brand visibility</h3>
            <p style={s("margin:0;font-size:15px;line-height:1.65;color:#6F6B64")}>Your logo travels with us — on the car, our race suits, the pit display and every channel we share.</p>
          </div>
          <div data-reveal style={s("background:#fff;border:1px solid #ECEAE4;border-radius:12px;padding:32px")}>
            <div style={s("height:5px;width:54px;background:#D3A00B;border-radius:3px;margin-bottom:18px")}></div>
            <h3 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:20px;color:#1B1A16;margin:0 0 10px")}>STEM impact</h3>
            <p style={s("margin:0;font-size:15px;line-height:1.65;color:#6F6B64")}>Back the next generation of engineers and align your brand with education, innovation and ambition.</p>
          </div>
          <div data-reveal style={s("background:#fff;border:1px solid #ECEAE4;border-radius:12px;padding:32px")}>
            <div style={s("height:5px;width:54px;background:#1B1A16;border-radius:3px;margin-bottom:18px")}></div>
            <h3 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:20px;color:#1B1A16;margin:0 0 10px")}>Community reach</h3>
            <p style={s("margin:0;font-size:15px;line-height:1.65;color:#6F6B64")}>We share our journey with a growing audience of students, parents and local supporters who rally behind us.</p>
          </div>
        </div>
      </section>

      {/* CURRENT SPONSORS */}
      {sponsors.length > 0 && (
        <section style={s("max-width:1180px;margin:0 auto;padding:50px 24px 10px")}>
          <p data-reveal style={s("font-family:'Chakra Petch',sans-serif;font-size:13px;letter-spacing:.3em;text-transform:uppercase;color:#8A1416;font-weight:600;margin:0 0 28px;text-align:center")}>Proudly backed by</p>
          <div style={s("display:flex;flex-wrap:wrap;justify-content:center;gap:20px")}>
            {sponsors.map((sp) => (
              <SponsorLogo key={sp.id} sponsor={sp} />
            ))}
          </div>
        </section>
      )}

      {/* TIERS */}
      <section style={s("max-width:1180px;margin:0 auto;padding:50px 24px 30px")}>
        <div data-reveal style={s("text-align:center;margin:0 auto 44px;max-width:560px")}>
          <h2 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:clamp(24px,3.4vw,36px);color:#1B1A16;margin:0;letter-spacing:-.01em")}>Partnership packages</h2>
          <p style={s("margin:12px 0 0;font-size:16px;color:#6F6B64;line-height:1.6")}>Flexible tiers — or we&apos;ll happily build something bespoke for your brand.</p>
        </div>
        <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:20px;align-items:stretch")}>
          {/* Bronze */}
          <div data-reveal style={s("background:#fff;border:1px solid #ECEAE4;border-radius:14px;padding:30px 26px;display:flex;flex-direction:column")}>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;letter-spacing:.1em;text-transform:uppercase;font-size:14px;color:#6F6B64")}>Bronze</div>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:36px;color:#1B1A16;margin:10px 0 2px")}>£50<span style={s("font-size:15px;color:#A29C92;font-weight:500")}>+</span></div>
            <div style={s("border-top:1px solid #ECEAE4;margin:18px 0")}></div>
            <ul style={s("list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:11px;flex:1")}>
              <li style={s(li)}><span style={s("color:#8A1416;font-weight:700")}>›</span>Logo on our website</li>
              <li style={s(li)}><span style={s("color:#8A1416;font-weight:700")}>›</span>Social media shout-out</li>
              <li style={s(li)}><span style={s("color:#8A1416;font-weight:700")}>›</span>Thank-you in our team report</li>
            </ul>
          </div>
          {/* Silver */}
          <div data-reveal style={s("background:#fff;border:1px solid #ECEAE4;border-radius:14px;padding:30px 26px;display:flex;flex-direction:column")}>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;letter-spacing:.1em;text-transform:uppercase;font-size:14px;color:#A29C92")}>Silver</div>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:36px;color:#1B1A16;margin:10px 0 2px")}>£150<span style={s("font-size:15px;color:#A29C92;font-weight:500")}>+</span></div>
            <div style={s("border-top:1px solid #ECEAE4;margin:18px 0")}></div>
            <ul style={s("list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:11px;flex:1")}>
              <li style={s(li)}><span style={s("color:#8A1416;font-weight:700")}>›</span>Everything in Bronze</li>
              <li style={s(li)}><span style={s("color:#8A1416;font-weight:700")}>›</span>Small logo on the car</li>
              <li style={s(li)}><span style={s("color:#8A1416;font-weight:700")}>›</span>Logo on pit display</li>
            </ul>
          </div>
          {/* Gold */}
          <div data-reveal style={s("background:#fff;border:2px solid #D3A00B;border-radius:14px;padding:30px 26px;display:flex;flex-direction:column;position:relative;box-shadow:0 12px 30px rgba(211,160,11,.14)")}>
            <div style={s("position:absolute;top:-12px;left:26px;background:#D3A00B;color:#1B1A16;font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:11px;letter-spacing:.12em;text-transform:uppercase;padding:5px 12px;border-radius:20px")}>Most popular</div>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;letter-spacing:.1em;text-transform:uppercase;font-size:14px;color:#D3A00B")}>Gold</div>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:36px;color:#1B1A16;margin:10px 0 2px")}>£400<span style={s("font-size:15px;color:#A29C92;font-weight:500")}>+</span></div>
            <div style={s("border-top:1px solid #ECEAE4;margin:18px 0")}></div>
            <ul style={s("list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:11px;flex:1")}>
              <li style={s(li)}><span style={s("color:#D3A00B;font-weight:700")}>›</span>Everything in Silver</li>
              <li style={s(li)}><span style={s("color:#D3A00B;font-weight:700")}>›</span>Prominent logo on the car</li>
              <li style={s(li)}><span style={s("color:#D3A00B;font-weight:700")}>›</span>Logo on race suits</li>
              <li style={s(li)}><span style={s("color:#D3A00B;font-weight:700")}>›</span>Feature in our newsletter</li>
            </ul>
          </div>
          {/* Title partner */}
          <div data-reveal style={s("background:#1B1A16;border:1px solid #1B1A16;border-radius:14px;padding:30px 26px;display:flex;flex-direction:column;color:#fff")}>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;letter-spacing:.1em;text-transform:uppercase;font-size:14px;color:#D3A00B")}>Title partner</div>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:30px;margin:10px 0 2px")}>Let&apos;s talk</div>
            <div style={s("border-top:1px solid #39362f;margin:18px 0")}></div>
            <ul style={s("list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:11px;flex:1")}>
              <li style={s(liDark)}><span style={s("color:#D3A00B;font-weight:700")}>›</span>Headline logo placement</li>
              <li style={s(liDark)}><span style={s("color:#D3A00B;font-weight:700")}>›</span>Naming rights on the car</li>
              <li style={s(liDark)}><span style={s("color:#D3A00B;font-weight:700")}>›</span>Bespoke partnership benefits</li>
            </ul>
          </div>
        </div>
      </section>

      {/* LOGO ON CAR */}
      <section style={s("max-width:1180px;margin:0 auto;padding:60px 24px")}>
        <div data-reveal style={s("background:#fff;border:1px solid #ECEAE4;border-radius:16px;overflow:hidden;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))")}>
          <div style={s("width:100%;aspect-ratio:16/10;min-height:240px;background:repeating-linear-gradient(135deg,#F2F0EB,#F2F0EB 11px,#EBE8E2 11px,#EBE8E2 22px);display:flex;align-items:center;justify-content:center;color:#A29C92;font-family:'Space Mono',monospace;font-size:12px;letter-spacing:.16em;text-transform:uppercase;text-align:center;padding:20px")}>[ Car livery — your logo here ]</div>
          <div style={s("padding:48px 40px;display:flex;flex-direction:column;justify-content:center")}>
            <h2 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:28px;color:#1B1A16;margin:0 0 14px;letter-spacing:-.01em")}>See your logo cross the line.</h2>
            <p style={s("margin:0 0 24px;font-size:16px;line-height:1.7;color:#6F6B64")}>Sponsor placements appear on the car body, our display stand and team kit — photographed and shared at every event we attend.</p>
            <Btn href="/donate" base="align-self:flex-start;background:#8A1416;border:none;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:15px;letter-spacing:.04em;text-transform:uppercase;color:#fff;padding:14px 28px;border-radius:6px" hover="background:#6E0B0A">Get in touch</Btn>
          </div>
        </div>
      </section>

    </div>
  );
}
