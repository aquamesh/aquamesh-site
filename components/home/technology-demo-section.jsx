"use client";

import { useRef } from "react";
import TechnologySceneLoader from "./technology-3d/technology-scene-loader";
import useScrollProgress from "./technology-3d/use-scroll-progress";

const STAGES = [
  {
    label: "AquaSpectra Sensor Nodes",
    description:
      "Multi-parameter optical probes deployed across the water body, each measuring 20+ water-quality parameters in real time.",
    tags: ["20+ Parameters", "Optical Sensing", "Low Power"],
  },
  {
    label: "AquaLink Gateway",
    description:
      "Solar-powered LoRa hub aggregates sensor data and relays it to the cloud over cellular or satellite backhaul.",
    tags: ["LoRa Mesh", "Solar-Powered", "Self-Healing"],
  },
  {
    label: "AquaView Cloud Platform",
    description:
      "Live dashboards, AI-driven anomaly detection, and predictive analytics turn raw telemetry into actionable insight.",
    tags: ["Real-time Alerts", "AI Analytics", "Trend Detection"],
  },
];

function StageOverlay({ stage, opacity }) {
  if (opacity <= 0) return null;
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6 pb-8 text-center transition-none sm:pb-12"
      style={{ opacity }}
    >
      <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl drop-shadow-lg">
        {stage.label}
      </h3>
      <p className="mx-auto max-w-md text-sm leading-6 text-white/70 drop-shadow sm:text-base">
        {stage.description}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {stage.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-aquamesh-500/30 bg-aquamesh-900/60 px-3 py-1 text-xs font-semibold text-aquamesh-300 backdrop-blur-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TechnologyDemoSection() {
  const scrollRef = useRef(null);
  const progress = useScrollProgress(scrollRef);

  // Map progress to stage opacities with generous hold at first & last
  // Each stage occupies a region with a plateau (full opacity) and fade edges
  function stageOpacity(stageIndex) {
    // Stage centers spread across 0.15 to 0.85 (not 0 to 1)
    // This gives the first and last stage more visible time
    const pad = 0.15;
    const range = 1 - 2 * pad;
    const stageCount = STAGES.length;
    const center = pad + (stageIndex / (stageCount - 1)) * range;
    const halfWidth = range / (stageCount - 1) / 2;
    const fadeZone = 0.08; // how quickly it fades at the edges

    const dist = Math.abs(progress - center);
    if (dist <= halfWidth - fadeZone) return 1; // plateau
    if (dist >= halfWidth + fadeZone) return 0; // fully out
    return 1 - (dist - (halfWidth - fadeZone)) / (2 * fadeZone);
  }

  return (
    <section id="tech-combined" className="scroll-mt-24" ref={scrollRef}>
      {/* Header */}
      <div className="px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-aquamesh-500">
          Technology
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-aquamesh-700 sm:text-4xl">
          How It Works
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-700 sm:text-lg">
          From sensor to insight — AquaMesh connects field-deployed probes through a resilient mesh network to a real-time cloud analytics platform.
        </p>
      </div>

      {/* Scroll-driven area: tall container with sticky canvas */}
      <div className="relative" style={{ height: "350vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center px-2 sm:px-6">
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl sm:rounded-3xl border border-aquamesh-300/20 bg-[#050f16]
              h-[75vh] max-h-none
              sm:h-auto sm:aspect-[16/10] sm:max-h-[75vh]"
            style={{
              boxShadow:
                "0 40px 100px rgba(8,24,32,0.18), 0 8px 32px rgba(28,157,187,0.1)",
            }}
          >
            <TechnologySceneLoader scrollProgress={progress} />

            {/* Stage text overlays */}
            {STAGES.map((stage, i) => (
              <StageOverlay key={i} stage={stage} opacity={stageOpacity(i)} />
            ))}

            {/* Scroll progress indicator dots */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 sm:right-6">
              {STAGES.map((_, i) => (
                <div
                  key={i}
                  className="h-2 w-2 rounded-full transition-all duration-300"
                  style={{
                    background: stageOpacity(i) > 0.3 ? "#1c9dbb" : "rgba(148,210,189,0.25)",
                    transform: stageOpacity(i) > 0.3 ? "scale(1.4)" : "scale(1)",
                    boxShadow: stageOpacity(i) > 0.3 ? "0 0 8px rgba(28,157,187,0.6)" : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
