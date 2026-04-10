"use client";

import { useState } from "react";
import TechnologySceneLoader from "./technology-3d/technology-scene-loader";
import {
  ACCENT_STYLES,
  ANNOTATION_COPY,
  OVERVIEW_HIGHLIGHT,
} from "./technology-3d/scene-annotation-copy";

const STAGES = [
  {
    label: "Surface",
    viewId: "sensors",
  },
  {
    label: "AquaLink Gateway",
    viewId: "gateway",
  },
  {
    label: "AquaView Cloud Platform",
    viewId: "cloud",
  },
];

function stageFromView(activeView) {
  if (activeView === null) return null;
  if (activeView === "gateway") return 1;
  if (activeView === "cloud") return 2;
  return 0;
}

const MOBILE_HIGHLIGHTS = ANNOTATION_COPY;

export default function TechnologyDemoSection() {
  const [activeView, setActiveView] = useState(null);
  const activeStage = stageFromView(activeView);
  const activeHighlight =
    ANNOTATION_COPY.find((item) => item.viewId === activeView) ??
    OVERVIEW_HIGHLIGHT;
  const activeAccent = ACCENT_STYLES[activeHighlight.accent];

  const handleStageSelect = (index) => {
    const nextView = STAGES[index].viewId;
    setActiveView(activeStage === index ? null : nextView);
  };

  const isOverview = activeView === null;

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
          From sensor to insight — AquaMesh connects field-deployed probes
          through a resilient mesh network to a real-time cloud analytics
          platform.
        </p>
      </div>

      <div className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div
            className="relative h-full overflow-hidden rounded-2xl border border-aquamesh-300/20 bg-[#dfe8e8] sm:rounded-3xl"
            style={{
              boxShadow:
                "0 38px 92px rgba(32,68,78,0.14), 0 8px 26px rgba(28,157,187,0.08)",
            }}
          >
            {!isOverview ? (
              <div className="pointer-events-none absolute left-0 top-0 z-10 px-4 py-4 sm:px-6">
                <button
                  type="button"
                  onClick={() => setActiveView(null)}
                  className="pointer-events-auto rounded-full border border-white/80 bg-white/88 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-aquamesh-700 shadow-[0_14px_30px_rgba(32,68,78,0.12)] backdrop-blur transition duration-200 hover:-translate-y-px hover:bg-white"
                  aria-label="Return to system overview"
                >
                  Home
                </button>
              </div>
            ) : null}

            {/* Canvas stage indicators */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden justify-end px-4 py-4 sm:px-6 lg:flex">
              <div className="pointer-events-auto flex items-center gap-2">
                {/* Overview pill indicator */}
                <button
                  type="button"
                  onClick={() => setActiveView(null)}
                  className="h-2.5 rounded-full transition-all duration-300"
                  style={{
                    width: isOverview ? "20px" : "10px",
                    background: isOverview
                      ? "#1c9dbb"
                      : "rgba(20,65,79,0.18)",
                    boxShadow: isOverview
                      ? "0 0 10px rgba(28,157,187,0.7)"
                      : "none",
                  }}
                  aria-label="Show system overview"
                  aria-pressed={isOverview}
                />
                <div className="mx-0.5 h-3 w-px bg-aquamesh-300/20" />
                {/* Stage dots */}
                {STAGES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleStageSelect(i)}
                    className="h-2.5 w-2.5 rounded-full transition-all duration-300"
                    style={{
                      background:
                        activeStage === i
                          ? "#1c9dbb"
                          : "rgba(20,65,79,0.18)",
                      transform:
                        activeStage === i ? "scale(1.4)" : "scale(1)",
                      boxShadow:
                        activeStage === i
                          ? "0 0 10px rgba(28,157,187,0.7)"
                          : "none",
                    }}
                    aria-label={`Show ${STAGES[i].label}`}
                    aria-pressed={activeStage === i}
                  />
                ))}
              </div>
            </div>

            <div className="h-[360px] w-full sm:h-[420px] lg:h-auto lg:aspect-[16/9] lg:min-h-[520px]">
              <TechnologySceneLoader
                activeStage={activeStage}
                activeView={activeView}
                onSelectView={setActiveView}
              />
            </div>

            <div className="border-t border-white/70 bg-white/80 px-4 py-4 backdrop-blur lg:hidden">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Explore the flow
              </p>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {MOBILE_HIGHLIGHTS.map((item) => {
                  const accent = ACCENT_STYLES[item.accent];
                  const isSelected = item.viewId === activeView;
                  const chipStyle = isSelected
                    ? {
                        borderColor: accent.border,
                        background: `linear-gradient(135deg, ${accent.soft} 0%, rgba(255,255,255,0.98) 100%)`,
                        boxShadow:
                          "inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 2px rgba(16,52,66,0.06)",
                        color: accent.title,
                      }
                    : undefined;
                  const dotStyle = isSelected
                    ? {
                        background: accent.dot,
                        boxShadow: `0 0 0 6px ${accent.glow}`,
                      }
                    : { background: accent.dot };

                  return (
                    <button
                      key={item.viewId ?? "overview"}
                      type="button"
                      onClick={() => setActiveView(item.viewId)}
                      aria-pressed={isSelected}
                      className="flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition duration-200"
                      style={chipStyle}
                    >
                      <span className="h-2.5 w-2.5 rounded-full" style={dotStyle} />
                      {item.mobileLabel}
                    </button>
                  );
                })}
              </div>

              <div
                className="mt-4 rounded-[1.4rem] border px-4 py-4 shadow-[0_22px_55px_rgba(28,61,80,0.10)]"
                style={{
                  borderColor: activeAccent.border,
                  background: `linear-gradient(135deg, ${activeAccent.soft} 0%, rgba(255,255,255,0.96) 100%)`,
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      background: activeAccent.dot,
                      boxShadow: `0 0 0 5px ${activeAccent.glow}`,
                    }}
                  />
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: activeAccent.body }}
                  >
                    {activeHighlight.eyebrow}
                  </p>
                </div>
                <h3
                  className="mt-3 text-lg font-semibold leading-tight"
                  style={{ color: activeAccent.title }}
                >
                  {activeHighlight.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-6"
                  style={{ color: activeAccent.body }}
                >
                  {activeHighlight.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
