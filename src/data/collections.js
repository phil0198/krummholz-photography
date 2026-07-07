/**
 * COLLECTIONS — single source of truth for every portfolio gallery.
 *
 * HOW TO ADD REAL PHOTOS
 * -----------------------
 * 1. Drop image files into `public/photos/<collection-slug>/`, using the
 *    exact filenames referenced in each image's `src` below, e.g.:
 *      public/photos/alpine-wildlife/01-bull-elk-velvet.jpg
 * 2. That's it — no code changes needed. Until a file exists at that path,
 *    <Photo> (src/components/Photo.jsx) automatically renders a labeled
 *    placeholder built from the image's `alt` text, so the site works
 *    today and upgrades to real photography the moment files land.
 * 3. To add a new collection, copy one of the objects below, give it a
 *    unique `slug`, and fill in `cover`, `intro`, and `images`. It will
 *    automatically appear on the /work index and get its own gallery
 *    route at /work/<slug> — no routing changes required.
 */

export const collections = [
  {
    slug: "alpine-wildlife",
    title: "Alpine Wildlife",
    standfirst:
      "Elk, marmots, pikas, and the other residents of the tundra — met on their own patient terms.",
    cover: {
      src: "/photos/alpine-wildlife/cover.jpg",
      alt: "Bull elk with antlers in velvet standing in open alpine tundra at first light, Rocky Mountain National Park.",
    },
    intro: [
      "Above eleven thousand feet the air gets thin and the animals get careful. Everything up there has already survived a winter, and it shows in how little they waste — no motion without reason, no sound without cause.",
      "Most of what follows is the product of sitting still for a long time: waiting on a ridge for elk to forget I'm there, or lying on scree until a pika finally comes out from under it. A few seconds of eye contact is the whole transaction.",
    ],
    images: [
      {
        id: "aw-01",
        src: "/photos/alpine-wildlife/01-bull-elk-velvet.jpg",
        alt: "Bull elk with antlers still in velvet standing in golden morning light, Rocky Mountain National Park.",
        caption: "Bull elk in velvet, first light — Rocky Mountain National Park.",
      },
      {
        id: "aw-02",
        src: "/photos/alpine-wildlife/02-cow-elk-calf.jpg",
        alt: "Cow elk and calf crossing a subalpine wildflower meadow, Mummy Range, Colorado.",
        caption: "Cow and calf crossing the meadow — Mummy Range.",
      },
      {
        id: "aw-03",
        src: "/photos/alpine-wildlife/03-marmot-talus.jpg",
        alt: "Yellow-bellied marmot sunning itself on a talus slope, Mount Evans Wilderness.",
        caption: "Marmot, midday sun — Mount Evans Wilderness.",
      },
      {
        id: "aw-04",
        src: "/photos/alpine-wildlife/04-pika-forage.jpg",
        alt: "American pika carrying a mouthful of wildflowers across a boulder field, Indian Peaks Wilderness.",
        caption: "Pika hauling forage — Indian Peaks Wilderness.",
      },
      {
        id: "aw-05",
        src: "/photos/alpine-wildlife/05-bighorn-ram.jpg",
        alt: "Bighorn sheep ram bedded down on a scree slope, Sawatch Range.",
        caption: "Bighorn ram, bedded on scree — Sawatch Range.",
      },
      {
        id: "aw-06",
        src: "/photos/alpine-wildlife/06-red-fox-snow.jpg",
        alt: "Red fox crossing a patch of fresh snow at treeline, Gunnison National Forest.",
        caption: "Fox at treeline, first snow — Gunnison National Forest.",
      },
      {
        id: "aw-07",
        src: "/photos/alpine-wildlife/07-red-tailed-hawk.jpg",
        alt: "Red-tailed hawk riding a thermal above a high alpine ridgeline, San Juan Mountains.",
        caption: "Hawk on the thermals — San Juan Mountains.",
      },
      {
        id: "aw-08",
        src: "/photos/alpine-wildlife/08-mountain-goats.jpg",
        alt: "Mountain goat nanny and kid walking a knife-edge ridge, Mount Massive.",
        caption: "Nanny and kid, knife-edge ridge — Mount Massive.",
      },
    ],
  },
  {
    slug: "high-country",
    title: "High Country",
    standfirst:
      "Ridgelines, alpine lakes, and the long light that only shows up above eleven thousand feet.",
    cover: {
      src: "/photos/high-country/cover.jpg",
      alt: "Alpine lake at sunrise reflecting a jagged ridgeline, Indian Peaks Wilderness.",
    },
    intro: [
      "These are the places I go to be quiet. Basins that hold snow into July, lakes so still they double the sky, ridgelines that put you above everything but the weather.",
      "None of this is dramatic on purpose — it's just what's there before six in the morning, when the light is doing something it won't do again that day.",
    ],
    images: [
      {
        id: "hc-01",
        src: "/photos/high-country/01-alpine-lake-sunrise.jpg",
        alt: "Alpine lake mirroring a dusting of fresh snow on the surrounding peaks, Indian Peaks Wilderness.",
        caption: "Alpine lake, first snow — Indian Peaks Wilderness.",
      },
      {
        id: "hc-02",
        src: "/photos/high-country/02-tundra-ridgeline.jpg",
        alt: "Tundra ridgeline lit by sunrise along Trail Ridge Road, Rocky Mountain National Park.",
        caption: "Tundra ridgeline, sunrise — Trail Ridge Road.",
      },
      {
        id: "hc-03",
        src: "/photos/high-country/03-wildflowers-scree.jpg",
        alt: "Alpine wildflowers growing among scree below a thirteener summit, San Juan Mountains.",
        caption: "Wildflowers below the scree line — San Juan Mountains.",
      },
      {
        id: "hc-04",
        src: "/photos/high-country/04-fog-basin.jpg",
        alt: "Morning fog lifting off a high alpine basin, Sawatch Range.",
        caption: "Fog lifting off the basin — Sawatch Range.",
      },
      {
        id: "hc-05",
        src: "/photos/high-country/05-cirque-headwall.jpg",
        alt: "Late afternoon light on a glacial cirque headwall, Gore Range.",
        caption: "Late light on the headwall — Gore Range.",
      },
      {
        id: "hc-06",
        src: "/photos/high-country/06-krummholz-treeline.jpg",
        alt: "Wind-bent krummholz spruce clinging to a slope at treeline, Mosquito Range.",
        caption: "Krummholz at treeline — Mosquito Range.",
      },
      {
        id: "hc-07",
        src: "/photos/high-country/07-storm-clearing-summit.jpg",
        alt: "Storm clouds clearing over a fourteener summit ridge, Elk Mountains.",
        caption: "Storm clearing over the ridge — Elk Mountains.",
      },
    ],
  },
  {
    slug: "snowfields",
    title: "Snowfields",
    standfirst:
      "Snow, wind-scoured rock, and the long low light of the alpine winter.",
    cover: {
      src: "/photos/snowfields/cover.jpg",
      alt: "Wind-scoured snow ridge under a deep blue winter sky, Mosquito Range.",
    },
    intro: [
      "Winter above treeline empties the place out. The wildlife thins to what can survive it, the color drains to white and stone and a few hours of blue-gold light, and the wind writes and rewrites the snow into new shapes every night.",
      "This is the season that tests whether you actually like it up there, or just like how it looks in July.",
    ],
    images: [
      {
        id: "sf-01",
        src: "/photos/snowfields/01-wind-scoured-ridge.jpg",
        alt: "Wind-scoured snow ridge photographed at blue hour, Mosquito Range.",
        caption: "Wind-scoured ridge, blue hour — Mosquito Range.",
      },
      {
        id: "sf-02",
        src: "/photos/snowfields/02-cornice-couloir.jpg",
        alt: "Snow cornice overhanging a steep couloir, Gore Range.",
        caption: "Cornice over the couloir — Gore Range.",
      },
      {
        id: "sf-03",
        src: "/photos/snowfields/03-ptarmigan-tracks.jpg",
        alt: "White-tailed ptarmigan tracks crossing an open snowfield, Indian Peaks Wilderness.",
        caption: "Ptarmigan tracks, open snowfield — Indian Peaks Wilderness.",
      },
      {
        id: "sf-04",
        src: "/photos/snowfields/04-alpenglow-thirteener.jpg",
        alt: "Alpenglow lighting a snow-covered thirteener summit, Sawatch Range.",
        caption: "Alpenglow on the thirteener — Sawatch Range.",
      },
      {
        id: "sf-05",
        src: "/photos/snowfields/05-rime-ice-krummholz.jpg",
        alt: "Rime ice coating stunted krummholz trees at treeline, San Juan Mountains.",
        caption: "Rime ice at treeline — San Juan Mountains.",
      },
      {
        id: "sf-06",
        src: "/photos/snowfields/06-ski-tracks-couloir.jpg",
        alt: "A single set of ski tracks below a couloir in first light, Elk Mountains.",
        caption: "First tracks, first light — Elk Mountains.",
      },
    ],
  },
];

export function getCollection(slug) {
  return collections.find((c) => c.slug === slug);
}
