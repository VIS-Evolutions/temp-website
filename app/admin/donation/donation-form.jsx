"use client";

import { useActionState, useState } from "react";
import { s } from "@/lib/style";
import { updateDonationAction } from "./actions";

const field =
  "width:100%;padding:13px 15px 13px 32px;border:1.5px solid #ECEAE4;border-radius:10px;font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:18px;color:#1B1A16;outline:none;background:#FAFAF8";
const label =
  "display:block;font-size:13px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#6F6B64;margin-bottom:7px;font-family:'Chakra Petch',sans-serif";

export default function DonationForm({ settings }) {
  const [state, formAction, pending] = useActionState(updateDonationAction, {});
  const [goal, setGoal] = useState(settings.goalAmount);
  const [raised, setRaised] = useState(settings.raisedAmount);

  const g = Number(goal) || 0;
  const r = Number(raised) || 0;
  const pct = g > 0 ? Math.max(0, Math.min(100, Math.round((r / g) * 100))) : 0;

  const onlyDigits = (v) => v.replace(/[^0-9]/g, "");

  return (
    <form action={formAction} style={s("display:flex;flex-direction:column;gap:20px")}>
      <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));gap:18px")}>
        <div>
          <label style={s(label)}>Goal amount</label>
          <div style={s("position:relative;display:flex;align-items:center")}>
            <span style={s("position:absolute;left:14px;font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:16px;color:#6F6B64")}>£</span>
            <input name="goal_amount" inputMode="numeric" value={goal} onChange={(e) => setGoal(onlyDigits(e.target.value))} style={s(field)} />
          </div>
        </div>
        <div>
          <label style={s(label)}>Raised so far</label>
          <div style={s("position:relative;display:flex;align-items:center")}>
            <span style={s("position:absolute;left:14px;font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:16px;color:#6F6B64")}>£</span>
            <input name="raised_amount" inputMode="numeric" value={raised} onChange={(e) => setRaised(onlyDigits(e.target.value))} style={s(field)} />
          </div>
        </div>
      </div>

      {/* Live preview of the progress bar */}
      <div style={s("background:#FAFAF8;border:1px solid #ECEAE4;border-radius:12px;padding:18px")}>
        <div style={s("display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px")}>
          <span style={s("font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:18px;color:#1B1A16")}>£{r.toLocaleString("en-GB")} <span style={s("font-size:13px;color:#6F6B64;font-weight:500")}>raised</span></span>
          <span style={s("font-size:13px;color:#6F6B64;font-family:'Chakra Petch',sans-serif")}>Goal £{g.toLocaleString("en-GB")} · {pct}%</span>
        </div>
        <div style={s("height:12px;background:#EBE8E2;border-radius:8px;overflow:hidden")}>
          <div style={{ ...s("height:100%;background:linear-gradient(90deg,#8A1416,#D3A00B);border-radius:8px;transition:width .3s"), width: pct + "%" }}></div>
        </div>
      </div>

      {state?.error && <p style={s("margin:0;font-size:14px;color:#8A1416;font-weight:600")}>{state.error}</p>}
      {state?.success && <p style={s("margin:0;font-size:14px;color:#1a7a3c;font-weight:600")}>Saved — the donate page is updated.</p>}

      <button
        type="submit"
        disabled={pending}
        style={s(
          "align-self:flex-start;background:#8A1416;border:none;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:15px;letter-spacing:.04em;text-transform:uppercase;color:#fff;padding:14px 28px;border-radius:10px" +
            (pending ? ";opacity:.6" : "")
        )}
      >
        {pending ? "Saving…" : "Save goal"}
      </button>
    </form>
  );
}
