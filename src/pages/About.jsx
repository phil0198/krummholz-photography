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
            {site.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-ink no-underline hover:text-accent"
          >
            {site.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
