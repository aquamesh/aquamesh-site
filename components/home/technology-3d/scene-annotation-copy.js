export const OVERVIEW_HIGHLIGHT = {
  viewId: null,
  mobileLabel: "Overview",
  eyebrow: "System View",
  title: "Connected AquaMesh workflow",
  description:
    "Swipe through the highlights to follow field probes, edge backhaul, and cloud analytics without the mobile view collapsing into overlapping cards.",
  accent: "aqua",
};

export const ANNOTATION_COPY = [
  {
    viewId: "sensors",
    mobileLabel: "Surface",
    eyebrow: "Use Case",
    title: "River Sensor Array",
    description:
      "Probe nodes capture multi-parameter conditions across the channel network and delta branches.",
    accent: "aqua",
    align: "right",
    cardShift: [-18, 0],
  },
  {
    viewId: "industrial",
    mobileLabel: "Industrial",
    eyebrow: "Use Case",
    title: "Industrial Outfall Monitoring",
    description:
      "Track discharge compliance, process-water QA, and spill risk before it spreads downstream.",
    accent: "amber",
    align: "left",
  },
  {
    viewId: "coastal",
    mobileLabel: "Coastal",
    eyebrow: "Use Case",
    title: "Coastal / Nearshore Monitoring",
    description:
      "Track plume mixing, shoreline water quality, and ocean-facing habitat conditions where discharge reaches the coast.",
    accent: "sky",
    align: "left",
    cardShift: [18, -22],
  },
  {
    viewId: "gateway",
    mobileLabel: "Gateway",
    eyebrow: "Edge Uplink",
    title: "AquaLink Hub",
    description:
      "Solar LoRa gateway aggregates field traffic for cellular or satellite backhaul.",
    accent: "teal",
    align: "right",
  },
  {
    viewId: "cloud",
    mobileLabel: "Cloud",
    eyebrow: "Cloud Layer",
    title: "AquaView Platform",
    description:
      "Alerts, anomaly detection, and trend analysis arrive in one live operations view.",
    accent: "violet",
    align: "right",
    cardShift: [-12, 148],
  },
];

export const ACCENT_STYLES = {
  aqua: {
    border: "rgba(28, 157, 187, 0.34)",
    glow: "rgba(28, 157, 187, 0.38)",
    dot: "#1c9dbb",
    soft: "rgba(239, 251, 255, 0.94)",
    title: "#103442",
    body: "#41606a",
  },
  amber: {
    border: "rgba(241, 165, 78, 0.34)",
    glow: "rgba(241, 165, 78, 0.34)",
    dot: "#f1a54e",
    soft: "rgba(255, 248, 238, 0.95)",
    title: "#4f3117",
    body: "#70523b",
  },
  teal: {
    border: "rgba(52, 211, 153, 0.34)",
    glow: "rgba(52, 211, 153, 0.3)",
    dot: "#34d399",
    soft: "rgba(239, 255, 249, 0.94)",
    title: "#103934",
    body: "#426760",
  },
  sky: {
    border: "rgba(56, 189, 248, 0.34)",
    glow: "rgba(56, 189, 248, 0.3)",
    dot: "#38bdf8",
    soft: "rgba(239, 249, 255, 0.94)",
    title: "#123b55",
    body: "#47687d",
  },
  violet: {
    border: "rgba(139, 92, 246, 0.3)",
    glow: "rgba(139, 92, 246, 0.28)",
    dot: "#8b5cf6",
    soft: "rgba(248, 245, 255, 0.94)",
    title: "#33235b",
    body: "#605680",
  },
};
