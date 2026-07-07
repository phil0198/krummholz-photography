import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-ink-3/60 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:h-20 lg:px-12">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="font-display text-lg tracking-wide text-bone no-underline"
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 sm:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-sans text-sm uppercase tracking-[0.15em] no-underline transition-colors ${
                  isActive ? "text-accent-soft" : "text-bone/80 hover:text-bone"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded p-1 text-bone sm:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {open && (
        <nav
          aria-label="Primary"
          className="flex flex-col gap-1 border-t border-ink-3/60 bg-ink px-6 pb-6 pt-2 sm:hidden"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `py-3 font-sans text-sm uppercase tracking-[0.15em] no-underline ${
                  isActive ? "text-accent-soft" : "text-bone/80"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
