"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { s } from "@/lib/style";
import { NAV } from "@/lib/site";
import Btn from "./Btn";

const navBtn =
  "position:relative;background:none;border:none;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:500;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#232220;padding:10px 14px";

const donateBtn =
  "background:#8A1416;border:none;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:14px;letter-spacing:.05em;text-transform:uppercase;color:#fff;padding:11px 22px;border-radius:6px";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header style={s("position:sticky;top:0;z-index:50;background:rgba(250,250,248,.92);backdrop-filter:saturate(140%) blur(12px);border-bottom:1px solid #ECEAE4")}>
      <div style={s("max-width:1200px;margin:0 auto;padding:12px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px")}>
        <Link href="/" onClick={close} style={s("background:none;border:none;cursor:pointer;display:flex;align-items:center;padding:0")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="VIS Evolutions" style={s("height:42px;width:auto;display:block")} />
        </Link>

        {/* Desktop nav */}
        <nav className="vis-nav-desktop">
          {NAV.map((item) => (
            <Btn key={item.href} href={item.href} base={navBtn} hover="color:#8A1416">
              {item.label}
              {pathname === item.href && (
                <span style={s("position:absolute;left:14px;right:14px;bottom:2px;height:3px;background:#D3A00B;border-radius:2px")} />
              )}
            </Btn>
          ))}
          <Btn href="/donate" base={"margin-left:8px;" + donateBtn} hover="background:#6E0B0A">Donate</Btn>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="vis-burger"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          style={s("background:none;border:none;cursor:pointer;padding:8px;align-items:center;justify-content:center;color:#1B1A16")}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            {open ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <nav className={"vis-mobile-menu" + (open ? " open" : "")} style={s("border-top:1px solid #ECEAE4;background:rgba(250,250,248,.98);padding:10px 16px 18px")}>
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              style={s(
                "display:block;font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:16px;letter-spacing:.04em;text-transform:uppercase;padding:15px 8px;border-bottom:1px solid #ECEAE4;color:" +
                  (active ? "#8A1416" : "#232220")
              )}
            >
              {item.label}
            </Link>
          );
        })}
        <Link href="/donate" onClick={close} style={s("display:block;text-align:center;margin-top:16px;" + donateBtn)}>
          Donate
        </Link>
      </nav>
    </header>
  );
}
