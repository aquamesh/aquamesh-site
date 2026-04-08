"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { MathUtils } from "three";
import { PROBE_POSITIONS } from "./sensor-probes";
import { GATEWAY_BOX_CENTER, GATEWAY_POS } from "./gateway-hub";
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

function ProbeToGatewayLink({ from, color, index, active }) {
  const glowRef = useRef();
  const coreRef = useRef();
  const to = useMemo(() => GATEWAY_LINK_POINT, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = Math.sin(t * 1.1 + index * 1.7);

    if (glowRef.current) {
      const glowTarget = active ? 0.14 + pulse * 0.02 : 0.05 + pulse * 0.015;
      glowRef.current.material.opacity = MathUtils.lerp(
        glowRef.current.material.opacity,
        glowTarget,
        0.08
      );
    }

    if (coreRef.current) {
      const targetOpacity = active ? 0.46 + pulse * 0.08 : 0.17 + pulse * 0.04;
      coreRef.current.material.opacity = MathUtils.lerp(
        coreRef.current.material.opacity,
        targetOpacity,
        0.08
      );
      coreRef.current.material.dashOffset -= 0.0045;
    }
  });

  return (
    <>
      <Line
        ref={glowRef}
        points={[from, to]}
        color={color}
        lineWidth={4.8}
        transparent
        opacity={0.08}
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
        renderOrder={8}
      />
      <Line
        ref={coreRef}
        points={[from, to]}
        color={color}
        lineWidth={1.5}
        transparent
        opacity={0.42}
        dashed
        dashSize={0.14}
        gapSize={0.18}
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
        renderOrder={9}
      />
    </>
  );
}

function GatewayToCloudLink({ active }) {
  const glowRef = useRef();
  const coreRef = useRef();
  const from = useMemo(() => GATEWAY_BOX_CENTER, []);
  const to = useMemo(() => CLOUD_POS, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = Math.sin(t * 1.05);

    if (glowRef.current) {
      const glowTarget = active ? 0.16 + pulse * 0.03 : 0.05 + pulse * 0.015;
      glowRef.current.material.opacity = MathUtils.lerp(
        glowRef.current.material.opacity,
        glowTarget,
        0.08
      );
    }

    if (coreRef.current) {
      const coreTarget = active ? 0.48 + pulse * 0.08 : 0.16 + pulse * 0.04;
      coreRef.current.material.opacity = MathUtils.lerp(
        coreRef.current.material.opacity,
        coreTarget,
        0.08
      );
      coreRef.current.material.dashOffset -= 0.005;
    }
  });

  return (
    <>
      <Line
        ref={glowRef}
        points={[from, to]}
        color="#8fdcff"
        lineWidth={5.2}
        transparent
        opacity={0.1}
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
        renderOrder={8}
      />
      <Line
        ref={coreRef}
        points={[from, to]}
        color="#8fdcff"
        lineWidth={1.8}
        transparent
        opacity={0.34}
        dashed
        dashSize={0.2}
        gapSize={0.18}
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
        renderOrder={9}
      />
    </>
  );
}

export default function DataFlowParticles({ activeStage = null }) {
  const probeLinks = useMemo(() => {
    return CLOSEST_PROBE_INDICES.map((probeIndex, linkIndex) => ({
      key: `p2g-link-${probeIndex}`,
      from: [
        PROBE_POSITIONS[probeIndex][0],
        PROBE_POSITIONS[probeIndex][1] + 0.22,
        PROBE_POSITIONS[probeIndex][2],
      ],
      color: PARTICLE_COLORS[probeIndex % PARTICLE_COLORS.length],
      index: linkIndex,
    }));
  }, []);

  return (
    <>
      {probeLinks.map((link) => (
        <ProbeToGatewayLink
          key={link.key}
          from={link.from}
          color={link.color}
          index={link.index}
          active={activeStage === null || activeStage === 1}
        />
      ))}
      <GatewayToCloudLink active={activeStage === null || activeStage === 2} />
    </>
  );
}
