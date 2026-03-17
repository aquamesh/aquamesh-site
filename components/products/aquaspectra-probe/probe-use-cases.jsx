"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { cx } from "../../../lib/cx";
import ProbeSection from "./probe-section";
import { applicationSlides } from "./probe-page-data";

export default function ProbeUseCases() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = applicationSlides.length;

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
    <ProbeSection
      id="applications"
      eyebrow="Applications"
      title="Designed for programs where water conditions change faster than crews can react."
      intro="The strongest fits are the ones that reward autonomous monitoring and fast signal visibility."
      tone="light"
    >
      <div className="relative">
        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {applicationSlides.map((slide) => (
            <div
              key={slide.title}
              className="w-full flex-none snap-start"
            >
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                {/* Image */}
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={slide.image}
                    alt={slide.imageAlt}
                    className="h-64 w-full object-cover sm:h-80 lg:h-96"
                  />
                </div>
                {/* Text */}
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-aquamesh-700 sm:text-3xl">
                    {slide.title}
                  </h3>
                  <p className="mt-4 text-lg leading-8 text-slate-700">
                    {slide.copy}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrow buttons */}
        {activeIndex > 0 && (
          <button
            onClick={() => scrollTo(activeIndex - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition hover:bg-white"
            aria-label="Previous slide"
          >
            <i className="fa-solid fa-chevron-left text-aquamesh-700" />
          </button>
        )}
        {activeIndex < total - 1 && (
          <button
            onClick={() => scrollTo(activeIndex + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition hover:bg-white"
            aria-label="Next slide"
          >
            <i className="fa-solid fa-chevron-right text-aquamesh-700" />
          </button>
        )}

        {/* Dot indicators */}
        <div className="mt-6 flex justify-center gap-2">
          {applicationSlides.map((slide, i) => (
            <button
              key={slide.title}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cx(
                "h-2.5 w-2.5 rounded-full transition-colors",
                i === activeIndex
                  ? "bg-aquamesh-500"
                  : "bg-slate-300 hover:bg-slate-400"
              )}
            />
          ))}
        </div>
      </div>
    </ProbeSection>
  );
}
