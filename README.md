# Krummholz

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

**The easy way: `/admin`.** The deployed site has a password-gated admin
panel at `/admin` — log in, pick a collection, and use "Add image" /
"Replace photo" to upload straight from your browser. It resizes the photo
client-side, commits it to this repo via the GitHub API, and Vercel
redeploys automatically (usually live within ~30–60 seconds). The same
panel lets you edit titles, intro copy, captions, image order, and the
Site Settings (name, tagline, email, Instagram, hero/portrait images) —
no code editing required. See "The admin panel" section below for setup
details if you ever need to redeploy this from scratch.

**To add photos by hand instead:**

1. Open [`src/data/collections.js`](src/data/collections.js) (it re-exports
   [`src/data/collections.json`](src/data/collections.json), the real data
   file, so admin edits and manual edits both land in the same place) —
   this is the single source of truth for every gallery, its intro copy,
   and its images.
2. Open [`src/data/site.json`](src/data/site.json) for the homepage hero
   image and the About page portrait.
3. For each image, drop the actual file at the exact path referenced in its
   `src` field, under `public/`. For example, an entry with
   `src: "/photos/alpine-wildlife/01-bull-elk-velvet.jpg"` needs a file at
   `public/photos/alpine-wildlife/01-bull-elk-velvet.jpg`.
4. That's it — no code changes required. The placeholder disappears and the
   real photo appears the moment the file exists at that path.

To add a whole new gallery/collection, copy one of the existing objects in
`collections.json`, give it a unique `slug`, and fill in `cover`, `intro`,
and `images`. It will automatically show up on `/work` and get its own
route at `/work/<slug>` — no routing changes needed. (Or just click "New
collection" in `/admin`.)

## The admin panel

`/admin` is a small dashboard backed by three Vercel serverless functions
under [`api/admin/`](api/admin) — there's no database; it reads and writes
`collections.json` / `site.json` and uploads photos directly to this GitHub
repo via the GitHub Contents API, using a password-protected session cookie.

It needs three environment variables set in the Vercel project (Settings →
Environment Variables):

- `GITHUB_TOKEN` — a token with write access to this repo (used server-side
  only, never exposed to the browser)
- `ADMIN_PASSWORD` — the password for `/admin`
- `ADMIN_SESSION_SECRET` — any long random string, used to sign the login
  session cookie

If you fork this or redeploy it fresh, also update `OWNER`/`REPO` at the top
of [`api/_lib/github.js`](api/_lib/github.js) to match the new repo.

## Where things live

```
api/
  admin/               serverless functions: login, logout, session,
                       collections (GET/PUT), site (GET/PUT), upload
  _lib/                shared helpers: GitHub Contents API, cookie auth
src/
  data/
    site.json          the editable content: name, tagline, email,
                       Instagram, hero + portrait images
    site.js            re-exports site.json (keeps existing imports stable)
    collections.json    the editable content: every gallery's title,
                       intro copy, cover, and image list
    collections.js      re-exports collections.json + a getCollection() helper
  components/
    Photo.jsx          image with automatic placeholder fallback
    Gallery.jsx         masonry-style grid, opens Lightbox on click
    Lightbox.jsx        full-screen viewer (Esc to close, arrow keys to navigate)
    layout/
      PublicLayout.jsx  page shell: Nav + <Outlet/> + Footer
      Nav.jsx           site nav, incl. mobile menu
      Footer.jsx        footer with quick links + contact
    admin/              /admin UI: login form, dashboard, collection +
                       site settings editors, per-image row
  lib/
    adminApi.js         fetch wrapper for the /api/admin/* endpoints
    resizeImage.js       client-side photo resize/compress before upload
  pages/
    Home.jsx, Work.jsx, GalleryPage.jsx, About.jsx, Contact.jsx, Admin.jsx, NotFound.jsx
  index.css            theme tokens (colors, fonts) — see the comment at the top
```

## Theme

Colors and fonts are centralized in [`src/index.css`](src/index.css) inside
the `@theme` block, with a comment explaining each token. Change a value
there and it updates everywhere the corresponding Tailwind utility is used
(`bg-ink`, `text-accent`, `font-display`, etc.).
