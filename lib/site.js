// Shared site config. These mirror the prototype's editable props.
export const DONATION = {
  goalAmount: 6000,
  raisedAmount: 3420,
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/sponsorship", label: "Sponsorship" },
  { href: "/news", label: "News" },
];

export const fmtGBP = (n) => "£" + Number(n).toLocaleString("en-GB");

export const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
