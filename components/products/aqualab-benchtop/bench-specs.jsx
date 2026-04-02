import { publicAssetHref } from "../../../lib/site-paths";
import ProductSpecsSection from "../shared/product-specs-section";
import BenchSection from "./bench-section";
import { specHighlights, specs } from "./bench-page-data";

export default function BenchSpecs() {
  return (
    <BenchSection
      id="specs"
      eyebrow="Specifications"
      title="Core specifications at a glance."
      intro="Technical detail for buyers evaluating AquaLab for lab and bench workflows."
      tone="mist"
    >
      <ProductSpecsSection
        specs={specs}
        highlights={specHighlights}
        actionLabel="Download Datasheet"
        actionHref={publicAssetHref("/AquaMesh_Specsheets.pdf")}
      />
    </BenchSection>
  );
}
