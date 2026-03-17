import { publicAssetHref } from "../../../lib/site-paths";
import ProductSpecsSection from "../shared/product-specs-section";
import ProbeSection from "./probe-section";
import { specHighlights, specs } from "./probe-page-data";

export default function ProbeSpecs() {
  return (
    <ProbeSection
      id="specs"
      eyebrow="Specifications"
      title="Core specifications at a glance."
      intro="Technical detail for buyers who want the essentials before starting a deployment conversation."
      tone="mist"
    >
      <ProductSpecsSection
        specs={specs}
        highlights={specHighlights}
        actionLabel="Download Datasheet"
        actionHref={publicAssetHref("/AquaMesh_Specsheets.pdf")}
      />
    </ProbeSection>
  );
}
