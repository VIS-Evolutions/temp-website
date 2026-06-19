"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { s } from "@/lib/style";
import { NAV } from "@/lib/site";
import Btn from "./Btn";

const navBtn =
  "position:relative;background:none;border:none;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:500;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#232220;padding:10px 14px";

export default function Header() {
  const pathname = usePathname();

  return (
    <header style={s("position:sticky;top:0;z-index:50;background:rgba(250,250,248,.88);backdrop-filter:saturate(140%) blur(12px);border-bottom:1px solid #ECEAE4")}>
      <div style={s("max-width:1200px;margin:0 auto;padding:12px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px")}>
        <Link href="/" style={s("background:none;border:none;cursor:pointer;display:flex;align-items:center;padding:0")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="VIS Evolutions" style={s("height:46px;width:auto;display:block")} />
        </Link>
        <nav style={s("display:flex;align-items:center;gap:6px;flex-wrap:wrap;white-space:nowrap")}>
          {NAV.map((item) => (
            <Btn key={item.href} href={item.href} base={navBtn} hover="color:#8A1416">
              {item.label}
              {pathname === item.href && (
                <span style={s("position:absolute;left:14px;right:14px;bottom:2px;height:3px;background:#D3A00B;border-radius:2px")} />
              )}
            </Btn>
          ))}
          <Btn
            href="/donate"
            base="margin-left:8px;background:#8A1416;border:none;cursor:pointer;font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:14px;letter-spacing:.05em;text-transform:uppercase;color:#fff;padding:11px 22px;border-radius:6px"
            hover="background:#6E0B0A"
          >
            Donate
          </Btn>
        </nav>
      </div>
    </header>
  );
}
