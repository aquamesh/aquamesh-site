import { cx } from "../../../lib/cx";
import ProbeSection from "./probe-section";
import ButtonLink from "../../ui/button-link";

export default function ProbeCaseStudy({ tone = "dark" }) {
  const isLight = tone === "light" || tone === "mist";

  return (
    <ProbeSection
      id="case-study"
      eyebrow="Case Study"
      title="Built for varied water conditions"
      intro="Freshwater, coastal, and industrial programs can use the same probe, with Scripps Pier serving as the current validation site."
      tone={tone}
      className="py-12 sm:py-14"
      containerClassName="max-w-4xl"
      headerClassName="mb-6 max-w-3xl"
      titleClassName="text-2xl sm:text-[2rem]"
      introClassName="text-sm leading-6 sm:text-base"
    >
      <div
        className={cx(
          "grid overflow-hidden rounded-2xl border shadow-[0_18px_48px_rgba(8,24,32,0.12)] lg:grid-cols-[240px_minmax(0,1fr)]",
          isLight
            ? "border-slate-200 bg-white"
            : "border-white/10 bg-white/5"
        )}
      >
        <div
          className={cx(
            "overflow-hidden",
            isLight ? "bg-slate-50/80" : "bg-white/5"
          )}
          data-aos="fade-up"
        >
          <img
            src="/images/scripps_lajolla.png"
            alt="Scripps Pier in La Jolla, San Diego"
            className="h-52 w-full object-cover lg:h-full"
          />
        </div>

        <div
          className="flex flex-col justify-center p-5 sm:p-6"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <p
            className={cx(
              "text-xs font-semibold uppercase tracking-[0.24em]",
              isLight ? "text-aquamesh-500" : "text-aquamesh-300"
            )}
          >
            Scripps Case Study
          </p>
          <h3
            className={cx(
              "mt-2 text-xl font-bold tracking-tight sm:text-2xl",
              isLight ? "text-slate-900" : "text-white"
            )}
          >
            Scripps Pier, San Diego
          </h3>
          <p
            className={cx(
              "mt-3 text-sm leading-6 sm:text-base",
              isLight ? "text-slate-600" : "text-slate-300"
            )}
          >
            AquaSpectra is being validated with UC San Diego&apos;s Scripps
            Institution of Oceanography in exposed marine conditions while
            staying relevant to freshwater, coastal, and industrial monitoring
            programs.
          </p>
          <div className="mt-6">
            <ButtonLink
              href="/case-studies/scripps-pier/"
              variant={isLight ? "primary" : "secondary"}
              size="sm"
            >
              Read Scripps Case Study
            </ButtonLink>
          </div>
        </div>
      </div>
    </ProbeSection>
  );
}
