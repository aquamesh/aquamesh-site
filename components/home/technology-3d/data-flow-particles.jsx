"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { MathUtils } from "three";
import { PROBE_POSITIONS } from "./sensor-probes";
import { GATEWAY_BOX_CENTER } from "./gateway-hub";
import { CLOUD_POS } from "./cloud-element";

// Particle colors that match probe accents
const PARTICLE_COLORS = ["#22d3ee", "#34d399", "#67e8f9", "#a78bfa", "#f0abfc", "#fbbf24"];
const GATEWAY_LINK_POINT = GATEWAY_BOX_CENTER;
const CLOSEST_PROBE_INDICES = PROBE_POSITIONS.map((pos, index) => ({
  index,
  distance:
    (pos[0] - GATEWAY_LINK_POINT[0]) ** 2 +
    (pos[1] - GATEWAY_LINK_POINT[1]) ** 2 +
    (pos[2] - GATEWAY_LINK_POINT[2]) ** 2,
}))
  .sort((a, b) => a.distance - b.distance)
  .slice(0, 2)
  .map(({ index }) => index);

export default function DataFlowParticles({ activeStage = null }) {
  const probeLinks = useMemo(() => {
    return CLOSEST_PROBE_INDICES.map((probeIndex, linkIndex) => ({
      key: `p2g-link-${probeIndex}`,
      from: [
        PROBE_POSITIONS[probeIndex][0],
        PROBE_POSITIONS[probeIndex][1] + 0.22,
        PROBE_POSITIONS[probeIndex][2],
      ],
      to: GATEWAY_LINK_POINT,
      color: PARTICLE_COLORS[probeIndex % PARTICLE_COLORS.length],
      pulseFreq: 1.1,
      pulseOffset: linkIndex * 1.7,
      glowActiveBase: 0.14,
      glowInactiveBase: 0.05,
      glowPulseActive: 0.02,
      glowPulseInactive: 0.015,
      coreActiveBase: 0.46,
      coreInactiveBase: 0.17,
      corePulseActive: 0.08,
      corePulseInactive: 0.04,
      dashSpeed: 0.0045,
      activeStage: 1,
      glowLineWidth: 4.8,
      glowOpacityInit: 0.08,
      coreLineWidth: 1.5,
      coreOpacityInit: 0.42,
      dashSize: 0.14,
      gapSize: 0.18,
    }));
  }, []);

  const gatewayToCloud = useMemo(
    () => ({
      key: "g2c-link",
      from: GATEWAY_BOX_CENTER,
      to: CLOUD_POS,
      color: "#8fdcff",
      pulseFreq: 1.05,
      pulseOffset: 0,
      glowActiveBase: 0.16,
      glowInactiveBase: 0.05,
      glowPulseActive: 0.03,
      glowPulseInactive: 0.015,
      coreActiveBase: 0.48,
      coreInactiveBase: 0.16,
      corePulseActive: 0.08,
      corePulseInactive: 0.04,
      dashSpeed: 0.005,
      activeStage: 2,
      glowLineWidth: 5.2,
      glowOpacityInit: 0.1,
      coreLineWidth: 1.8,
      coreOpacityInit: 0.34,
      dashSize: 0.2,
      gapSize: 0.18,
    }),
    []
  );

  const allLinks = useMemo(
    () => [...probeLinks, gatewayToCloud],
    [probeLinks, gatewayToCloud]
  );

  const glowRefs = useRef([]);
  const coreRefs = useRef([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    for (let i = 0; i < allLinks.length; i++) {
      const link = allLinks[i];
      const isActive =
        activeStage === null || activeStage === link.activeStage;
      const pulse = Math.sin(t * link.pulseFreq + link.pulseOffset);

      const glow = glowRefs.current[i];
      if (glow) {
        const glowTarget = isActive
          ? link.glowActiveBase + pulse * link.glowPulseActive
          : link.glowInactiveBase + pulse * link.glowPulseInactive;
        glow.material.opacity = MathUtils.lerp(
          glow.material.opacity,
          glowTarget,
          0.08
        );
      }

      const core = coreRefs.current[i];
      if (core) {
        const coreTarget = isActive
          ? link.coreActiveBase + pulse * link.corePulseActive
          : link.coreInactiveBase + pulse * link.corePulseInactive;
        core.material.opacity = MathUtils.lerp(
          core.material.opacity,
          coreTarget,
          0.08
        );
        core.material.dashOffset -= link.dashSpeed;
      }
    }
  });

  return (
    <>
      {allLinks.map((link, i) => (
        <group key={link.key}>
          <Line
            ref={(el) => (glowRefs.current[i] = el)}
            points={[link.from, link.to]}
            color={link.color}
            lineWidth={link.glowLineWidth}
            transparent
            opacity={link.glowOpacityInit}
            depthTest={false}
            depthWrite={false}
            toneMapped={false}
            renderOrder={8}
          />
          <Line
            ref={(el) => (coreRefs.current[i] = el)}
            points={[link.from, link.to]}
            color={link.color}
            lineWidth={link.coreLineWidth}
            transparent
            opacity={link.coreOpacityInit}
            dashed
            dashSize={link.dashSize}
            gapSize={link.gapSize}
            depthTest={false}
            depthWrite={false}
            toneMapped={false}
            renderOrder={9}
          />
        </group>
      ))}
    </>
  );
}
