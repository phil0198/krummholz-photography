import { useEffect } from "react";

// Locks page scroll while a component (e.g. the lightbox) is mounted.
export function useLockBodyScroll() {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);
}
