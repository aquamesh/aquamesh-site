"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Tracks scroll progress through the "pinned" portion of a sticky-scroll section.
 * Returns 0 when the sticky element first pins, 1 when it unpins.
 * The scrollable distance = container height - viewport height.
 */
export default function useScrollProgress(containerRef) {
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const windowH = window.innerHeight;
    // How far the container top has scrolled past the viewport top
    const scrolled = -rect.top;
    // The total "pinned" scroll distance is container height minus one viewport
    const pinDistance = rect.height - windowH;
    if (pinDistance <= 0) {
      setProgress(0);
      return;
    }
    setProgress(Math.max(0, Math.min(1, scrolled / pinDistance)));
  }, [containerRef]);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  return progress;
}
