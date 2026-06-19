"use client";

import { useState } from "react";
import Link from "next/link";
import { s } from "@/lib/style";

// Faithfully reproduces the prototype's `style-hover` behaviour: a base inline
// style with a hover overlay merged in on pointer enter. Renders a next/link
// when `href` is set, otherwise a <button>.
export default function Btn({ base, hover, href, onClick, type = "button", children, ...rest }) {
  const [hovered, setHovered] = useState(false);
  const style = {
    transition:
      "background-color .22s ease, color .22s ease, border-color .22s ease, opacity .22s ease, box-shadow .22s ease, transform .22s ease",
    ...s(base),
    ...(hovered && hover ? s(hover) : null),
  };

  const handlers = {
    style,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    ...rest,
  };

  if (href) {
    const internal = href.startsWith("/");
    if (!internal) {
      return (
        <a href={href} onClick={onClick} {...handlers}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} {...handlers}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} {...handlers}>
      {children}
    </button>
  );
}
