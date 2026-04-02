import Script from "next/script";
import AosRuntime from "../../runtime/aos-runtime";
import SitePageShell from "../../site-page-shell";
import BenchFaq from "./bench-faq";
import BenchHero from "./bench-hero";
import BenchSpecs from "./bench-specs";
import BenchStoryPanels from "./bench-story-panels";
import BenchSubnav from "./bench-subnav";
import ProductCrossSell from "../shared/product-cross-sell";
import CtaSection from "../../home/cta-section";

export default function BenchPage() {
  return (
    <SitePageShell
      route="products/aqualab-benchtop"
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
      <BenchHero />
      <BenchSubnav />
      <BenchStoryPanels />
      <BenchSpecs />
      <BenchFaq />
      <ProductCrossSell currentProduct="benchtop" />
      <CtaSection />
    </SitePageShell>
  );
}
