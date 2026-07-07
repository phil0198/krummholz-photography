import { AtSign } from "lucide-react";
import Photo from "@/components/Photo";
import { site } from "@/data/site";

export default function About() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24 lg:px-12">
      <div className="grid gap-10 sm:grid-cols-[minmax(0,320px)_1fr] sm:gap-16">
        <Photo
          src={site.portrait.src}
          alt={site.portrait.alt}
          aspectClassName="aspect-[4/5]"
          className="sm:sticky sm:top-28"
        />

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-stone">
            About
          </p>
          <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
            {site.photographer}
          </h1>

          <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-ink/90 sm:text-lg">
            <p>
              I live in Colorado and spend most of my time above eleven
              thousand feet, usually before the sun is fully up. This work
              started as a way to justify the early mornings and has turned
              into most of what I care about photographing — elk, marmots,
              pikas, foxes, and the ground they all share.
            </p>
            <p>
              I don&rsquo;t bait, call, or push anything for a photograph.
              Almost everything here is the result of getting somewhere
              early, staying longer than seems reasonable, and letting an
              animal decide the distance. The landscapes follow the same
              rule — I go back to the same basins and ridgelines often
              enough to know what the light is going to do.
            </p>
            <p>I post more regularly, and less carefully, on Instagram.</p>
          </div>

          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-ink no-underline hover:text-accent"
          >
            <AtSign className="h-4 w-4" aria-hidden="true" />
            {site.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
