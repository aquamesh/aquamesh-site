import SectionShell from "../ui/section-shell";

const PROBE_COUNT = 5;

export default function TechnologyDemoSection() {
  return (
    <SectionShell
      id="tech-combined"
      eyebrow="Technology"
      title="How It Works"
      description="From sensor to insight — AquaMesh connects field-deployed probes through a resilient mesh network to a real-time cloud analytics platform."
      className="bg-[linear-gradient(180deg,#fbfdff_0%,#f2f8fa_100%)]"
      containerClassName="max-w-5xl"
    >
      {/* Perspective wrapper */}
      <div style={{ perspective: "1200px" }}>
        <div
          className="relative mx-auto max-w-3xl overflow-hidden rounded-[36px] border border-[rgba(191,210,219,0.5)] bg-gradient-to-b from-[#f0f7fa] via-white to-[#e8f1f5] px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20"
          style={{
            transform: "rotateX(3deg)",
            transformOrigin: "center top",
            boxShadow:
              "0 40px 100px rgba(8,24,32,0.12), 0 8px 32px rgba(28,157,187,0.08), inset 0 1px 0 rgba(255,255,255,0.9)"
          }}
          data-aos="fade-up"
        >
          {/* Subtle grid pattern for depth */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(28,61,80,1) 1px, transparent 1px), linear-gradient(90deg, rgba(28,61,80,1) 1px, transparent 1px)",
              backgroundSize: "48px 48px"
            }}
          />

          {/* ─── Cloud / AI Tier ─── */}
          <div className="relative text-center">
            {/* Glow behind icon */}
            <div className="absolute left-1/2 top-0 h-28 w-28 -translate-x-1/2 rounded-full bg-aquamesh-500/10 blur-2xl" />
            <div
              className="relative mx-auto flex h-22 w-22 items-center justify-center rounded-3xl text-4xl text-white"
              style={{
                background: "linear-gradient(145deg, #22a8c4 0%, #15829b 50%, #0f6b82 100%)",
                boxShadow:
                  "0 16px 40px rgba(28,157,187,0.4), 0 4px 12px rgba(0,18,25,0.2), inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.15)"
              }}
            >
              <i className="fas fa-cloud" />
            </div>
            <h3 className="mt-5 text-xl font-semibold tracking-tight text-aquamesh-700 sm:text-2xl">
              AquaView Cloud Platform
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
              Live dashboards, AI-driven anomaly detection, and predictive analytics turn raw telemetry into actionable insight — accessible from anywhere.
            </p>
            <div className="mx-auto mt-4 flex flex-wrap justify-center gap-2">
              {["Real-time Alerts", "AI Analytics", "Trend Detection"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-aquamesh-500/15 bg-white px-3 py-1 text-xs font-semibold text-aquamesh-500"
                  style={{ boxShadow: "0 2px 8px rgba(28,157,187,0.1)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ─── Line: Cloud → Gateway ─── */}
          <div className="flex justify-center py-4">
            <svg viewBox="0 0 40 100" aria-hidden="true" className="h-20 w-10 sm:h-24">
              <defs>
                <linearGradient id="flow-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1c9dbb" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#94d2bd" stopOpacity="0.6" />
                </linearGradient>
                <filter id="line-glow">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                </filter>
              </defs>
              {/* Glow line behind */}
              <line
                x1="20" y1="0" x2="20" y2="100"
                stroke="#1c9dbb" strokeWidth="6" opacity="0.08"
                filter="url(#line-glow)"
              />
              <line
                x1="20" y1="0" x2="20" y2="100"
                stroke="url(#flow-grad)"
                strokeWidth="2"
                strokeDasharray="6 8"
                className="dataflow-animated"
                style={{ animation: "dataflow-dash 1.5s linear infinite" }}
              />
              <path id="flow-down-1" d="M20 0 L20 100" fill="none" stroke="none" />
              <g className="dataflow-dots">
                {[0, 1, 2].map((i) => (
                  <circle key={i} r="2.5" fill="#1c9dbb" opacity="0.75">
                    <animateMotion dur="2s" repeatCount="indefinite" begin={`${(i * 0.66).toFixed(2)}s`}>
                      <mpath href="#flow-down-1" />
                    </animateMotion>
                  </circle>
                ))}
              </g>
            </svg>
          </div>

          {/* ─── Gateway / Hub Tier ─── */}
          <div className="relative text-center">
            {/* Glow behind icon */}
            <div className="absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 rounded-full bg-aquamesh-300/12 blur-xl" />
            <div
              className="relative mx-auto flex h-18 w-18 items-center justify-center rounded-2xl text-2xl text-aquamesh-500"
              style={{
                background: "linear-gradient(145deg, #f8fcfd 0%, #e4f2f6 50%, #d4eaef 100%)",
                border: "2px solid rgba(148,210,189,0.5)",
                boxShadow:
                  "0 12px 32px rgba(28,157,187,0.18), 0 4px 10px rgba(0,18,25,0.1), inset 0 1px 1px rgba(255,255,255,0.8), inset 0 -1px 3px rgba(28,157,187,0.08)"
              }}
            >
              <i className="fas fa-tower-broadcast" />
            </div>
            <h3 className="mt-4 text-lg font-semibold tracking-tight text-aquamesh-700 sm:text-xl">
              AquaLink Gateway
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">
              Solar-powered LoRa hub aggregates sensor data and relays it to the cloud over cellular or satellite backhaul.
            </p>
            <div className="mx-auto mt-4 flex flex-wrap justify-center gap-2">
              {["LoRa Mesh", "Solar-Powered", "Self-Healing"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-aquamesh-500/15 bg-white px-3 py-1 text-xs font-semibold text-aquamesh-500"
                  style={{ boxShadow: "0 2px 8px rgba(28,157,187,0.1)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ─── Lines: Gateway → Probes (fan-out) ─── */}
          <div className="flex justify-center py-4">
            <svg
              viewBox="0 0 400 100"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
              className="h-20 w-full max-w-md sm:h-24"
            >
              <defs>
                <linearGradient id="fan-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1c9dbb" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#94d2bd" stopOpacity="0.6" />
                </linearGradient>
                <filter id="fan-glow">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
                </filter>
              </defs>
              {Array.from({ length: PROBE_COUNT }).map((_, i) => {
                const x = (i / (PROBE_COUNT - 1)) * 320 + 40;
                const pathId = `fan-path-${i}`;
                const d = x === 200
                  ? "M200 0 L200 100"
                  : `M200 0 Q${200 + (x - 200) * 0.3} 50 ${x} 100`;
                return (
                  <g key={i}>
                    {/* Glow behind each line */}
                    <path
                      d={d} fill="none"
                      stroke="#1c9dbb" strokeWidth="5" opacity="0.06"
                      filter="url(#fan-glow)"
                    />
                    <path
                      id={pathId}
                      d={d}
                      fill="none"
                      stroke="url(#fan-grad)"
                      strokeWidth="1.5"
                      strokeDasharray="5 7"
                      className="dataflow-animated"
                      style={{ animation: "dataflow-dash 1.5s linear infinite" }}
                    />
                    <g className="dataflow-dots">
                      {[0, 1].map((j) => (
                        <circle key={j} r="2" fill="#1c9dbb" opacity="0.65">
                          <animateMotion
                            dur="2.2s"
                            repeatCount="indefinite"
                            begin={`${(j * 1.1 + i * 0.15).toFixed(2)}s`}
                          >
                            <mpath href={`#${pathId}`} />
                          </animateMotion>
                        </circle>
                      ))}
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* ─── Sensor Probes Tier ─── */}
          <div className="relative text-center">
            <div className="mx-auto flex max-w-md justify-center gap-3 sm:gap-5">
              {Array.from({ length: PROBE_COUNT }).map((_, i) => (
                <div
                  key={i}
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-base text-aquamesh-300 sm:h-14 sm:w-14 sm:rounded-2xl sm:text-lg"
                  style={{
                    background: "linear-gradient(145deg, #243f4d 0%, #1c3d50 50%, #142e3c 100%)",
                    boxShadow:
                      "0 10px 24px rgba(0,18,25,0.35), 0 3px 8px rgba(0,0,0,0.2), inset 0 1px 1px rgba(148,210,189,0.15), inset 0 -1px 3px rgba(0,0,0,0.2)"
                  }}
                >
                  <i className="fas fa-water" />
                </div>
              ))}
            </div>
            <h3 className="mt-5 text-lg font-semibold tracking-tight text-aquamesh-700 sm:text-xl">
              AquaSpectra Sensor Nodes
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">
              Multi-parameter optical probes deployed across the water body, each measuring 20+ water-quality parameters in real time.
            </p>
            <div className="mx-auto mt-4 flex flex-wrap justify-center gap-2">
              {["20+ Parameters", "Optical Sensing", "Low Power"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-aquamesh-500/15 bg-white px-3 py-1 text-xs font-semibold text-aquamesh-500"
                  style={{ boxShadow: "0 2px 8px rgba(28,157,187,0.1)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom shadow/reflection for depth */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
            style={{
              background: "linear-gradient(to top, rgba(200,220,228,0.3), transparent)"
            }}
          />
        </div>
      </div>
    </SectionShell>
  );
}
