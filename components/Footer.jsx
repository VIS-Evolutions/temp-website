import { s } from "@/lib/style";
import Btn from "./Btn";

const footerLink =
  "background:none;border:none;cursor:pointer;color:#C9C5BD;font-family:'Public Sans',sans-serif;font-size:15px;padding:0";

export default function Footer() {
  return (
    <footer style={s("background:#1B1A16;color:#C9C5BD")}>
      <div style={s("max-width:1180px;margin:0 auto;padding:64px 24px 30px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:40px")}>
        <div>
          <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:34px;line-height:1;letter-spacing:.02em")}>
            <span style={s("color:#8A1416")}>V</span>
            <span style={s("color:#D3A00B")}>I</span>
            <span style={s("color:#fff")}>S</span>
          </div>
          <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:13px;letter-spacing:.34em;color:#8d8880;margin-top:6px")}>EVOLUTIONS</div>
          <p style={s("margin:18px 0 0;font-size:14px;line-height:1.6;color:#8d8880;max-width:34ch")}>A six-strong student STEM racing team building the fastest model F1 car we can.</p>
        </div>
        <div>
          <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:#fff;margin-bottom:16px")}>Explore</div>
          <div style={s("display:flex;flex-direction:column;gap:11px;align-items:flex-start")}>
            <Btn href="/" base={footerLink} hover="color:#fff">Home</Btn>
            <Btn href="/about" base={footerLink} hover="color:#fff">About Us</Btn>
            <Btn href="/sponsorship" base={footerLink} hover="color:#fff">Sponsorship</Btn>
            <Btn href="/news" base={footerLink} hover="color:#fff">News</Btn>
            <Btn href="/donate" base={footerLink} hover="color:#fff">Donate</Btn>
          </div>
        </div>
        <div>
          <div style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:#fff;margin-bottom:16px")}>Get in touch</div>
          <div style={s("display:flex;flex-direction:column;gap:11px")}>
            <Btn href="mailto:hello@visevolutions.co.uk" base="color:#C9C5BD;font-family:'Public Sans',sans-serif;font-size:15px;text-decoration:none" hover="color:#fff">hello@visevolutions.co.uk</Btn>
            <span style={s("color:#8d8880;font-family:'Public Sans',sans-serif;font-size:15px")}>visevolutions.co.uk</span>
            <span style={s("color:#8d8880;font-family:'Public Sans',sans-serif;font-size:15px")}>@visevolutions</span>
          </div>
        </div>
      </div>
      <div style={s("border-top:1px solid #2d2a25;max-width:1180px;margin:0 auto;padding:22px 24px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px")}>
        <span style={s("font-size:13px;color:#6f6b63")}>© 2026 VIS Evolutions · F1 in Schools STEM Racing Team</span>
        <span style={s("font-size:13px;color:#6f6b63;font-family:'Space Mono',monospace")}>
          Designed &amp; built by Internet Studio ·{" "}
          <Btn
            href="https://internetstudio.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            base="color:#D3A00B;font-family:'Space Mono',monospace;font-size:13px;text-decoration:underline;text-underline-offset:3px"
            hover="color:#e6b115"
          >
            internetstudio.co.uk
          </Btn>
        </span>
      </div>
    </footer>
  );
}
