import PlatformPage from "../../../components/products/platform/platform-page";
import { createPageMetadata } from "../../../lib/page-metadata";

export const metadata = createPageMetadata({
  title: "AquaView\u2122 Platform | Water Quality Monitoring Software | AquaMesh",
  description:
    "AquaView is the AquaMesh software platform for live dashboards, alerts, predictive analytics, reporting, and multi-site water-quality monitoring operations.",
  path: "/products/aquaview-platform/",
  image: "/images/platform/platform_hero.png",
  imageAlt: "AquaView platform dashboard with water-quality analytics"
});

export default function PlatformRoute() {
  return <PlatformPage />;
}
