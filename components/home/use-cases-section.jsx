import ButtonLink from "../ui/button-link";
import SectionShell from "../ui/section-shell";
import InfoCard from "../ui/info-card";

const useCases = [
  {
    icon: "fa-solid fa-water",
    title: "In Situ Monitoring",
    description:
      "Basin-scale early warning, post-storm assessment, and long-term trend detection across rivers, lakes, and coastal waters."
  },
  {
    icon: "fa-solid fa-cloud-rain",
    title: "Stormwater & Wastewater",
    description:
      "Discharge compliance, process water QA, and real-time spill detection for industrial and municipal operators."
  },
  {
    icon: "fa-solid fa-flask",
    title: "Research & Laboratory",
    description:
      "Collect high-resolution sample data in controlled experiments using our AquaCell\u2122 adapter."
  }
];

export default function UseCasesSection() {
  return (
    <SectionShell
      id="use-cases"
      eyebrow="Use Cases"
      title="Where AquaMesh Performs Best"
      description="AquaMesh solutions power reliable sensing across field deployments, infrastructure monitoring, and research workflows."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {useCases.map((useCase) => (
          <InfoCard
            key={useCase.title}
            title={useCase.title}
            description={useCase.description}
            className="text-left"
            leading={
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-aquamesh-50 text-lg text-aquamesh-500">
                <i className={useCase.icon} />
              </span>
            }
          >
            <div className="h-px w-16 bg-aquamesh-300" />
          </InfoCard>
        ))}
      </div>

      {/* Case study highlight */}
      <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid lg:grid-cols-2">
          <img
            src="/images/scripps_lajolla.png"
            alt="Scripps Pier in La Jolla, San Diego"
            className="h-full w-full object-cover"
          />
          <div className="flex flex-col justify-center p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-aquamesh-500">
              Case Study
            </p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-aquamesh-700">
              Scripps Pier — San Diego, CA
            </h3>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Collaborating with UC San Diego&apos;s Scripps Institution of
              Oceanography to validate AquaSpectra in demanding coastal
              conditions — constant wave energy, biofouling pressure, and
              variable salinity.
            </p>
            <div className="mt-6">
              <ButtonLink
                href="/products/aquaspectra-probe/#case-study"
                variant="primary"
              >
                Read More
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
