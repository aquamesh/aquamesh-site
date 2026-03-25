"use client";

import { useState } from "react";
import Link from "next/link";
import TechnologySceneLoader from "./technology-3d/technology-scene-loader";

const STAGES = [
  {
    label: "AquaSpectra Sensor Nodes",
    description:
      "Multi-parameter optical probes deployed across the water body, each measuring 20+ water-quality parameters in real time.",
    tags: ["20+ Parameters", "Optical Sensing", "Low Power"],
    href: "/products/aquaspectra-probe",
  },
  {
    label: "AquaLink Gateway",
    description:
      "Solar-powered LoRa hub aggregates sensor data and relays it to the cloud over cellular or satellite backhaul.",
    tags: ["LoRa Mesh", "Solar-Powered", "Self-Healing"],
    href: "/products/aqualink-hub",
  },
  {
    label: "AquaView Cloud Platform",
    description:
      "Live dashboards, AI-driven anomaly detection, and predictive analytics turn raw telemetry into actionable insight.",
    tags: ["Real-time Alerts", "AI Analytics", "Trend Detection"],
    href: "/products/aquaview-platform",
  },
];

function StageTile({ stage, index, isActive, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      className={`group rounded-2xl border p-5 text-left transition-all duration-300 ${
        isActive
          ? "border-aquamesh-500/60 bg-aquamesh-700 text-aquamesh-50 shadow-[0_16px_40px_rgba(8,24,32,0.22)]"
          : "border-aquamesh-200/80 bg-white/80 text-slate-900 hover:border-aquamesh-300 hover:bg-white"
      }`}
      aria-pressed={isActive}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div
            className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
              isActive
                ? "bg-aquamesh-500 text-white"
                : "bg-aquamesh-100 text-aquamesh-700"
            }`}
          >
            {index + 1}
          </div>
          <h3
            className={`text-lg font-semibold tracking-tight ${
              isActive ? "text-aquamesh-50" : "text-aquamesh-800"
            }`}
          >
            {stage.label}
          </h3>
        </div>
        <div
          className={`mt-1 h-3 w-3 shrink-0 rounded-full transition-all ${
            isActive
              ? "bg-aquamesh-400 shadow-[0_0_14px_rgba(28,157,187,0.75)]"
              : "bg-slate-300 group-hover:bg-aquamesh-300"
          }`}
        />
      </div>
      <p
        className={`mt-3 text-sm leading-6 ${
          isActive ? "text-aquamesh-100/90" : "text-slate-600"
        }`}
      >
        {stage.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {stage.tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
              isActive
                ? "border-aquamesh-300/30 bg-aquamesh-500/20 text-aquamesh-100"
                : "border-aquamesh-200 bg-aquamesh-50 text-aquamesh-700"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
      <Link
        href={stage.href}
        onClick={(e) => e.stopPropagation()}
        className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
          isActive
            ? "text-aquamesh-200 hover:text-white"
            : "text-aquamesh-600 hover:text-aquamesh-800"
        }`}
      >
        Learn more
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </button>
  );
}

export default function TechnologyDemoSection() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="tech-combined" className="scroll-mt-24">
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

      <div className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.9fr)] lg:items-stretch">
          <div
            className="relative h-full overflow-hidden rounded-2xl border border-aquamesh-300/20 bg-[#050f16] sm:rounded-3xl"
            style={{
              boxShadow:
                "0 40px 100px rgba(8,24,32,0.18), 0 8px 32px rgba(28,157,187,0.1)",
            }}
          >
            <div className="absolute inset-x-0 top-0 z-10 flex justify-end px-4 py-4 sm:px-6">
              <div className="flex gap-2">
                {STAGES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveStage(i)}
                    className="h-2.5 w-2.5 rounded-full transition-all duration-300"
                    style={{
                      background: activeStage === i ? "#1c9dbb" : "rgba(148,210,189,0.25)",
                      transform: activeStage === i ? "scale(1.4)" : "scale(1)",
                      boxShadow:
                        activeStage === i ? "0 0 10px rgba(28,157,187,0.7)" : "none",
                    }}
                    aria-label={`Show ${STAGES[i].label}`}
                    aria-pressed={activeStage === i}
                  />
                ))}
              </div>
            </div>

            <div className="aspect-[16/11] min-h-[420px] w-full sm:min-h-[520px] lg:h-full lg:min-h-0 lg:aspect-auto">
              <TechnologySceneLoader activeStage={activeStage} />
            </div>
          </div>

          <div className="grid gap-4 lg:auto-rows-fr">
            {STAGES.map((stage, index) => (
              <StageTile
                key={stage.label}
                stage={stage}
                index={index}
                isActive={activeStage === index}
                onSelect={setActiveStage}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
