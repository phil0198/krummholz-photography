// Site-wide identity, editable via /admin (Site Settings tab), which
// commits changes straight to site.json through the GitHub API.
import siteData from "./site.json";

export const site = siteData;

// Nav structure is code, not content, so it stays out of the admin panel.
export const navLinks = [
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];
