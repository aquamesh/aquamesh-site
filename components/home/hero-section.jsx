"use client";

import { useCallback, useRef, useState } from "react";
import { siteAssets } from "../../lib/site-assets";
import ButtonLink from "../ui/button-link";
import SiteContainer from "../ui/site-container";

const FADE_DURATION = 1; // seconds — must match the CSS duration-1000

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const fadingOut = useRef(false);

  const handleTimeUpdate = useCallback((e) => {
    const v = e.currentTarget;
    if (v.duration && v.currentTime >= v.duration - FADE_DURATION && !fadingOut.current) {
      fadingOut.current = true;
      setVisible(false);
    }
  }, []);

  const handleSeeked = useCallback(() => {
    // The loop attribute seeks back to 0 — fade back in
    if (fadingOut.current) {
      fadingOut.current = false;
      setVisible(true);
    }
  }, []);

  return (
    <section id="home" className="relative isolate overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <video
          src={siteAssets.heroVideo}
          poster={siteAssets.heroLandscape}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          onPlaying={() => setVisible(true)}
          onTimeUpdate={handleTimeUpdate}
          onSeeked={handleSeeked}
          className={`h-full w-full object-cover transition-opacity duration-1000 ease-in ${visible ? "opacity-100" : "opacity-0"}`}
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,95,115,0.88),rgba(0,18,25,0.82))]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/50 to-transparent" />
      </div>
      <SiteContainer className="relative flex min-h-[calc(100vh-5rem)] items-center py-24 sm:py-32">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-aquamesh-300">
            IoT Water Quality Monitoring
          </p>
          <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Transforming Water Quality Monitoring
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100 sm:text-xl">
            Real-time water insight, resilient field sensing, and actionable data for teams
            managing critical water systems.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="#products" size="lg">
              Learn More
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary" size="lg">
              Talk to Us
            </ButtonLink>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
