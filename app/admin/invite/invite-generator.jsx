"use client";

import { useActionState, useState } from "react";
import { s } from "@/lib/style";
import { generateInvite } from "./actions";

const field =
  "width:100%;padding:13px 15px;border:1.5px solid #ECEAE4;border-radius:10px;font-family:'Public Sans',sans-serif;font-size:16px;color:#1B1A16;outline:none;background:#FAFAF8";
const label =
  "display:block;font-size:13px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#6F6B64;margin-bottom:7px;font-family:'Chakra Petch',sans-serif";

export default function InviteGenerator() {
  const [state, formAction, pending] = useActionState(generateInvite, {});
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(state.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — user can select manually */
    }
  }

  return (
    <div>
      <form action={formAction} style={s("display:flex;flex-direction:column;gap:18px")}>
        <div>
          <label style={s(label)}>Label (optional)</label>
          <input name="label" placeholder="e.g. Team sign-up" style={s(field)} />
        </div>
        <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:18px")}>
          <div>
            <label style={s(label)}>Expires in (days)</label>
            <input name="expires" type="number" min="1" defaultValue="7" style={s(field)} />
          </div>
          <div>
            <label style={s(label)}>Max uses (blank = unlimited)</label>
            <input name="max_uses" type="number" min="1" placeholder="Unlimited" style={s(field)} />
          </div>
        </div>

        {state?.error && <p style={s("margin:0;font-size:14px;color:#8A1416;font-weight:600")}>{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          style={s(
            "align-self:flex-start;background:#8A1416;border:none;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:15px;letter-spacing:.04em;text-transform:uppercase;color:#fff;padding:14px 26px;border-radius:10px" +
              (pending ? ";opacity:.6" : "")
          )}
        >
          {pending ? "Generating…" : "Generate invite link"}
        </button>
      </form>

      {state?.url && (
        <div style={s("margin-top:26px;background:#FAFAF8;border:1px solid #ECEAE4;border-radius:12px;padding:20px")}>
          <div style={s("font-size:13px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#6F6B64;margin-bottom:10px;font-family:'Chakra Petch',sans-serif")}>Share this link with your team</div>
          <div style={s("display:flex;gap:10px;flex-wrap:wrap;align-items:center")}>
            <input
              readOnly
              value={state.url}
              onFocus={(e) => e.target.select()}
              style={s("flex:1;min-width:220px;padding:12px 14px;border:1.5px solid #ECEAE4;border-radius:10px;font-family:'Space Mono',monospace;font-size:13px;color:#1B1A16;background:#fff;outline:none")}
            />
            <button
              type="button"
              onClick={copy}
              style={s("background:#1B1A16;border:none;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#fff;padding:12px 20px;border-radius:10px")}
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <p style={s("margin:12px 0 0;font-size:13px;color:#A29C92")}>Anyone with this link can register an admin account until it expires or runs out of uses.</p>
        </div>
      )}
    </div>
  );
}
