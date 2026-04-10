import ProbePage from "../../../components/products/aquaspectra-probe/probe-page";
import { createPageMetadata } from "../../../lib/page-metadata";

export const metadata = createPageMetadata({
  title: "AquaSpectra\u2122 Probe | Multi-Parameter Water Quality Sensor | AquaMesh",
  description:
    "AquaSpectra is a multi-parameter optical water-quality probe that combines fluorescence, absorbance, turbidity, anti-fouling protection, and camera visibility in one deployable sensor.",
  path: "/products/aquaspectra-probe/",
  image: "/images/full_probe_shot.png",
  imageAlt: "AquaSpectra multi-parameter water-quality probe"
});

export default function AquaSpectraProbePage() {
  return <ProbePage />;
}
