import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center gap-6 px-6 py-32 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-stone">404</p>
      <h1 className="font-display text-4xl text-ink sm:text-5xl">
        Nothing up here.
      </h1>
      <p className="text-base text-stone">
        The page you&rsquo;re looking for doesn&rsquo;t exist, or has moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-ink no-underline hover:text-accent"
      >
        Back to home
      </Link>
    </section>
  );
}
