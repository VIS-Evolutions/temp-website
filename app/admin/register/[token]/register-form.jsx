"use client";

import { useActionState } from "react";
import { s } from "@/lib/style";
import { registerAction } from "../actions";

const field =
  "width:100%;padding:13px 15px;border:1.5px solid #ECEAE4;border-radius:10px;font-family:'Public Sans',sans-serif;font-size:16px;color:#1B1A16;outline:none;background:#FAFAF8";
const label =
  "display:block;font-size:13px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#6F6B64;margin-bottom:7px;font-family:'Chakra Petch',sans-serif";

export default function RegisterForm({ token }) {
  const [state, formAction, pending] = useActionState(registerAction, { error: null });

  return (
    <form action={formAction} style={s("display:flex;flex-direction:column;gap:16px")}>
      <input type="hidden" name="token" value={token} />
      <div>
        <label style={s(label)}>Your name</label>
        <input name="display_name" autoComplete="name" placeholder="Alice Smith" style={s(field)} />
      </div>
      <div>
        <label style={s(label)}>Username</label>
        <input name="username" autoComplete="username" style={s(field)} />
      </div>
      <div>
        <label style={s(label)}>Password</label>
        <input name="password" type="password" autoComplete="new-password" style={s(field)} />
      </div>
      <div>
        <label style={s(label)}>Confirm password</label>
        <input name="confirm" type="password" autoComplete="new-password" style={s(field)} />
      </div>

      {state?.error && <p style={s("margin:0;font-size:14px;color:#8A1416;font-weight:600")}>{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        style={s(
          "margin-top:6px;background:#8A1416;border:none;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:16px;letter-spacing:.04em;text-transform:uppercase;color:#fff;padding:15px 0;border-radius:10px" +
            (pending ? ";opacity:.6" : "")
        )}
      >
        {pending ? "Creating account…" : "Create admin account"}
      </button>
    </form>
  );
}
