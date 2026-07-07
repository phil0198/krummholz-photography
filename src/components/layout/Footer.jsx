import { Link } from "react-router-dom";
import { AtSign, Mail } from "lucide-react";
import { navLinks, site } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-2 text-bone">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-3 lg:px-12">
        <div>
          <p className="font-display text-xl">{site.name}</p>
          <p className="mt-3 max-w-[32ch] text-sm text-smoke">{site.tagline}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="w-fit text-sm text-bone/80 no-underline hover:text-bone"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          <a
            href={`mailto:${site.email}`}
            className="flex w-fit items-center gap-2 text-sm text-bone/80 no-underline hover:text-bone"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {site.email}
          </a>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="flex w-fit items-center gap-2 text-sm text-bone/80 no-underline hover:text-bone"
          >
            <AtSign className="h-4 w-4" aria-hidden="true" />
            {site.instagramHandle}
          </a>
        </div>
      </div>

      <div className="border-t border-ink-3 px-6 py-6 text-center text-xs text-smoke lg:px-12">
        © {year} {site.photographer}. {site.location}.
      </div>
    </footer>
  );
}
