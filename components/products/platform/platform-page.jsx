import Script from "next/script";
import AosRuntime from "../../runtime/aos-runtime";
import SitePageShell from "../../site-page-shell";
import FeatureChecklist from "../../ui/feature-checklist";
import InfoCard from "../../ui/info-card";
import SectionShell from "../../ui/section-shell";
import ProductCrossSell from "../shared/product-cross-sell";
import PlatformHero from "./platform-hero";
import {
  platformCapabilities,
  platformOverviewChecklist,
  platformPills,
  platformSellingPoints
} from "./platform-page-data";
import PlatformSubnav from "./platform-subnav";
import PlatformTour from "./platform-tour";
import CtaSection from "../../home/cta-section";

export default function PlatformPage() {
  return (
    <SitePageShell
      route="products/aquaview-platform"
      supplemental={
        <>
          <AosRuntime duration={900} offset={50} />
          <Script
            src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"
            strategy="afterInteractive"
          />
        </>
      }
    >
      <PlatformHero />
      <PlatformSubnav />

      <SectionShell
        id="capabilities"
        eyebrow="Capabilities"
        title="A control layer for live water-quality operations."
        description="AquaView gives monitoring teams a single environment for live telemetry, site context, and the workflows needed to keep distributed deployments running."
        className="bg-[linear-gradient(180deg,#f8fbfc_0%,#eef6f8_100%)]"
        containerClassName="max-w-6xl"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <article
            className="rounded-[32px] border border-[rgba(210,219,226,0.6)] bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(238,243,246,0.92))] p-7 shadow-[0_22px_60px_rgba(8,24,32,0.08)] sm:p-8"
            data-aos="fade-up"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-aquamesh-500">
              Overview
            </p>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight text-aquamesh-700">
              Visualize distributed sensors, not isolated readings.
            </h3>
            <p className="mt-4 text-base leading-7 text-slate-700">
              AquaView is framed as the software surface for the AquaMesh
              system: a live dashboard that turns incoming telemetry into a
              clearer operational picture for field teams and stakeholders.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-700">
              From trend analysis to site-by-site status tracking, the platform
              is designed to make changing water conditions visible early and
              keep response decisions grounded in current data.
            </p>

            <FeatureChecklist
              items={platformOverviewChecklist}
              className="mt-6"
              itemClassName="rounded-[18px] bg-slate-900/5 px-4 py-3.5 text-sm font-medium leading-6 text-[#1d3b48]"
              iconClassName="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-aquamesh-50 text-aquamesh-500"
            />

            <div className="mt-6 flex flex-wrap gap-3">
              {platformPills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-aquamesh-300/50 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-aquamesh-700"
                >
                  {pill}
                </span>
              ))}
            </div>
          </article>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-1">
            {platformSellingPoints.map((point) => (
              <InfoCard
                key={point.title}
                title={point.title}
                description={point.copy}
                className="border border-white/15 bg-[linear-gradient(135deg,rgba(16,31,40,0.96),rgba(13,26,34,0.88))] shadow-[0_22px_48px_rgba(0,0,0,0.12)]"
                titleClassName="text-white"
                descriptionClassName="text-slate-300"
                data-aos="fade-up"
                data-aos-delay={point.delay}
                leading={
                  <div className="inline-flex h-[3.3rem] w-[3.3rem] items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(102,211,240,0.22),rgba(255,255,255,0.12))] text-aquamesh-300">
                    <i className={point.icon}></i>
                  </div>
                }
              />
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {platformCapabilities.map((capability, index) => (
            <InfoCard
              key={capability.title}
              eyebrow={capability.eyebrow}
              title={capability.title}
              description={capability.description}
              className="rounded-[26px] border-[rgba(210,219,226,0.52)] bg-[linear-gradient(135deg,white_96%,#eef2f5_92%)] shadow-[0_20px_50px_rgba(6,24,33,0.08)]"
              data-aos="fade-up"
              data-aos-delay={index * 80}
            />
          ))}
        </div>
      </SectionShell>

      <PlatformTour />

      <ProductCrossSell currentProduct="platform" />
      <CtaSection />
    </SitePageShell>
  );
}
