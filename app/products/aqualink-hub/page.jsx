import AqualinkPage from "../../../components/products/aqualink/aqualink-page";
import { createPageMetadata } from "../../../lib/page-metadata";

export const metadata = createPageMetadata({
  title: "AquaLink\u2122 Hub | Water Monitoring Telemetry Gateway | AquaMesh",
  description:
    "AquaLink is the AquaMesh gateway hub for site-to-site telemetry, remote sensor communications, local logging, and cloud connectivity across distributed water monitoring deployments.",
  path: "/products/aqualink-hub/",
  image: "/images/transparent_hub.png",
  imageAlt: "AquaLink telemetry gateway hardware"
});

export default function AqualinkRoute() {
  return <AqualinkPage />;
}
