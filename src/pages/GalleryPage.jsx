import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Gallery from "@/components/Gallery";
import { getCollection } from "@/data/collections";

export default function GalleryPage() {
  const { slug } = useParams();
  const collection = getCollection(slug);

  if (!collection) {
    return <Navigate to="/work" replace />;
  }

  return (
    <>
      <header className="mx-auto max-w-3xl px-6 pt-16 pb-10 sm:pt-24 sm:pb-14 lg:px-12">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone no-underline hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          All Work
        </Link>
        <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">
          {collection.title}
        </h1>
        <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-stone sm:text-lg">
          {collection.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32 lg:px-12">
        <Gallery images={collection.images} />
      </section>
    </>
  );
}
