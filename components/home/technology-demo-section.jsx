import { cx } from "../../lib/cx";
import { siteAssets } from "../../lib/site-assets";
import SectionShell from "../ui/section-shell";

const cycleNodes = [
  {
    step: "01",
    stage: "Sense",
    icon: "fas fa-microscope",
    title: "Sensor Nodes",
    orbitClassName: "left-0 top-1/2 -translate-y-1/2",
    mobileTintClassName: "from-[#dff6fb] to-white",
    description:
      "Multi-parameter probes collect water-quality signals directly in the field."
  },
  {
    step: "02",
    stage: "Relay",
    icon: "fas fa-network-wired",
    title: "Mesh Network",
    orbitClassName: "left-1/2 top-0 -translate-x-1/2",
    mobileTintClassName: "from-[#e8f7f3] to-white",
    description:
      "LoRa links connect nearby assets into a resilient, self-healing network."
  },
  {
    step: "03",
    stage: "Surface",
    icon: "fas fa-cloud",
    title: "Cloud Platform",
    orbitClassName: "right-0 top-1/2 -translate-y-1/2",
    mobileTintClassName: "from-[#edf7fb] to-white",
    description:
      "The platform consolidates live telemetry, alerts, and deployment visibility."
  },
  {
    step: "04",
    stage: "Predict",
    icon: "fas fa-brain",
    title: "AI Analytics",
    orbitClassName: "bottom-0 left-1/2 -translate-x-1/2",
    mobileTintClassName: "from-[#e9f3f8] to-white",
    description:
      "Models turn telemetry into trend detection, anomaly flags, and next-step insight."
  }
];

const anchorDots = [
  { cx: 124, cy: 320 },
  { cx: 320, cy: 124 },
  { cx: 516, cy: 320 },
  { cx: 320, cy: 516 }
];

function CycleNode({ node, compact = false }) {
  return (
    <article
      className={cx(
        "rounded-[26px] border border-slate-200/80 bg-white shadow-[0_18px_45px_rgba(12,28,36,0.12)] transition-all duration-300 hover:scale-[1.03] hover:border-aquamesh-300/50 hover:shadow-[0_24px_55px_rgba(12,28,36,0.18)]",
        compact ? "p-5" : "absolute w-56 p-5",
        !compact ? node.orbitClassName : null
      )}
    >
      <div className="flex items-start gap-4">
        <span className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-aquamesh-500 text-xl text-white shadow-[0_10px_24px_rgba(28,157,187,0.28)]">
          <i className={node.icon} />
        </span>
        <div className="min-w-0">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-aquamesh-500">
            {node.stage}
          </p>
          <h3 className="mt-1 text-base font-semibold text-aquamesh-700">
            {node.title}
          </h3>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{node.description}</p>
    </article>
  );
}

function OrbitSvg() {
  return (
    <svg
      viewBox="0 0 640 640"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="orbit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(28,157,187,0.8)" />
          <stop offset="50%" stopColor="rgba(148,210,189,0.5)" />
          <stop offset="100%" stopColor="rgba(28,157,187,0.8)" />
        </linearGradient>
        <filter id="orbit-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Glow ring */}
      <circle
        cx="320" cy="320" r="196"
        fill="none"
        stroke="rgba(28,157,187,0.2)"
        strokeWidth="8"
        filter="url(#orbit-glow-filter)"
        className="orbit-animated"
        style={{ animation: "orbit-glow 3s ease-in-out infinite" }}
      />

      {/* Animated dashed ring */}
      <circle
        cx="320" cy="320" r="196"
        fill="none"
        stroke="rgba(148,210,189,0.18)"
        strokeWidth="1.5"
        strokeDasharray="8 14"
        className="orbit-animated"
        style={{ animation: "orbit-dash 3s linear infinite" }}
      />

      {/* Main orbit ring */}
      <circle
        cx="320" cy="320" r="196"
        fill="none"
        stroke="url(#orbit-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Hidden motion path for animateMotion */}
      <path
        id="orbit-motion-path"
        d="M 320 124 A 196 196 0 1 1 319.99 124"
        fill="none"
        stroke="none"
      />

      {/* Primary flowing dots */}
      <g className="orbit-flowing-dots">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={`dot-${i}`} r="3.5" fill="rgba(28,157,187,0.85)">
            <animateMotion
              dur="8s"
              repeatCount="indefinite"
              begin={`${(i * 1.33).toFixed(2)}s`}
            >
              <mpath href="#orbit-motion-path" />
            </animateMotion>
          </circle>
        ))}
      </g>

      {/* Secondary flowing dots (faster, subtler) */}
      <g className="orbit-flowing-dots">
        {[0, 1, 2, 3].map((i) => (
          <circle key={`dot-fast-${i}`} r="2" fill="rgba(148,210,189,0.55)">
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              begin={`${(i * 1.5).toFixed(2)}s`}
            >
              <mpath href="#orbit-motion-path" />
            </animateMotion>
          </circle>
        ))}
      </g>

      {/* Connection anchor dots at cardinal points */}
      {anchorDots.map((pos, i) => (
        <circle
          key={`anchor-${i}`}
          cx={pos.cx}
          cy={pos.cy}
          r="6"
          fill="rgba(28,157,187,0.9)"
          stroke="white"
          strokeWidth="2.5"
        />
      ))}
    </svg>
  );
}

