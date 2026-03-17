"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { cx } from "../../../lib/cx";
import SectionShell from "../../ui/section-shell";
import { platformTourSlides } from "./platform-page-data";

export default function PlatformTour() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = platformTourSlides.length;

  const updateIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.offsetWidth);
    setActiveIndex(Math.min(idx, total - 1));
  }, [total]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateIndex, { passive: true });
    return () => el.removeEventListener("scroll", updateIndex);
  }, [updateIndex]);

  function scrollTo(index) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.offsetWidth, behavior: "smooth" });
  }

  return (
    <SectionShell
      id="product-tour"
      eyebrow="Product Tour"
      title="See what operators see every day."
      description="Walk through the core views that keep water-quality programs running — from live maps to AI-generated reports."
      className="bg-[linear-gradient(180deg,#f8fbfc_0%,#eef6f8_100%)]"
      containerClassName="max-w-6xl"
    >
      {/* Tab bar */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {platformTourSlides.map((slide, i) => (
          <button
            key={slide.tab}
            onClick={() => scrollTo(i)}
            className={cx(
              "rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors",
              i === activeIndex
                ? "bg-aquamesh-500 text-white shadow-md"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            )}
          >
            {slide.tab}
          </button>
        ))}
      </div>

      <div className="relative">
        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {platformTourSlides.map((slide) => (
            <div
              key={slide.tab}
              className="w-full flex-none snap-start px-1"
            >
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="mt-5 text-center">
                <h3 className="text-xl font-semibold tracking-tight text-aquamesh-700 sm:text-2xl">
                  {slide.title}
                </h3>
                <p className="mx-auto mt-2 max-w-2xl text-base leading-7 text-slate-600">
                  {slide.copy}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Arrow buttons */}
        {activeIndex > 0 && (
          <button
            onClick={() => scrollTo(activeIndex - 1)}
            className="absolute left-2 top-[35%] -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition hover:bg-white"
            aria-label="Previous slide"
          >
            <i className="fa-solid fa-chevron-left text-aquamesh-700" />
          </button>
        )}
        {activeIndex < total - 1 && (
          <button
            onClick={() => scrollTo(activeIndex + 1)}
            className="absolute right-2 top-[35%] -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition hover:bg-white"
            aria-label="Next slide"
          >
            <i className="fa-solid fa-chevron-right text-aquamesh-700" />
          </button>
        )}
      </div>
    </SectionShell>
  );
}
