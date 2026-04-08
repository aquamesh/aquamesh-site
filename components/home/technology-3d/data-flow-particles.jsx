"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { MathUtils } from "three";
import { PROBE_POSITIONS } from "./sensor-probes";
import { GATEWAY_BOX_CENTER, GATEWAY_POS } from "./gateway-hub";
import { CLOUD_POS } from "./cloud-element";

function lerp3(a, b, t) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

function quadBezier(a, ctrl, b, t) {
  const ab = lerp3(a, ctrl, t);
  const bc = lerp3(ctrl, b, t);
  return lerp3(ab, bc, t);
}

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
  const ref = useRef();
  const to = useMemo(() => GATEWAY_LINK_POINT, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const pulse = Math.sin(t * 1.1 + index * 1.7);
    const targetOpacity = active ? 0.72 + pulse * 0.12 : 0.24 + pulse * 0.05;
    ref.current.material.opacity = MathUtils.lerp(
      ref.current.material.opacity,
      targetOpacity,
      0.08
    );
    ref.current.material.dashOffset -= 0.007;
  });

  return (
    <Line
      ref={ref}
      points={[from, to]}
      color={color}
      lineWidth={2.2}
      transparent
      opacity={0.4}
      dashed
      dashSize={0.22}
      gapSize={0.12}
    />
  );
}

function GatewayToCloudParticle({ speed, offset, color, active }) {
  const ref = useRef();
  const from = useMemo(
    () => [GATEWAY_POS[0], GATEWAY_POS[1] + 1.1, GATEWAY_POS[2]],
    []
  );
  const to = useMemo(() => CLOUD_POS, []);
  const ctrl = useMemo(
    () => [
      (from[0] + to[0]) / 2 + 1.1,
      Math.max(from[1], to[1]) * 0.74,
      (from[2] + to[2]) / 2 - 0.6,
    ],
    [from, to]
  );

  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() * speed + offset) % 1;
    const [x, y, z] = quadBezier(from, ctrl, to, t);
    ref.current.position.set(x, y, z);
    const opacityTarget = Math.sin(t * Math.PI) * (active ? 0.98 : 0.18);
    ref.current.material.opacity = MathUtils.lerp(ref.current.material.opacity, opacityTarget, 0.08);
    ref.current.material.emissiveIntensity = MathUtils.lerp(
      ref.current.material.emissiveIntensity,
      active ? 3.1 : 0.7,
      0.08
    );
  });

  return (
    <mesh ref={ref}>
      <tetrahedronGeometry args={[0.14, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2.5}
        flatShading
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

const G2C_COLORS = ["#6ecff6", "#a78bfa", "#34d399", "#67e8f9", "#c4b5fd"];

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

  const cloudParticles = useMemo(() => {
    return [0, 1, 2, 3, 4].map((i) => ({
      key: `g2c-${i}`,
      speed: 0.18 + i * 0.04,
      offset: i * 0.2,
      color: G2C_COLORS[i],
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
      {cloudParticles.map((p) => (
        <GatewayToCloudParticle
          key={p.key}
          speed={p.speed}
          offset={p.offset}
          color={p.color}
          active={activeStage === null || activeStage === 2}
        />
      ))}
    </>
  );
}
