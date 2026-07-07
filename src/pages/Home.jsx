import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Photo from "@/components/Photo";
import { collections } from "@/data/collections";
import { site } from "@/data/site";

export default function Home() {
  return (
    <>
      <section className="relative -mt-16 h-[100svh] min-h-[560px] w-full sm:-mt-20">
        <Photo
          src={site.heroImage.src}
          alt={site.heroImage.alt}
          aspectClassName=""
          className="h-full"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/40"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 px-6 pb-16 sm:px-12 sm:pb-24">
          <h1 className="font-display text-4xl text-bone sm:text-6xl lg:text-7xl">
            {site.name}
          </h1>
          <p className="max-w-xl font-sans text-base text-bone/90 sm:text-lg">
            {site.tagline}
          </p>
          <Link
            to="/work"
            className="group inline-flex w-fit items-center gap-2 font-sans text-sm uppercase tracking-[0.2em] text-bone no-underline"
          >
            Enter the work
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-quiet)] group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-12">
        <div className="mb-10 flex items-end justify-between gap-6 sm:mb-14">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">
            Selected Work
          </h2>
          <Link
            to="/work"
            className="hidden items-center gap-2 font-sans text-sm uppercase tracking-[0.15em] text-stone no-underline hover:text-ink sm:inline-flex"
          >
            View all
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-3">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              to={`/work/${collection.slug}`}
              className="group block no-underline"
            >
              <Photo
                src={collection.cover.src}
                alt={collection.cover.alt}
                aspectClassName="aspect-[4/5]"
                className="transition-opacity duration-300 ease-[var(--ease-quiet)] group-hover:opacity-90"
              />
              <h3 className="mt-4 font-display text-xl text-ink">
                {collection.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-stone">
                {collection.standfirst}
              </p>
            </Link>
          ))}
        </div>

        <Link
          to="/work"
          className="mt-10 inline-flex items-center gap-2 font-sans text-sm uppercase tracking-[0.15em] text-stone no-underline hover:text-ink sm:hidden"
        >
          View all work
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>

      <section className="border-t border-bone-3 bg-bone-2/60 px-6 py-20 text-center sm:py-28">
        <p className="mx-auto max-w-2xl font-display text-xl italic text-ink sm:text-2xl">
          &ldquo;Most of it is patience &mdash; waiting for something above the
          treeline to look back.&rdquo;
        </p>
        <Link
          to="/about"
          className="mt-6 inline-flex items-center gap-2 font-sans text-sm uppercase tracking-[0.15em] text-stone no-underline hover:text-ink"
        >
          About the work
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
