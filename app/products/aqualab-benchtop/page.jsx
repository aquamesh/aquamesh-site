import BenchPage from "../../../components/products/aqualab-benchtop/bench-page";
import { createPageMetadata } from "../../../lib/page-metadata";

export const metadata = createPageMetadata({
  title: "AquaLab\u2122 Benchtop | Lab Water Quality Analyzer | AquaMesh",
  description:
    "AquaLab brings AquaMesh's multi-parameter optical sensing stack to the lab bench for grab-sample analysis, calibration work, and field-to-lab verification.",
  path: "/products/aqualab-benchtop/",
  image: "/images/bench_front.png",
  imageAlt: "AquaLab benchtop water-quality analyzer"
});

export default function AquaLabBenchtopPage() {
  return <BenchPage />;
}
