"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const TechnologyScene = dynamic(() => import("./technology-scene"), {
  ssr: false,
  loading: () => <Skeleton />,
});

function Skeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#050f16]">
      <div className="h-8 w-8 animate-pulse rounded-full bg-aquamesh-500/30" />
    </div>
  );
}

function hasWebGL() {
  if (typeof window === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function TechnologySceneLoader({ scrollProgress = 0 }) {
  const [visible, setVisible] = useState(false);
  const [supported, setSupported] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    setSupported(hasWebGL());
  }, []);

  useEffect(() => {
    if (!supported) return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [supported]);

  if (!supported) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#050f16] text-aquamesh-300/60 text-sm">
        Interactive 3D visualization requires WebGL
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-full w-full">
      {visible ? <TechnologyScene scrollProgress={scrollProgress} /> : <Skeleton />}
    </div>
  );
}
