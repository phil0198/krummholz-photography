import { Mail } from "lucide-react";
import { site } from "@/data/site";

export default function Contact() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16 text-center sm:py-24 lg:px-12">
      <p className="text-xs uppercase tracking-[0.2em] text-stone">Contact</p>
      <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
        Get in touch
      </h1>
      <p className="mt-6 text-base leading-relaxed text-stone sm:text-lg">
        For prints, licensing, or just to say hello — email is the most
        reliable way to reach me. I&rsquo;m also around on Instagram.
      </p>

      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <a
          href={`mailto:${site.email}`}
          className="flex flex-1 items-center justify-center gap-3 border border-bone-3 bg-bone-2/60 px-6 py-6 font-sans text-sm uppercase tracking-[0.15em] text-ink no-underline transition-colors hover:bg-bone-2"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          {site.email}
        </a>
        <a
          href={site.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center gap-3 border border-bone-3 bg-bone-2/60 px-6 py-6 font-sans text-sm uppercase tracking-[0.15em] text-ink no-underline transition-colors hover:bg-bone-2"
        >
          {site.instagramHandle}
        </a>
      </div>
    </section>
  );
}
