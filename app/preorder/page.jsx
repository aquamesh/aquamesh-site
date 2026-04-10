import PreorderPage from "../../components/preorder/preorder-page";
import { createPageMetadata } from "../../lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Preorder AquaMesh Products | AquaSpectra, AquaLab, and More",
  description:
    "Reserve AquaMesh water-quality monitoring products and request early access to AquaSpectra, AquaLab, and the connected platform.",
  path: "/preorder/",
  image: "/images/full_probe_shot.png",
  imageAlt: "AquaMesh AquaSpectra probe product image"
});

export default function PreorderRoute() {
  return <PreorderPage />;
}
