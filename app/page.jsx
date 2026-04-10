import HomePage from "../components/home/home-page";
import { createPageMetadata } from "../lib/page-metadata";

export const metadata = createPageMetadata({
  title: "AquaMesh | Water Quality Monitoring Sensors, Telemetry, and Analytics",
  description:
    "AquaMesh builds connected water-quality monitoring hardware and software for fluorescence, absorbance, turbidity, telemetry, and live analytics across field, lab, and industrial programs.",
  path: "/",
  image: "/images/updated_landscape_1.jpg",
  imageAlt: "AquaMesh water-quality monitoring landscape"
});

export default function Page() {
  return <HomePage />;
}
