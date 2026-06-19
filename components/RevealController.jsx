"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Reproduces the prototype's scroll-reveal: every [data-reveal] element fades
// and slides up as it enters the viewport, with a small staggered delay.
// Re-runs on route change so freshly mounted page content animates in.
export default function RevealController({ revealOnScroll = true }) {
  const pathname = usePathname();

  useEffect(() => {
    let io = null;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const raf = requestAnimationFrame(() => {
      const els = Array.from(document.querySelectorAll("[data-reveal]"));
      if (!revealOnScroll || prefersReduced) {
        els.forEach((e) => {
          e.style.opacity = "1";
          e.style.transform = "none";
        });
        return;
      }
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.style.opacity = "1";
              en.target.style.transform = "none";
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
      );
      els.forEach((e, i) => {
        const d = (i % 3) * 0.07;
        e.style.opacity = "0";
        e.style.transform = "translateY(22px)";
        e.style.transition =
          "opacity .7s cubic-bezier(.2,.7,.2,1) " + d + "s, transform .7s cubic-bezier(.2,.7,.2,1) " + d + "s";
        io.observe(e);
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      if (io) io.disconnect();
    };
  }, [pathname, revealOnScroll]);

  return null;
}
