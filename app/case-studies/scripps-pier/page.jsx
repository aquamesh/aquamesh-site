import SitePageShell from "../../../components/site-page-shell";
import SectionShell from "../../../components/ui/section-shell";
import SiteContainer from "../../../components/ui/site-container";
import ButtonLink from "../../../components/ui/button-link";
import IconBadge from "../../../components/ui/icon-badge";
import { createPageMetadata } from "../../../lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Scripps Pier Case Study | AquaMesh",
  description:
    "See how AquaMesh is validating AquaSpectra and AquaLab with UC San Diego's Scripps Institution of Oceanography under real coastal deployment conditions.",
  path: "/case-studies/scripps-pier/",
  image: "/images/scripps_lajolla.png",
  imageAlt: "Scripps Pier coastal deployment site in La Jolla, San Diego",
  type: "article"
});

const highlights = [
  {
    title: "Dynamic coastal conditions",
    description:
      "Exposed coastal deployment with constant wave energy and variable salinity.",
    icon: "fa-solid fa-water"
  },
  {
    title: "Biofouling stress test",
    description:
      "High biofouling pressure for validating optical durability and cleaning systems.",
    icon: "fa-solid fa-shield-halved"
  },
  {
    title: "Operational proof point",
    description:
      "Real-world research setting for proving autonomous monitoring performance.",
    icon: "fa-solid fa-flask"
  }
];

const labGallery = [
  {
    src: "/images/use-cases/benchtop_in_lab.jpeg",
    alt: "Benchtop AquaSpectra setup in the lab",
    title: "Benchtop validation",
    description:
      "The benchtop system is being used in real-world validation work to refine calibration routines, confirm repeatability, and tighten confidence in optical performance."
  },
  {
    src: "/images/use-cases/lab_work_benchtop.jpeg",
    alt: "Researcher performing calibration work at the lab bench",
    title: "Calibration workflow",
    description:
      "Probe and benchtop instruments are being calibrated side by side so the field deployment starts from a stronger baseline ahead of the planned May 2026 installation."
  }
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
              alt="Scripps Pier coastal deployment site in La Jolla, San Diego"
              className="h-full w-full object-cover"
            />
          </div>
        </SiteContainer>
      </section>

      <SectionShell
        eyebrow="In The Lab"
        title="Real World Testing"
        description="The Scripps program is progressing on two fronts: the benchtop unit is already undergoing real-world validation, while the probe is being calibrated for a planned May 2026 deployment at the pier."
        align="left"
        className="bg-white"
        containerClassName="max-w-5xl"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {labGallery.map((image) => (
            <article
              key={image.src}
              className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_72px_rgba(15,23,42,0.08)]"
            >
              <div className="aspect-[4/3] bg-slate-100">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-3 p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                  {image.title}
                </h2>
                <p className="text-sm leading-6 text-slate-600 sm:text-base">
                  {image.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Why This Site"
        title="A strong proving ground for broader deployments"
        description="Scripps combines coastal exposure, research rigor, and operational complexity in one site, making it a useful proving ground as AquaMesh moves from calibration into sustained field validation."
        align="left"
        className="bg-white"
        containerClassName="max-w-5xl"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((highlight) => (
            <article
              key={highlight.title}
              className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <IconBadge
                  icon={highlight.icon}
                  className="h-11 w-11"
                  iconClassName="text-[15px]"
                />
                <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                  {highlight.title}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-700">
                {highlight.description}
              </p>
            </article>
          ))}
        </div>
      </SectionShell>
    </SitePageShell>
  );
}
