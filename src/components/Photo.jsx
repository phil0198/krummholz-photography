import { useState } from "react";
import { ImageOff } from "lucide-react";

/**
 * Renders an image that fills its parent box (via absolute positioning +
 * an aspect-ratio class on the wrapper). If `src` fails to load — which
 * is expected until real photos are dropped into /public/photos, see
 * src/data/collections.js — it falls back to a labeled placeholder built
 * from `alt`, so every empty slot is still identifiable and accessible.
 */
export default function Photo({
  src,
  alt,
  aspectClassName = "aspect-[4/5]",
  fit = "cover",
  priority = false,
  className = "",
}) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={`relative w-full overflow-hidden bg-ink-2 ${aspectClassName} ${className}`}
    >
      {errored ? (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-ink-2 to-ink px-6 text-center"
        >
          <ImageOff className="h-5 w-5 text-smoke" aria-hidden="true" />
          <span className="max-w-[26ch] text-xs leading-snug text-smoke">
            {alt}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setErrored(true)}
          className={`absolute inset-0 h-full w-full ${
            fit === "contain" ? "object-contain" : "object-cover"
          }`}
        />
      )}
    </div>
  );
}
