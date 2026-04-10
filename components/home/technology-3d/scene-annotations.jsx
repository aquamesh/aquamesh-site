"use client";

import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { sampleChannelPoint, waterSurfaceY } from "./river-geometry";
import { GATEWAY_POS } from "./gateway-hub";
import { CLOUD_POS } from "./cloud-element";
import { INDUSTRIAL_MARKER_POS } from "./industrial-site";
import { ACCENT_STYLES, ANNOTATION_COPY } from "./scene-annotation-copy";

const [sensorX, sensorY, sensorZ] = sampleChannelPoint("main", -2.25, -0.08);
const COASTAL_USE_CASE_POS = [-3.6, waterSurfaceY(-3.6, 8.9) + 0.02, 8.9];

const ANNOTATION_BY_VIEW = Object.fromEntries(
  ANNOTATION_COPY.map((item) => [item.viewId, item])
);

const ANNOTATIONS = [
  {
    ...ANNOTATION_BY_VIEW.sensors,
    position: [sensorX, sensorY + 0.02, sensorZ],
    stemHeight: 0.78,
  },
  {
    ...ANNOTATION_BY_VIEW.industrial,
    position: INDUSTRIAL_MARKER_POS,
    stemHeight: 0.72,
  },
  {
    ...ANNOTATION_BY_VIEW.coastal,
    position: COASTAL_USE_CASE_POS,
    stemHeight: 0.98,
  },
  {
    ...ANNOTATION_BY_VIEW.gateway,
    position: [GATEWAY_POS[0], GATEWAY_POS[1] + 0.02, GATEWAY_POS[2] + 0.24],
    stemHeight: 0.96,
  },
  {
    ...ANNOTATION_BY_VIEW.cloud,
    position: [CLOUD_POS[0] - 1.2, CLOUD_POS[1] - 2.15, CLOUD_POS[2] + 2.45],
    stemHeight: 0.56,
  },
];

const ALIGN_TRANSFORMS = {
  left: "translate3d(14px, calc(-100% - 10px), 0)",
  center: "translate3d(-50%, calc(-100% - 10px), 0)",
  right: "translate3d(calc(-100% - 14px), calc(-100% - 10px), 0)",
};

const LARGE_CANVAS_BREAKPOINT = 960;

function Annotation({ item, activeView, onSelectView, showCards }) {
  const accent = ACCENT_STYLES[item.accent];
  const isFocused = activeView === null || item.viewId === activeView;
  const cardOpacity = isFocused ? 1 : 0.5;
  const stemOpacity = isFocused ? 0.95 : 0.4;
  const scale = isFocused ? 1 : 0.96;
  const [shiftX, shiftY] = item.cardShift ?? [0, 0];
  const handleToggle = () =>
    onSelectView?.(activeView === item.viewId ? null : item.viewId);

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

      {!showCards ? (
        <mesh position={[0, item.stemHeight, 0]} onClick={handleToggle}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      ) : null}

      <mesh position={[0, item.stemHeight, 0]} onClick={handleToggle}>
        <sphereGeometry args={[showCards ? 0.055 : 0.075, 14, 14]} />
        <meshStandardMaterial
          color={accent.dot}
          emissive={accent.dot}
          emissiveIntensity={isFocused ? 0.92 : 0.34}
          roughness={0.2}
          metalness={0.05}
        />
      </mesh>

      {showCards ? (
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
              onClick={handleToggle}
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
      ) : null}
    </group>
  );
}

export default function SceneAnnotations({
  activeView = null,
  onSelectView,
}) {
  const { size } = useThree();
  const showCards = size.width >= LARGE_CANVAS_BREAKPOINT;

  return (
    <>
      {ANNOTATIONS.map((item) => (
        <Annotation
          key={item.title}
          item={item}
          activeView={activeView}
          onSelectView={onSelectView}
          showCards={showCards}
        />
      ))}
    </>
  );
}
