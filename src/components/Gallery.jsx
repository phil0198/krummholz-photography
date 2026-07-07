import { useRef, useState } from "react";
import Photo from "@/components/Photo";
import Lightbox from "@/components/Lightbox";

// Cycle a few aspect ratios so the CSS-column layout reads as an
// organic, justified grid rather than a uniform tile wall.
const ASPECTS = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[5/4]"];

export default function Gallery({ images }) {
  const [openIndex, setOpenIndex] = useState(null);
  const triggerRefs = useRef([]);

  function handleClose() {
    const previousIndex = openIndex;
    setOpenIndex(null);
    requestAnimationFrame(() => triggerRefs.current[previousIndex]?.focus());
  }

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {images.map((image, i) => (
          <button
            key={image.id}
            ref={(el) => (triggerRefs.current[i] = el)}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="block w-full break-inside-avoid overflow-hidden text-left"
            aria-label={`Open full-screen view: ${image.caption ?? image.alt}`}
          >
            <Photo
              src={image.src}
              alt={image.alt}
              aspectClassName={ASPECTS[i % ASPECTS.length]}
              className="transition-opacity duration-300 ease-[var(--ease-quiet)] hover:opacity-90"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={images}
          index={openIndex}
          onClose={handleClose}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}
