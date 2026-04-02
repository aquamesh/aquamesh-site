import Script from "next/script";
import AosRuntime from "../../runtime/aos-runtime";
import SitePageShell from "../../site-page-shell";
import IconBadge from "../../ui/icon-badge";
import InfoCard from "../../ui/info-card";
import SectionShell from "../../ui/section-shell";
import ProductCrossSell from "../shared/product-cross-sell";
import PlatformHero from "./platform-hero";
import { platformCapabilities } from "./platform-page-data";
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
        title="Built for live water-quality operations."
        className="bg-[linear-gradient(180deg,#f8fbfc_0%,#eef6f8_100%)]"
        containerClassName="max-w-6xl"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {platformCapabilities.map((capability, index) => (
            <InfoCard
              key={capability.title}
              description={capability.description}
              className="rounded-[26px] border-[rgba(210,219,226,0.52)] bg-[linear-gradient(135deg,white_96%,#eef2f5_92%)] shadow-[0_20px_50px_rgba(6,24,33,0.08)]"
              data-aos="fade-up"
              data-aos-delay={index * 80}
              leading={
                <div className="flex min-h-[3.5rem] items-center gap-3">
                  <IconBadge icon={capability.icon} />
                  <h3 className="text-xl font-semibold text-aquamesh-700">{capability.title}</h3>
                </div>
              }
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
