import { s } from "@/lib/style";
import { DONATION, fmtGBP } from "@/lib/site";
import DonateForm from "@/components/DonateForm";

export const metadata = {
  title: "Donate · VIS Evolutions",
};

const fundCard = "background:#fff;border:1px solid #ECEAE4;border-radius:12px;padding:26px";

export default function DonatePage() {
  const goal = DONATION.goalAmount;
  const raised = DONATION.raisedAmount;
  const pct = Math.max(0, Math.min(100, Math.round((raised / goal) * 100)));

  return (
    <div style={s("animation:fadeIn .5s ease both")}>

      <section style={s("background:#fff;border-bottom:1px solid #ECEAE4")}>
        <div style={s("max-width:760px;margin:0 auto;padding:80px 24px 64px;text-align:center")}>
          <p style={s("font-family:'Chakra Petch',sans-serif;font-size:13px;letter-spacing:.3em;text-transform:uppercase;color:#8A1416;font-weight:600;margin:0")}>Donate</p>
          <h1 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:clamp(30px,5vw,48px);color:#1B1A16;margin:14px 0 16px;letter-spacing:-.01em")}>Fuel the next build.</h1>
          <p style={s("margin:0 auto 34px;font-size:18px;line-height:1.65;color:#6F6B64;max-width:52ch")}>Every pound goes straight into materials, manufacturing and getting our car to the start line.</p>
          {/* PROGRESS */}
          <div style={s("max-width:560px;margin:0 auto;text-align:left")}>
            <div style={s("display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px")}>
              <span style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:22px;color:#1B1A16")}>{fmtGBP(raised)} <span style={s("font-size:14px;color:#6F6B64;font-weight:500")}>raised</span></span>
              <span style={s("font-size:14px;color:#6F6B64;font-family:'Chakra Petch',sans-serif")}>Goal {fmtGBP(goal)}</span>
            </div>
            <div style={s("height:14px;background:#EBE8E2;border-radius:8px;overflow:hidden")}>
              <div style={{ ...s("height:100%;background:linear-gradient(90deg,#8A1416,#D3A00B);border-radius:8px;transition:width .8s cubic-bezier(.2,.8,.2,1)"), width: pct + "%" }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT FUNDS */}
      <section style={s("max-width:1080px;margin:0 auto;padding:72px 24px 30px")}>
        <div data-reveal style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px")}>
          <div style={s(fundCard)}>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;color:#8A1416;font-size:15px;letter-spacing:.06em")}>MATERIALS</div>
            <p style={s("margin:10px 0 0;font-size:14px;line-height:1.6;color:#6F6B64")}>Model blocks, wheels and CO₂ cartridges for every test run.</p>
          </div>
          <div style={s(fundCard)}>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;color:#D3A00B;font-size:15px;letter-spacing:.06em")}>MANUFACTURING</div>
            <p style={s("margin:10px 0 0;font-size:14px;line-height:1.6;color:#6F6B64")}>Machining time and tooling to cut our chassis with precision.</p>
          </div>
          <div style={s(fundCard)}>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;color:#1B1A16;font-size:15px;letter-spacing:.06em")}>PIT DISPLAY</div>
            <p style={s("margin:10px 0 0;font-size:14px;line-height:1.6;color:#6F6B64")}>A professional stand to present our project to the judges.</p>
          </div>
          <div style={s(fundCard)}>
            <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;color:#8A1416;font-size:15px;letter-spacing:.06em")}>COMPETITION</div>
            <p style={s("margin:10px 0 0;font-size:14px;line-height:1.6;color:#6F6B64")}>Entry fees and travel to reach the regional finals.</p>
          </div>
        </div>
      </section>

      {/* DONATE FORM */}
      <DonateForm />

    </div>
  );
}
