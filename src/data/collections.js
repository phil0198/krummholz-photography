/**
 * COLLECTIONS — single source of truth for every portfolio gallery.
 *
 * The actual data lives in collections.json (a plain data file, not code)
 * so both this site and the /admin panel can read and update it — the
 * admin panel edits it via the GitHub API and commits directly.
 *
 * HOW TO ADD REAL PHOTOS
 * -----------------------
 * The easiest way is /admin on the deployed site: log in, pick a
 * collection, and use "Replace photo" / "Add image". It resizes the
 * photo in your browser and commits it straight to the repo.
 *
 * To do it by hand instead:
 * 1. Drop image files into `public/photos/<collection-slug>/`, using the
 *    exact filenames referenced in each image's `src` in collections.json,
 *    e.g. public/photos/alpine-wildlife/01-bull-elk-velvet.jpg.
 * 2. That's it — no code changes needed. Until a file exists at that path,
 *    <Photo> (src/components/Photo.jsx) automatically renders a labeled
 *    placeholder built from the image's `alt` text, so the site works
 *    today and upgrades to real photography the moment files land.
 * 3. To add a new collection, copy one of the objects in collections.json,
 *    give it a unique `slug`, and fill in `cover`, `intro`, and `images`.
 *    It will automatically appear on the /work index and get its own
 *    gallery route at /work/<slug> — no routing changes required.
 */
import collectionsData from "./collections.json";

export const collections = collectionsData;

export function getCollection(slug) {
  return collections.find((c) => c.slug === slug);
}
