import Script from "next/script"
import AosRuntime from "../../runtime/aos-runtime"
import SitePageShell from "../../site-page-shell"
import FeatureChecklist from "../../ui/feature-checklist"
import InfoCard from "../../ui/info-card"
import SectionShell from "../../ui/section-shell"
import ProductCrossSell from "../shared/product-cross-sell"
import AqualinkHero from "./aqualink-hero"
import ProductSpecsSection from "../shared/product-specs-section"
import {
  aqualinkDeploymentCards,
  aqualinkDeploymentFlow,
  aqualinkOverviewChecklist,
  aqualinkPills,
  aqualinkSpecHighlights,
  aqualinkSellingPoints,
  aqualinkSpecItems
} from "./aqualink-page-data"
import AqualinkSubnav from "./aqualink-subnav"
import CtaSection from "../../home/cta-section"

export default function AqualinkPage() {
  return (
    <SitePageShell
      route="products/aqualink-hub"
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
      <AqualinkHero />
      <AqualinkSubnav />

      <SectionShell
        eyebrow="Capabilities"
        title="A compact gateway layer for remote water-quality telemetry."
        description="AquaLink is framed as the field hub inside the AquaMesh stack: a device that aggregates sensor traffic, extends network reach, and passes telemetry into the software layer without adding unnecessary deployment complexity."
        className="bg-[linear-gradient(180deg,#f8fbfc_0%,#eef6f8_100%)]"
        containerClassName="max-w-6xl"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
          <article
            className="rounded-[32px] border border-[rgba(210,219,226,0.6)] bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(238,243,246,0.92))] p-7 shadow-[0_22px_60px_rgba(8,24,32,0.08)] sm:p-8"
            data-aos="fade-up"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-aquamesh-500">
              Overview
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-aquamesh-700">
              Move sensor data out of the field and into the monitoring stack.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700">
              AquaLink is designed for rugged, autonomous deployments where
              sensors may be distributed across waterways, treatment assets, or
              hard-to-reach monitoring zones. Its job is to collect that field
              traffic and keep telemetry moving.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-700">
              The page positioning stays focused on practical operations:
              reliable connectivity, low-touch power management, and a clean
              bridge into AquaView for live monitoring and analysis.
            </p>

            <FeatureChecklist
              items={aqualinkOverviewChecklist}
              className="mt-6"
              itemClassName="rounded-[18px] bg-slate-900/5 px-4 py-3.5 text-sm font-medium leading-6 text-[#1d3b48]"
              iconClassName="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-aquamesh-50 text-aquamesh-500"
            />

            <div className="mt-6 flex flex-wrap gap-3">
              {aqualinkPills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-aquamesh-300/50 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-aquamesh-700"
                >
                  {pill}
                </span>
              ))}
            </div>
          </article>

          <div className="grid gap-5">
            {aqualinkSellingPoints.map((point) => (
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
      </SectionShell>

      <SectionShell
        id="deployment"
        eyebrow="Deployment"
        title="Mount, power, connect. That's it."
        description="AquaLink sits between your sensors and the dashboard layer — closing the gap between what's happening at the water and what your team can see."
        className="bg-[radial-gradient(ellipse_at_top_left,rgba(102,211,240,0.08),transparent_52%),linear-gradient(180deg,#091218_0%,#121d24_100%)]"
        eyebrowClassName="text-aquamesh-300"
        titleClassName="text-white"
        descriptionClassName="text-slate-300"
        containerClassName="max-w-6xl"
      >
        {/* Telemetry flow — horizontal icon steps */}
        <div
          className="mb-10 rounded-[28px] border border-white/10 bg-white/[0.04] px-6 py-8 sm:px-10"
          data-aos="fade-up"
        >
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Telemetry path
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {aqualinkDeploymentFlow.map((item, i) => (
            <div key={item.label} className="flex items-center gap-4 sm:flex-col sm:gap-3 sm:text-center">
              <div className="inline-flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-aquamesh-300/30 bg-aquamesh-500/25 text-2xl text-aquamesh-300 shadow-[0_0_24px_rgba(28,157,187,0.18)]">
                <i className={item.icon} />
              </div>
              <span className="text-base font-semibold text-white">{item.label}</span>
            </div>
          )).reduce((acc, el, i) => {
            if (i > 0) {
              acc.push(
                <i
                  key={`arrow-h-${i}`}
                  className="fa-solid fa-arrow-right-long hidden text-xl text-aquamesh-300/60 sm:block"
                />
              );
            }
            acc.push(el);
            return acc;
          }, [])}
          </div>
        </div>

        {/* Deployment cards — icon-led grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-aos="fade-up" data-aos-delay="100">
          {aqualinkDeploymentCards.map((item) => (
            <article
              key={item.step}
              className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_18px_42px_rgba(0,0,0,0.18)] backdrop-blur-sm"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-aquamesh-500/20 text-aquamesh-300">
                <i className={item.icon} />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-aquamesh-300">
                {item.step}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="specs"
        eyebrow="Technical Specs"
        title="Concise hardware details for planning an AquaLink install."
        description="The page stays short here by surfacing the core deployment specs directly instead of expanding into a large technical matrix."
        className="bg-[linear-gradient(180deg,#f8fbfc_0%,#eef6f8_100%)]"
        containerClassName="max-w-6xl"
        align="left"
      >
        <ProductSpecsSection
          specs={aqualinkSpecItems}
          highlights={aqualinkSpecHighlights}
        />
      </SectionShell>

      <ProductCrossSell currentProduct="hub" />
      <CtaSection />
    </SitePageShell>
  )
}
