import AosRuntime from "../runtime/aos-runtime";
import SitePageShell from "../site-page-shell";

import ComparisonSection from "./comparison-section";
import CtaSection from "./cta-section";
import HeroSection from "./hero-section";
import ProductsSection from "./products-section";
import TechnologyDemoSection from "./technology-demo-section";
import UseCasesSection from "./use-cases-section";

export default function HomePage() {
  return (
    <SitePageShell
      route=""
      supplemental={
        <>
          <AosRuntime />
        </>
      }
    >
      <HeroSection />

      <TechnologyDemoSection />
      <ProductsSection />
      <UseCasesSection />
      <ComparisonSection />
      <CtaSection />
    </SitePageShell>
  );
}
