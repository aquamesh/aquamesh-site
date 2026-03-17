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
    let cancelled = false;
    let retryId = null;

    function initialize() {
      if (cancelled || typeof window === "undefined") {
        return;
      }

      if (typeof window.AOS?.init !== "function") {
        retryId = window.setTimeout(initialize, 50);
        return;
      }

      window.AOS.init({
        delay,
        duration,
        easing,
        offset,
        once
      });
      window.AOS.refresh?.();
    }

    initialize();

    return () => {
      cancelled = true;
      if (retryId) {
        window.clearTimeout(retryId);
      }
    };
  }, [delay, duration, easing, offset, once]);

  return null;
}
