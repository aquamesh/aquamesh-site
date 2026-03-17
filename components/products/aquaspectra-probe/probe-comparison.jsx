import ProbeSection from "./probe-section";
import { comparisonPoints } from "./probe-page-data";

function ComparisonCard({ heading, points, variant }) {
  const isSpec = variant === "spectrometer";
  return (
    <div
      className={
        isSpec
          ? "rounded-[28px] border border-aquamesh-200 bg-[linear-gradient(135deg,rgba(102,211,240,0.06),rgba(255,255,255,0.98))] p-6 shadow-sm"
          : "rounded-[28px] border border-slate-200 bg-white/80 p-6 shadow-sm"
      }
      data-aos="fade-up"
      data-aos-delay={isSpec ? 0 : 80}
    >
      <p
        className={
          isSpec
            ? "text-xs font-semibold uppercase tracking-[0.24em] text-aquamesh-500"
            : "text-xs font-semibold uppercase tracking-[0.24em] text-slate-400"
        }
      >
        {heading}
      </p>
      <ul className="mt-5 space-y-4">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
            <span
              className={
                isSpec
                  ? "mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-aquamesh-50 text-aquamesh-500"
                  : "mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-slate-100 text-slate-400"
              }
            >
              <i className={isSpec ? "fa-solid fa-check text-[10px]" : "fa-solid fa-xmark text-[10px]"}></i>
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProbeComparison() {
  return (
    <ProbeSection
      id="technology"
      eyebrow="Technology"
      title="Spectrometer vs. discrete photodiodes."
      intro="Why a miniaturized spectrometer captures what fixed-wavelength sensors miss."
      tone="light"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <ComparisonCard
          heading="Spectrometer (AquaSpectra)"
          points={comparisonPoints.spectrometer}
          variant="spectrometer"
        />
        <ComparisonCard
          heading="Discrete Photodiodes (Competitors)"
          points={comparisonPoints.photodiodes}
          variant="photodiodes"
        />
      </div>
    </ProbeSection>
  );
}