export default function TechnologyDemoSection() {
  return (
    <SectionShell
      id="tech-combined"
      eyebrow="Technology"
      title="How It Works"
      description="AquaMesh links remote sensing hardware, a resilient mesh network, and cloud intelligence into one continuous telemetry loop."
      className="bg-[linear-gradient(180deg,#fbfdff_0%,#f2f8fa_100%)]"
      containerClassName="max-w-6xl"
    >
      <div
        className="relative overflow-hidden rounded-[36px] border border-[rgba(191,210,219,0.7)] bg-white p-6 shadow-[0_28px_80px_rgba(8,24,32,0.08)] sm:p-8 lg:p-10"
        data-aos="fade-up"
      >
        {/* Logo background — fills entire card */}
        <img
          src={siteAssets.logoMarkBranded}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-30"
        />

        {/* ── Mobile layout ── */}
        <div className="relative mx-auto max-w-xl space-y-4 lg:hidden">
          {cycleNodes.map((node, index) => (
            <div key={node.step}>
              <article
                className={cx(
                  "rounded-[26px] border border-slate-200/80 bg-white/85 p-5 shadow-[0_16px_38px_rgba(12,28,36,0.07)] backdrop-blur-sm"
                )}
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-aquamesh-500 text-xl text-white">
                    <i className={node.icon} />
                  </span>
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-aquamesh-500">
                      {node.stage}
                    </p>
                    <h4 className="mt-1 text-lg font-semibold text-aquamesh-700">
                      {node.title}
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {node.description}
                    </p>
                  </div>
                </div>
              </article>
              {index < cycleNodes.length - 1 ? (
                <div className="flex justify-center py-3 text-aquamesh-500/70">
                  <i className="fas fa-arrow-down text-sm" />
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {/* ── Desktop orbit layout ── */}
        <div className="relative mx-auto hidden min-h-[38rem] w-full max-w-[42rem] lg:block">
          {/* Outer decorative ring — slow rotation */}
          <div
            className="orbit-animated absolute inset-[11%] rounded-full border border-aquamesh-300/20"
            style={{ animation: "orbit-rotate 45s linear infinite" }}
          >
            <div className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-aquamesh-500/30" />
            <div className="absolute right-0 top-1/2 h-px w-2 -translate-y-1/2 bg-aquamesh-500/30" />
            <div className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 bg-aquamesh-500/30" />
            <div className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-aquamesh-500/30" />
          </div>

          {/* Pulsing glow ring */}
          <div
            className="orbit-animated absolute inset-[16%] rounded-full bg-[radial-gradient(circle,rgba(28,157,187,0.06),transparent_70%)]"
            style={{ animation: "orbit-pulse 4s ease-in-out infinite" }}
          />

          {/* Inner decorative ring — slow reverse rotation */}
          <div
            className="orbit-animated absolute inset-[22%] rounded-full border border-aquamesh-500/10"
            style={{ animation: "orbit-rotate-reverse 55s linear infinite" }}
          />

          <OrbitSvg />

          {cycleNodes.map((node) => (
            <CycleNode key={node.step} node={node} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
