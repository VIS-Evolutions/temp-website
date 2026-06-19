"use client";

import { useState } from "react";
import { s } from "@/lib/style";

// Input that reproduces the prototype's `style-focus` border highlight.
export default function Field({ base, focus, ...rest }) {
  const [focused, setFocused] = useState(false);
  const style = {
    transition: "border-color .2s ease, box-shadow .2s ease",
    ...s(base),
    ...(focused && focus ? s(focus) : null),
  };
  return (
    <input
      {...rest}
      style={style}
      onFocus={(e) => {
        setFocused(true);
        rest.onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        rest.onBlur?.(e);
      }}
    />
  );
}
