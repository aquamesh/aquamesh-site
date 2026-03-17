import { cx } from "../../../lib/cx";
import ProbeSection from "./probe-section";
import ButtonLink from "../../ui/button-link";

export default function ProbeCaseStudy({ tone = "dark" }) {
  const isLight = tone === "light" || tone === "mist";

  return (
    <ProbeSection
      id="case-study"
      eyebrow="Case Study"
      title="Proving the Sensor Where It Counts"
      intro="We're partnering with leading research institutions to validate AquaSpectra in some of the most demanding marine environments on the West Coast."
      tone={tone}
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        {/* Image side */}
        <div
          className={cx(
            "overflow-hidden rounded-2xl border",
            isLight
              ? "border-slate-200 bg-slate-50/80"
              : "border-white/10 bg-white/5"
          )}
          data-aos="fade-up"
        >
          <img
            src="/images/scripps_lajolla.png"
            alt="Scripps Pier in La Jolla, San Diego"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content side */}
        <div data-aos="fade-up" data-aos-delay="100">
          <h3
            className={cx(
              "text-2xl font-bold tracking-tight sm:text-3xl",
              isLight ? "text-slate-900" : "text-white"
            )}
          >
            Scripps Pier — San Diego, CA
          </h3>
          <p
            className={cx(
              "mt-4 text-lg leading-8",
              isLight ? "text-slate-600" : "text-slate-300"
            )}
          >
            AquaMesh is collaborating with UC San Diego&apos;s Scripps
            Institution of Oceanography to test AquaSpectra at Scripps Pier,
            one of the longest-running ocean observation sites in the world.
            The pier&apos;s exposed coastal conditions — constant wave energy,
            biofouling pressure, and variable salinity — make it an ideal
            proving ground for validating sensor durability and optical
            accuracy in a demanding marine environment.
          </p>
          <div className="mt-8">
            <ButtonLink
              href="#"
              variant={isLight ? "primary" : "secondary"}
            >
              Read Full Case Study
            </ButtonLink>
          </div>
        </div>
      </div>
    </ProbeSection>
  );
}
