// Site-wide identity and navigation. Edit here to rename, re-link, or
// update contact details across the whole site in one place.
export const site = {
  name: "Treeline",
  tagline: "Wildlife & landscape photography, Colorado high country.",
  photographer: "Phil",
  instagramHandle: "@realphilofthefuture",
  instagramUrl: "https://www.instagram.com/realphilofthefuture",
  email: "hello@treelinephotography.com", // placeholder — swap for the real inbox
  location: "Colorado, USA",
  // Full-bleed homepage hero. Drop the real file at public/photos/home/hero.jpg
  // (see src/data/collections.js for how the placeholder fallback works).
  heroImage: {
    src: "/photos/home/hero.jpg",
    alt: "A small herd of elk grazing in an open alpine meadow at sunrise, snow-dusted peaks in the distance, Rocky Mountain National Park.",
  },
  // Portrait slot for the About page.
  portrait: {
    src: "/photos/home/portrait.jpg",
    alt: "Portrait of the photographer on a scree slope above treeline, camera in hand, overcast light.",
  },
};

export const navLinks = [
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];
