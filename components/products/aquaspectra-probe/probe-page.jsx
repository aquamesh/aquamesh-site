import Script from "next/script";
import AosRuntime from "../../runtime/aos-runtime";
import SitePageShell from "../../site-page-shell";
import ProbeFaq from "./probe-faq";
import ProbeHero from "./probe-hero";
import ProbeComparison from "./probe-comparison";
import ProbeProofGrid from "./probe-proof-grid";
import ProbeSellingPoints from "./probe-selling-points";
import ProbeSpecs from "./probe-specs";
import ProbeStoryPanels from "./probe-story-panels";
import ProbeSubnav from "./probe-subnav";
import ProbeCaseStudy from "./probe-case-study";
import ProbeUseCases from "./probe-use-cases";
import ProductCrossSell from "../shared/product-cross-sell";
import CtaSection from "../../home/cta-section";

export default function ProbePage() {
  return (
    <SitePageShell
      route="products/aquaspectra-probe"
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
      <ProbeHero />
      <ProbeSubnav />
      <ProbeProofGrid />
      <ProbeComparison />
      <ProbeSellingPoints />
      <ProbeStoryPanels />
      <ProbeUseCases />
      <ProbeCaseStudy />
      <ProbeSpecs />
      <ProbeFaq />
      <ProductCrossSell currentProduct="probe" />
      <CtaSection />
    </SitePageShell>
  );
}
