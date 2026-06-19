// Parse a CSS declaration string ("prop:val;prop:val") into a React style object.
// This lets the page markup reuse the prototype's exact inline styles verbatim,
// so the visual output stays pixel-identical to the original.
export function s(css) {
  const out = {};
  if (!css) return out;
  for (const decl of css.split(";")) {
    const i = decl.indexOf(":");
    if (i === -1) continue;
    const rawProp = decl.slice(0, i).trim();
    const value = decl.slice(i + 1).trim();
    if (!rawProp || value === "") continue;
    out[camel(rawProp)] = value;
  }
  return out;
}

function camel(prop) {
  // Vendor-prefixed props (-webkit-, -moz-, -ms-, -o-) keep React's casing rules:
  // -ms- → ms*, everything else → capitalized first segment (e.g. WebkitFontSmoothing).
  const lead = prop.startsWith("-");
  const segs = prop.replace(/^-/, "").split("-");
  let name = segs
    .map((seg, idx) => (idx === 0 ? seg : seg.charAt(0).toUpperCase() + seg.slice(1)))
    .join("");
  if (lead && !prop.startsWith("-ms-")) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
  }
  return name;
}
