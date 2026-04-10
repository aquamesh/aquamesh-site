import { imageAssetHref } from "../../../lib/site-assets";

const crossSellCatalog = {
  probe: {
    name: "AquaSpectra",
    eyebrow: "Sensor Probe",
    tagline:
      "Multi-parameter optical sensing for continuous water-quality monitoring in the field.",
    image: imageAssetHref("full_probe_shot.png"),
    imageAlt: "AquaSpectra multi-parameter water-quality probe",
    href: "/products/aquaspectra-probe/"
  },
  benchtop: {
    name: "AquaLab",
    eyebrow: "Benchtop Analyzer",
    tagline:
      "Lab-grade multi-parameter optical sensing in a compact benchtop form factor.",
    image: imageAssetHref("bench_front_trans.png"),
    imageAlt: "AquaLab benchtop analyzer for sample testing and calibration",
    href: "/products/aqualab-benchtop/"
  },
  hub: {
    name: "AquaLink",
    eyebrow: "Gateway Hub",
    tagline:
      "A compact gateway that aggregates sensor traffic and bridges field telemetry to the cloud.",
    image: imageAssetHref("transparent_hub.png"),
    imageAlt: "AquaLink gateway hardware for remote telemetry",
    href: "/products/aqualink-hub/"
  },
  platform: {
    name: "AquaView",
    eyebrow: "Software Platform",
    tagline:
      "Live dashboards and operational tools for distributed water-quality programs.",
    image: imageAssetHref("platform_home_screenshot.png"),
    imageAlt: "AquaView monitoring dashboard with water-quality charts",
    href: "/products/aquaview-platform/"
  }
};

export default crossSellCatalog;
