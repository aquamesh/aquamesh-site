"use client";

import { Html } from "@react-three/drei";
import { sampleChannelPoint, waterSurfaceY } from "./river-geometry";
import { GATEWAY_POS } from "./gateway-hub";
import { CLOUD_POS } from "./cloud-element";
import { INDUSTRIAL_MARKER_POS } from "./industrial-site";

const [sensorX, sensorY, sensorZ] = sampleChannelPoint("main", -2.25, -0.08);
const COASTAL_USE_CASE_POS = [-3.6, waterSurfaceY(-3.6, 8.9) + 0.02, 8.9];

const ANNOTATIONS = [
  {
    eyebrow: "Field Layer",
    title: "River Sensor Array",
    description:
      "Probe nodes capture multi-parameter conditions across the channel network and delta branches.",
    position: [sensorX, sensorY + 0.02, sensorZ],
    stemHeight: 0.78,
    align: "right",
    accent: "aqua",
    viewId: "sensors",
    cardShift: [-18, 0],
  },
  {
    eyebrow: "Use Case",
    title: "Industrial Outfall Monitoring",
    description:
      "Track discharge compliance, process-water QA, and spill risk before it spreads downstream.",
    position: INDUSTRIAL_MARKER_POS,
    stemHeight: 0.72,
    align: "left",
    accent: "amber",
    viewId: "industrial",
  },
  {
    eyebrow: "Use Case",
    title: "Coastal / Nearshore Monitoring",
    description:
      "Track plume mixing, shoreline water quality, and ocean-facing habitat conditions where discharge reaches the coast.",
    position: COASTAL_USE_CASE_POS,
    stemHeight: 0.98,
    align: "left",
    accent: "sky",
    viewId: "coastal",
    cardShift: [18, -22],
  },
  {
    eyebrow: "Edge Uplink",
    title: "AquaLink Hub",
    description: "Solar LoRa gateway aggregates field traffic for cellular or satellite backhaul.",
    position: [GATEWAY_POS[0], GATEWAY_POS[1] + 0.02, GATEWAY_POS[2] + 0.24],
    stemHeight: 0.96,
    align: "right",
    accent: "teal",
    viewId: "gateway",
  },
  {
    eyebrow: "Cloud Layer",
    title: "AquaView Platform",
    description: "Alerts, anomaly detection, and trend analysis arrive in one live operations view.",
    position: [CLOUD_POS[0] - 1.2, CLOUD_POS[1] - 2.15, CLOUD_POS[2] + 2.45],
    stemHeight: 0.56,
    align: "right",
    accent: "violet",
    viewId: "cloud",
    cardShift: [-12, 148],
  },
];

const ACCENT_STYLES = {
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

const ALIGN_TRANSFORMS = {
  left: "translate3d(14px, calc(-100% - 10px), 0)",
  center: "translate3d(-50%, calc(-100% - 10px), 0)",
  right: "translate3d(calc(-100% - 14px), calc(-100% - 10px), 0)",
};

function Annotation({ item, activeView, onSelectView }) {
  const accent = ACCENT_STYLES[item.accent];
  const isFocused = activeView === null || item.viewId === activeView;
  const cardOpacity = isFocused ? 1 : 0.5;
  const stemOpacity = isFocused ? 0.95 : 0.4;
  const scale = isFocused ? 1 : 0.96;
  const [shiftX, shiftY] = item.cardShift ?? [0, 0];

  return (
    <group position={item.position}>
      <mesh position={[0, item.stemHeight * 0.5, 0]}>
        <cylinderGeometry args={[0.016, 0.016, item.stemHeight, 10]} />
        <meshStandardMaterial
          color={accent.dot}
          emissive={accent.dot}
          emissiveIntensity={isFocused ? 0.68 : 0.22}
          transparent
          opacity={stemOpacity}
          roughness={0.2}
          metalness={0.08}
        />
      </mesh>

      <mesh position={[0, item.stemHeight, 0]}>
        <sphereGeometry args={[0.055, 14, 14]} />
        <meshStandardMaterial
          color={accent.dot}
          emissive={accent.dot}
          emissiveIntensity={isFocused ? 0.92 : 0.34}
          roughness={0.2}
          metalness={0.05}
        />
      </mesh>

      <Html
        position={[0, item.stemHeight, 0]}
        zIndexRange={[120, 0]}
        style={{ pointerEvents: "auto", userSelect: "none" }}
      >
        <div
          style={{
            transform: `${ALIGN_TRANSFORMS[item.align]} translate3d(${shiftX}px, ${shiftY}px, 0) scale(${scale})`,
            transformOrigin:
              item.align === "left"
                ? "left bottom"
                : item.align === "right"
                  ? "right bottom"
                  : "center bottom",
            opacity: cardOpacity,
            transition: "opacity 220ms ease, transform 220ms ease",
          }}
        >
          <button
            type="button"
            onClick={() =>
              onSelectView?.(activeView === item.viewId ? null : item.viewId)
            }
            aria-pressed={activeView === item.viewId}
            style={{
              background: "transparent",
              border: "none",
              color: "inherit",
              cursor: "pointer",
              display: "block",
              padding: 0,
              textAlign: "left",
            }}
          >
            <div
              style={{
                width: 162,
                borderRadius: 16,
                border: `1px solid ${accent.border}`,
                background: accent.soft,
                boxShadow: `0 12px 28px ${accent.glow}`,
                padding: "9px 11px",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  gap: 6,
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    background: accent.dot,
                    borderRadius: 999,
                    boxShadow: `0 0 0 4px ${accent.glow}`,
                    display: "block",
                    height: 7,
                    width: 7,
                  }}
                />
                <span
                  style={{
                    color: accent.body,
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  {item.eyebrow}
                </span>
              </div>

              <div
                style={{
                  color: accent.title,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.15,
                  marginBottom: 4,
                }}
              >
                {item.title}
              </div>

              <div
                style={{
                  color: accent.body,
                  fontSize: 10,
                  lineHeight: 1.35,
                }}
              >
                {item.description}
              </div>
            </div>
          </button>
        </div>
      </Html>
    </group>
  );
}

export default function SceneAnnotations({
  activeView = null,
  onSelectView,
}) {
  return (
    <>
      {ANNOTATIONS.map((item) => (
        <Annotation
          key={item.title}
          item={item}
          activeView={activeView}
          onSelectView={onSelectView}
        />
      ))}
    </>
  );
}
