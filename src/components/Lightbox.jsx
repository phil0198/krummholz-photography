import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ImageOff, X } from "lucide-react";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

/**
 * Full-screen image viewer. Controlled: the parent owns `index` and
 * responds to `onNavigate`/`onClose`. Supports Escape to close and
 * Left/Right arrow keys to move between images.
 */
export default function Lightbox({ images, index, onClose, onNavigate }) {
  const closeButtonRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const image = images[index];

  useLockBodyScroll();

  useEffect(() => {
    closeButtonRef.current?.focus();
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") {
        onNavigate((index + 1) % images.length);
      }
      if (event.key === "ArrowLeft") {
        onNavigate((index - 1 + images.length) % images.length);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, images.length, onClose, onNavigate]);

  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${images.length}`}
      onClick={onClose}
      className={`fixed inset-0 z-50 flex flex-col bg-ink/95 backdrop-blur-sm transition-opacity duration-300 ease-[var(--ease-quiet)] ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8">
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-smoke">
          {index + 1} / {images.length}
        </span>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="rounded-full p-2 text-bone transition-colors hover:bg-ink-2"
          aria-label="Close image viewer"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-4 pb-4"
        onClick={(event) => event.stopPropagation()}
      >
        {images.length > 1 && (
          <button
            type="button"
            onClick={() => onNavigate((index - 1 + images.length) % images.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-bone/80 transition-colors hover:bg-ink-2 hover:text-bone sm:left-4"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-7 w-7" aria-hidden="true" />
          </button>
        )}

        <LightboxImage image={image} />

        {images.length > 1 && (
          <button
            type="button"
            onClick={() => onNavigate((index + 1) % images.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-bone/80 transition-colors hover:bg-ink-2 hover:text-bone sm:right-4"
            aria-label="Next image"
          >
            <ChevronRight className="h-7 w-7" aria-hidden="true" />
          </button>
        )}
      </div>

      {image.caption && (
        <p className="px-6 pb-6 text-center font-sans text-sm text-smoke sm:pb-8">
          {image.caption}
        </p>
      )}
    </div>
  );
}

function LightboxImage({ image }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        role="img"
        aria-label={image.alt}
        className="flex max-h-[75vh] w-full max-w-2xl flex-col items-center justify-center gap-4 bg-ink-2 px-8 py-24 text-center"
      >
        <ImageOff className="h-6 w-6 text-smoke" aria-hidden="true" />
        <span className="max-w-[32ch] text-sm text-smoke">{image.alt}</span>
      </div>
    );
  }

  return (
    <img
      src={image.src}
      alt={image.alt}
      className="max-h-[75vh] w-auto max-w-full object-contain"
      onError={() => setErrored(true)}
    />
  );
}
