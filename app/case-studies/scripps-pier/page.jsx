import SitePageShell from "../../../components/site-page-shell";
import SectionShell from "../../../components/ui/section-shell";
import SiteContainer from "../../../components/ui/site-container";
import ButtonLink from "../../../components/ui/button-link";

export const metadata = {
  title: "Scripps Pier Case Study | AquaMesh"
};

const highlights = [
  "Exposed coastal deployment with constant wave energy and variable salinity.",
  "High biofouling pressure for validating optical durability and cleaning systems.",
  "Real-world research setting for proving autonomous monitoring performance."
];

export default function ScrippsPierCaseStudyPage() {
  return (
    <SitePageShell route="">
      <section className="bg-[linear-gradient(180deg,#091218_0%,#121d24_100%)] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8">
        <SiteContainer padded={false} className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-aquamesh-300">
              Case Study
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Scripps Pier, San Diego
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              AquaMesh is validating AquaSpectra with UC San Diego&apos;s Scripps
              Institution of Oceanography at Scripps Pier, using a demanding
              marine site to prove durability, anti-fouling performance, and
              optical reliability in real deployment conditions.
            </p>
            <div className="mt-8">
              <ButtonLink href="/products/aquaspectra-probe/#case-study" variant="secondary">
                Back To Probe
              </ButtonLink>
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_24px_72px_rgba(0,0,0,0.24)]">
            <img
              src="/images/scripps_lajolla.png"
              alt="Scripps Pier in La Jolla, San Diego"
              className="h-full w-full object-cover"
            />
          </div>
        </SiteContainer>
      </section>

      <SectionShell
        eyebrow="Why This Site"
        title="A strong proving ground for broader deployments"
        description="The same probe architecture used here is intended for freshwater, coastal, and industrial monitoring programs where autonomous visibility matters."
        align="left"
        className="bg-white"
        containerClassName="max-w-5xl"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((highlight) => (
            <article
              key={highlight}
              className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 shadow-sm"
            >
              <p className="text-sm leading-6 text-slate-700">{highlight}</p>
            </article>
          ))}
        </div>
      </SectionShell>
    </SitePageShell>
  );
}
