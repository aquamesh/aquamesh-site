import AosRuntime from "../../runtime/aos-runtime";
import SitePageShell from "../../site-page-shell";
import ProbeFaq from "./probe-faq";
import ProbeHero from "./probe-hero";
import ProbeSpecs from "./probe-specs";
import ProbeStoryPanels from "./probe-story-panels";
import ProbeSubnav from "./probe-subnav";
import ProbeCaseStudy from "./probe-case-study";
import ProductCrossSell from "../shared/product-cross-sell";
import CtaSection from "../../home/cta-section";

export default function ProbePage() {
  return (
    <SitePageShell
      route="products/aquaspectra-probe"
      supplemental={
        <>
          <AosRuntime duration={900} offset={50} />
        </>
      }
    >
      <ProbeHero />
      <ProbeSubnav />
      <ProbeStoryPanels />
      <ProbeCaseStudy />
      <ProbeSpecs />
      <ProbeFaq />
      <ProductCrossSell currentProduct="probe" />
      <CtaSection />
    </SitePageShell>
  );
}
