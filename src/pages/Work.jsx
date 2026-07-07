import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Photo from "@/components/Photo";
import { collections } from "@/data/collections";

export default function Work() {
  return (
    <>
      <header className="mx-auto max-w-3xl px-6 pt-16 pb-12 text-center sm:pt-24 sm:pb-16 lg:px-12">
        <p className="text-xs uppercase tracking-[0.2em] text-stone">
          Portfolio
        </p>
        <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
          Above the Treeline
        </h1>
        <p className="mt-6 text-base leading-relaxed text-stone sm:text-lg">
          A body of work built from time spent above eleven thousand feet —
          the animals that live there, the ground they live on, and the
          light that only happens at that altitude.
        </p>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-24 sm:pb-32 lg:px-12">
        <div className="flex flex-col gap-20 sm:gap-28">
          {collections.map((collection, i) => (
            <Link
              key={collection.slug}
              to={`/work/${collection.slug}`}
              className="group grid items-center gap-6 no-underline sm:grid-cols-2 sm:gap-10 lg:gap-16"
            >
              <div className={i % 2 === 1 ? "sm:order-2" : ""}>
                <Photo
                  src={collection.cover.src}
                  alt={collection.cover.alt}
                  aspectClassName="aspect-[4/5] sm:aspect-[3/4]"
                  className="transition-opacity duration-300 ease-[var(--ease-quiet)] group-hover:opacity-90"
                />
              </div>
              <div className={i % 2 === 1 ? "sm:order-1" : ""}>
                <span className="text-xs uppercase tracking-[0.2em] text-stone">
                  Collection {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
                  {collection.title}
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-stone">
                  {collection.standfirst}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-ink">
                  View gallery
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-quiet)] group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
