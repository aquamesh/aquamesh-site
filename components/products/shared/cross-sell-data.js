import { imageAssetHref } from "../../../lib/site-assets";

const crossSellCatalog = {
  probe: {
    name: "AquaSpectra",
    eyebrow: "Sensor Probe",
    tagline:
      "Multi-parameter optical sensing for continuous water-quality monitoring in the field.",
    image: imageAssetHref("full_probe_shot.png"),
    href: "/products/aquaspectra-probe/"
  },
  hub: {
    name: "AquaLink",
    eyebrow: "Gateway Hub",
    tagline:
      "A compact gateway that aggregates sensor traffic and bridges field telemetry to the cloud.",
    image: imageAssetHref("transparent_hub.png"),
    href: "/products/aqualink-hub/"
  },
  platform: {
    name: "AquaView",
    eyebrow: "Software Platform",
    tagline:
      "Live dashboards and operational tools for distributed water-quality programs.",
    image: imageAssetHref("platform_home_screenshot.png"),
    href: "/products/aquaview-platform/"
  }
};

export default crossSellCatalog;
