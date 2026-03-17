import Script from "next/script";
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
          <Script
            src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"
            strategy="afterInteractive"
          />
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
