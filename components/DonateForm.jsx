"use client";

import { useState } from "react";
import { s } from "@/lib/style";
import { fmtGBP } from "@/lib/site";
import Btn from "./Btn";
import Field from "./Field";

const TIERS = [
  { label: "£10", value: 10 },
  { label: "£25", value: 25 },
  { label: "£50", value: 50 },
  { label: "£100", value: 100 },
];

const tierBtn =
  "position:relative;background:#FAFAF8;border:1.5px solid #ECEAE4;border-radius:10px;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:20px;color:#1B1A16;padding:18px 0";

export default function DonateForm() {
  const [donateAmount, setDonateAmount] = useState(25);
  const [customSelected, setCustomSelected] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donated, setDonated] = useState(false);
  const [donateError, setDonateError] = useState("");

  const total = customSelected ? Number(customAmount) || 0 : donateAmount;
  const donateTotal = fmtGBP(total);
  const thankName = donorName.trim() ? donorName.trim().split(/\s+/)[0] : "friend";

  function submitDonate() {
    if (!donorName.trim() || !donorEmail.trim() || !total) {
      setDonateError("Please add your name, email and an amount.");
      return;
    }
    setDonated(true);
    setDonateError("");
    window.scrollTo({ top: 0 });
  }

  return (
    <section style={s("max-width:620px;margin:0 auto;padding:40px 24px 100px")}>
      <div style={s("background:#fff;border:1px solid #ECEAE4;border-radius:16px;padding:36px;box-shadow:0 14px 40px rgba(27,26,22,.06)")}>

        {!donated && (
          <div>
            <h2 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:24px;color:#1B1A16;margin:0 0 20px")}>Choose an amount</h2>
            <div style={s("display:grid;grid-template-columns:repeat(2,1fr);gap:12px")}>
              {TIERS.map((tier) => {
                const selected = !customSelected && donateAmount === tier.value;
                return (
                  <Btn
                    key={tier.value}
                    base={tierBtn}
                    hover="border-color:#c9b9a0"
                    onClick={() => {
                      setDonateAmount(tier.value);
                      setCustomSelected(false);
                      setDonateError("");
                    }}
                  >
                    {tier.label}
                    {selected && (
                      <span style={s("position:absolute;inset:0;border:2.5px solid #8A1416;border-radius:10px;pointer-events:none")} />
                    )}
                  </Btn>
                );
              })}
            </div>
            <Btn
              base="position:relative;width:100%;margin-top:12px;background:#FAFAF8;border:1.5px solid #ECEAE4;border-radius:10px;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:16px;color:#1B1A16;padding:15px 0"
              hover="border-color:#c9b9a0"
              onClick={() => {
                setCustomSelected(true);
                setDonateError("");
              }}
            >
              Custom amount
              {customSelected && (
                <span style={s("position:absolute;inset:0;border:2.5px solid #8A1416;border-radius:10px;pointer-events:none")} />
              )}
            </Btn>
            {customSelected && (
              <div style={s("margin-top:12px;position:relative;display:flex;align-items:center")}>
                <span style={s("position:absolute;left:16px;font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:18px;color:#6F6B64")}>£</span>
                <Field
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount((e.target.value || "").replace(/[^0-9]/g, ""));
                    setCustomSelected(true);
                  }}
                  inputMode="numeric"
                  placeholder="Enter amount"
                  base="width:100%;padding:14px 16px 14px 34px;border:1.5px solid #ECEAE4;border-radius:10px;font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:18px;color:#1B1A16;outline:none;background:#FAFAF8"
                  focus="border-color:#8A1416"
                />
              </div>
            )}

            <div style={s("border-top:1px solid #ECEAE4;margin:26px 0 22px")}></div>

            <div style={s("display:flex;flex-direction:column;gap:14px")}>
              <div>
                <label style={s("display:block;font-size:13px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#6F6B64;margin-bottom:7px;font-family:'Chakra Petch',sans-serif")}>Your name</label>
                <Field
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Jane Smith"
                  base="width:100%;padding:13px 15px;border:1.5px solid #ECEAE4;border-radius:10px;font-family:'Public Sans',sans-serif;font-size:16px;color:#1B1A16;outline:none;background:#FAFAF8"
                  focus="border-color:#8A1416"
                />
              </div>
              <div>
                <label style={s("display:block;font-size:13px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#6F6B64;margin-bottom:7px;font-family:'Chakra Petch',sans-serif")}>Email</label>
                <Field
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  type="email"
                  placeholder="jane@email.com"
                  base="width:100%;padding:13px 15px;border:1.5px solid #ECEAE4;border-radius:10px;font-family:'Public Sans',sans-serif;font-size:16px;color:#1B1A16;outline:none;background:#FAFAF8"
                  focus="border-color:#8A1416"
                />
              </div>
            </div>

            {donateError && (
              <p style={s("margin:16px 0 0;font-size:14px;color:#8A1416;font-weight:600")}>{donateError}</p>
            )}

            <Btn
              base="width:100%;margin-top:24px;background:#8A1416;border:none;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:16px;letter-spacing:.04em;text-transform:uppercase;color:#fff;padding:17px 0;border-radius:10px"
              hover="background:#6E0B0A"
              onClick={submitDonate}
            >
              Donate {donateTotal}
            </Btn>
            <p style={s("margin:14px 0 0;text-align:center;font-size:13px;color:#A29C92")}>Secure demo form · No real payment is taken</p>
          </div>
        )}

        {donated && (
          <div style={s("text-align:center;padding:14px 0")}>
            <div style={s("width:72px;height:72px;border-radius:50%;background:#D3A00B;display:flex;align-items:center;justify-content:center;margin:0 auto 22px;font-size:38px;color:#1B1A16")}>✓</div>
            <h2 style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:26px;color:#1B1A16;margin:0 0 12px")}>Thank you, {thankName}!</h2>
            <p style={s("margin:0 auto 26px;font-size:16px;line-height:1.65;color:#6F6B64;max-width:40ch")}>Your {donateTotal} gift helps VIS Evolutions build faster and reach the start line. We&apos;ve sent a confirmation to your email.</p>
            <Btn
              base="background:transparent;border:1.5px solid #1B1A16;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#1B1A16;padding:13px 26px;border-radius:8px"
              hover="background:#1B1A16;color:#fff"
              onClick={() => setDonated(false)}
            >
              Make another donation
            </Btn>
          </div>
        )}

      </div>
    </section>
  );
}
