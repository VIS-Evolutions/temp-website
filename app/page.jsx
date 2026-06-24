import { s } from "@/lib/style";
import Btn from "@/components/Btn";

export default function HomePage() {
  return (
    <div style={s("animation:fadeIn .5s ease both")}>

      {/* HERO */}
      <section style={s("padding:96px 24px 84px;text-align:center")}>
        <div style={s("position:relative;max-width:880px;margin:0 auto")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="VIS Evolutions — F1 in Schools STEM Racing Team logo" style={s("width:min(340px,62vw);height:auto;display:block;margin:0 auto;animation:logoIn 1.05s cubic-bezier(.2,.8,.2,1) both")} />
          <div style={s("height:4px;background:#1B1A16;border-radius:3px;margin:18px auto 0;animation:drawLine 1s cubic-bezier(.2,.8,.2,1) .5s both")}></div>
          <p style={s("margin:30px auto 0;font-family:'Chakra Petch',sans-serif;font-size:13px;letter-spacing:.34em;text-transform:uppercase;color:#8A1416;font-weight:600;animation:fadeUp .8s ease .55s both")}>F1 in Schools · STEM Racing Team</p>
          <h1 style={s("margin:14px auto 0;font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:clamp(30px,5vw,52px);line-height:1.08;letter-spacing:-.01em;color:#1B1A16;max-width:14ch;animation:fadeUp .8s ease .7s both")}>Engineering the fastest model car on the track.</h1>
          <p style={s("margin:22px auto 0;font-size:18px;line-height:1.6;color:#6F6B64;max-width:54ch;animation:fadeUp .8s ease .82s both")}>Six student engineers. One mission. We design, manufacture and race a miniature F1 car — chasing milliseconds through relentless iteration.</p>
          <div style={s("display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:34px;animation:fadeUp .8s ease .94s both")}>
            <Btn href="/sponsorship" base="background:#8A1416;border:none;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:15px;letter-spacing:.04em;text-transform:uppercase;color:#fff;padding:15px 30px;border-radius:6px" hover="background:#6E0B0A">Become a sponsor</Btn>
            <Btn href="/donate" base="background:transparent;border:1.5px solid #1B1A16;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:15px;letter-spacing:.04em;text-transform:uppercase;color:#1B1A16;padding:15px 30px;border-radius:6px" hover="background:#1B1A16;color:#fff">Support the build</Btn>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section style={s("border-top:1px solid #ECEAE4;border-bottom:1px solid #ECEAE4;background:#fff")}>
        <div style={s("max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr)")}>
          <div data-reveal style={s("padding:34px clamp(10px,4vw,24px);text-align:center;border-right:1px solid #ECEAE4")}>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:clamp(26px,7vw,40px);color:#8A1416;line-height:1")}>06</div>
            <div style={s("margin-top:6px;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#6F6B64;font-family:'Chakra Petch',sans-serif")}>Student engineers</div>
          </div>
          <div data-reveal style={s("padding:34px clamp(10px,4vw,24px);text-align:center;border-right:1px solid #ECEAE4")}>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:clamp(26px,7vw,40px);color:#D3A00B;line-height:1")}>20m</div>
            <div style={s("margin-top:6px;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#6F6B64;font-family:'Chakra Petch',sans-serif")}>Sprint race track</div>
          </div>
          <div data-reveal style={s("padding:34px clamp(10px,4vw,24px);text-align:center")}>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:clamp(26px,7vw,40px);color:#1B1A16;line-height:1")}>&lt;1.0s</div>
            <div style={s("margin-top:6px;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#6F6B64;font-family:'Chakra Petch',sans-serif")}>Target run time</div>
          </div>
        </div>
      </section>

      {/* V / I / S PILLARS */}
      <section style={s("max-width:1180px;margin:0 auto;padding:100px 24px 90px")}>
        <div data-reveal style={s("text-align:center;max-width:640px;margin:0 auto 56px")}>
          <p style={s("font-family:'Chakra Petch',sans-serif;font-size:13px;letter-spacing:.3em;text-transform:uppercase;color:#8A1416;font-weight:600;margin:0")}>What V·I·S stands for</p>
          <h2 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:clamp(26px,4vw,40px);color:#1B1A16;margin:12px 0 0;letter-spacing:-.01em")}>Our journey, in three letters.</h2>
        </div>
        <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:24px")}>
          <div data-reveal style={s("position:relative;background:#fff;border:1px solid #ECEAE4;border-radius:12px;padding:34px 30px 36px;overflow:hidden")}>
            <div style={s("height:5px;width:64px;background:#8A1416;border-radius:3px")}></div>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:96px;line-height:.9;color:#8A1416;transform:skewX(-7deg);margin:14px 0 4px")}>V</div>
            <h3 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:24px;color:#1B1A16;margin:8px 0 10px;letter-spacing:.01em")}>Vision</h3>
            <p style={s("margin:0;font-size:16px;line-height:1.65;color:#6F6B64")}>Every fast car starts as an idea. We design with intent — balancing aerodynamics, weight and precision to imagine a car worth building.</p>
          </div>
          <div data-reveal style={s("position:relative;background:#fff;border:1px solid #ECEAE4;border-radius:12px;padding:34px 30px 36px;overflow:hidden")}>
            <div style={s("height:5px;width:64px;background:#D3A00B;border-radius:3px")}></div>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:96px;line-height:.9;color:#D3A00B;transform:skewX(-7deg);margin:14px 0 4px")}>I</div>
            <h3 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:24px;color:#1B1A16;margin:8px 0 10px;letter-spacing:.01em")}>Improvement</h3>
            <p style={s("margin:0;font-size:16px;line-height:1.65;color:#6F6B64")}>Speed is earned in the details. Each prototype is tested, measured and refined — turning milliseconds into momentum, run after run.</p>
          </div>
          <div data-reveal style={s("position:relative;background:#fff;border:1px solid #ECEAE4;border-radius:12px;padding:34px 30px 36px;overflow:hidden")}>
            <div style={s("height:5px;width:64px;background:#1B1A16;border-radius:3px")}></div>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:96px;line-height:.9;color:#1B1A16;transform:skewX(-7deg);margin:14px 0 4px")}>S</div>
            <h3 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:24px;color:#1B1A16;margin:8px 0 10px;letter-spacing:.01em")}>Success</h3>
            <p style={s("margin:0;font-size:16px;line-height:1.65;color:#6F6B64")}>From the workshop to the regionals and beyond. We measure success in race times — and in the engineers we become along the way.</p>
          </div>
        </div>
      </section>

      {/* BUILD TEASER */}
      <section style={s("background:#fff;border-top:1px solid #ECEAE4;border-bottom:1px solid #ECEAE4")}>
        <div style={s("max-width:1180px;margin:0 auto;padding:88px 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:48px;align-items:center")}>
          <div data-reveal>
            <p style={s("font-family:'Chakra Petch',sans-serif;font-size:13px;letter-spacing:.3em;text-transform:uppercase;color:#8A1416;font-weight:600;margin:0")}>The build</p>
            <h2 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:clamp(24px,3.4vw,36px);color:#1B1A16;margin:12px 0 16px;letter-spacing:-.01em")}>A car carved from CAD, wind tunnels and late nights.</h2>
            <p style={s("margin:0 0 16px;font-size:16px;line-height:1.7;color:#6F6B64")}>From the first sketch to the finished chassis, every component is engineered to shave grams and gain speed. We model in CAD, simulate airflow, then manufacture and test until the data tells us we&apos;re faster.</p>
            <Btn href="/about" base="background:transparent;border:1.5px solid #1B1A16;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#1B1A16;padding:13px 26px;border-radius:6px" hover="background:#1B1A16;color:#fff">Meet the team</Btn>
          </div>
          <div data-reveal style={s("aspect-ratio:4/3;background:repeating-linear-gradient(135deg,#F2F0EB,#F2F0EB 11px,#EBE8E2 11px,#EBE8E2 22px);border:1px solid #E7E4DD;border-radius:14px;display:flex;align-items:center;justify-content:center;color:#A29C92;font-family:'Space Mono',monospace;font-size:12px;letter-spacing:.16em;text-transform:uppercase;text-align:center;padding:20px")}>[ Car render / build photo ]</div>
        </div>
      </section>

      {/* HOME CTA BAND */}
      <section style={s("background:#1B1A16;color:#fff")}>
        <div data-reveal style={s("max-width:1100px;margin:0 auto;padding:76px 24px;text-align:center")}>
          <h2 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:clamp(26px,4vw,40px);margin:0 0 14px;letter-spacing:-.01em")}>Help put VIS Evolutions on the grid.</h2>
          <p style={s("margin:0 auto 30px;font-size:17px;line-height:1.6;color:#C9C5BD;max-width:52ch")}>Every contribution funds materials, manufacturing and the trips that turn a school project into a podium finish.</p>
          <div style={s("display:flex;gap:14px;justify-content:center;flex-wrap:wrap")}>
            <Btn href="/donate" base="background:#D3A00B;border:none;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:15px;letter-spacing:.04em;text-transform:uppercase;color:#1B1A16;padding:15px 32px;border-radius:6px" hover="background:#e6b115">Donate now</Btn>
            <Btn href="/sponsorship" base="background:transparent;border:1.5px solid #5a5852;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:15px;letter-spacing:.04em;text-transform:uppercase;color:#fff;padding:15px 32px;border-radius:6px" hover="border-color:#fff">Sponsorship packages</Btn>
          </div>
        </div>
      </section>

    </div>
  );
}
