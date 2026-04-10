"use client";

import { useEffect } from "react";

export default function AosRuntime({
  delay = 0,
  duration = 800,
  easing = "ease-in-out-cubic",
  offset = 100,
  once = true
}) {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const elements = Array.from(document.querySelectorAll("[data-aos]"));
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    root.style.setProperty("--aos-duration", `${duration}ms`);
    root.style.setProperty("--aos-easing", easing);

    elements.forEach((element) => {
      const elementDelay = Number(element.getAttribute("data-aos-delay") || 0);
      element.style.transitionDelay = `${delay + elementDelay}ms`;
    });

    if (mediaQuery.matches) {
      elements.forEach((element) => {
        element.setAttribute("data-aos-in", "true");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            if (!once) {
              entry.target.removeAttribute("data-aos-in");
            }
            return;
          }

          entry.target.setAttribute("data-aos-in", "true");

          if (once) {
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: `0px 0px -${offset}px 0px`,
        threshold: 0.14
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [delay, duration, easing, offset, once]);

  return null;
}
