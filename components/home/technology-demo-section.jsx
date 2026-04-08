"use client";

import { useState } from "react";
import TechnologySceneLoader from "./technology-3d/technology-scene-loader";

const STAGES = [
  {
    label: "AquaSpectra Sensor Nodes",
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

export default function TechnologyDemoSection() {
  const [activeView, setActiveView] = useState(null);
  const activeStage = stageFromView(activeView);

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
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-end px-4 py-4 sm:px-6">
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

            <div className="aspect-[16/9] min-h-[390px] w-full sm:min-h-[450px] lg:min-h-[520px]">
              <TechnologySceneLoader
                activeStage={activeStage}
                activeView={activeView}
                onSelectView={setActiveView}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
