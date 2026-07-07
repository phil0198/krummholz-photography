# Treeline

A photography portfolio for a Colorado alpine wildlife & landscape
photographer. React + Vite, Tailwind CSS v4, react-router-dom, lucide-react.
No backend — fully static, deploy anywhere that serves static files.

## Running it

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to `http://localhost:5173`).

```bash
npm run build   # production build to dist/
npm run preview # serve the production build locally
```

## Adding real photos

There are no real photographs in this repo yet — every image slot renders a
labeled placeholder (a dark box with an icon and its alt text) until a real
file exists at the expected path. This is handled by
[`src/components/Photo.jsx`](src/components/Photo.jsx): it renders an
`<img>`, and falls back to the placeholder automatically on load error, so
there's nothing to toggle or configure.

**To add photos, do this:**

1. Open [`src/data/collections.js`](src/data/collections.js) — this is the
   single source of truth for every gallery, its intro copy, and its images.
   Read the comment at the top of the file.
2. Open [`src/data/site.js`](src/data/site.js) for the homepage hero image
   and the About page portrait.
3. For each image, drop the actual file at the exact path referenced in its
   `src` field, under `public/`. For example, an entry with
   `src: "/photos/alpine-wildlife/01-bull-elk-velvet.jpg"` needs a file at
   `public/photos/alpine-wildlife/01-bull-elk-velvet.jpg`.
4. That's it — no code changes required. The placeholder disappears and the
   real photo appears the moment the file exists at that path.

To add a whole new gallery/collection, copy one of the existing objects in
`collections.js`, give it a unique `slug`, and fill in `cover`, `intro`, and
`images`. It will automatically show up on `/work` and get its own route at
`/work/<slug>` — no routing changes needed.

## Where things live

```
src/
  data/
    site.js          site name, tagline, email, Instagram, hero + portrait images
    collections.js    every gallery: title, intro copy, cover, and image list
  components/
    Photo.jsx          image with automatic placeholder fallback
    Gallery.jsx         masonry-style grid, opens Lightbox on click
    Lightbox.jsx        full-screen viewer (Esc to close, arrow keys to navigate)
    layout/
      PublicLayout.jsx  page shell: Nav + <Outlet/> + Footer
      Nav.jsx           site nav, incl. mobile menu
      Footer.jsx        footer with quick links + contact
  pages/
    Home.jsx, Work.jsx, GalleryPage.jsx, About.jsx, Contact.jsx, NotFound.jsx
  index.css            theme tokens (colors, fonts) — see the comment at the top
```

## Theme

Colors and fonts are centralized in [`src/index.css`](src/index.css) inside
the `@theme` block, with a comment explaining each token. Change a value
there and it updates everywhere the corresponding Tailwind utility is used
(`bg-ink`, `text-accent`, `font-display`, etc.).
