"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { PROBE_POSITIONS } from "./sensor-probes";
import { GATEWAY_POS } from "./gateway-hub";
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

function ProbeToGatewayParticle({ from, speed, offset, color, active }) {
  const ref = useRef();
  const gw = useMemo(() => [GATEWAY_POS[0], GATEWAY_POS[1] + 0.6, GATEWAY_POS[2]], []);
  const ctrl = useMemo(
    () => [(from[0] + gw[0]) / 2, 0.8, (from[2] + gw[2]) / 2],
    [from, gw]
  );

  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() * speed + offset) % 1;
    const [x, y, z] = quadBezier(from, ctrl, gw, t);
    ref.current.position.set(x, y, z);
    const opacityTarget = Math.sin(t * Math.PI) * (active ? 0.98 : 0.18);
    ref.current.material.opacity = MathUtils.lerp(ref.current.material.opacity, opacityTarget, 0.08);
    ref.current.material.emissiveIntensity = MathUtils.lerp(
      ref.current.material.emissiveIntensity,
      active ? 2.8 : 0.6,
      0.08
    );
  });

  return (
    <mesh ref={ref}>
      <tetrahedronGeometry args={[0.06, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        flatShading
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function GatewayToCloudParticle({ speed, offset, color, active }) {
  const ref = useRef();
  const from = useMemo(() => [GATEWAY_POS[0], GATEWAY_POS[1] + 1.0, GATEWAY_POS[2]], []);
  const to = useMemo(() => CLOUD_POS, []);
  const ctrl = useMemo(
    () => [(from[0] + to[0]) / 2 + 0.3, 7, (from[2] + to[2]) / 2],
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

export default function DataFlowParticles({ activeStage = 0 }) {
  const probeParticles = useMemo(() => {
    const particles = [];
    PROBE_POSITIONS.forEach((pos, i) => {
      for (let j = 0; j < 2; j++) {
        particles.push({
          key: `p2g-${i}-${j}`,
          from: [pos[0], pos[1] + 0.3, pos[2]],
          speed: 0.25 + j * 0.08,
          offset: i * 0.15 + j * 0.5,
          color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
        });
      }
    });
    return particles;
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
      {probeParticles.map((p) => (
        <ProbeToGatewayParticle
          key={p.key}
          from={p.from}
          speed={p.speed}
          offset={p.offset}
          color={p.color}
          active={activeStage === 1}
        />
      ))}
      {cloudParticles.map((p) => (
        <GatewayToCloudParticle
          key={p.key}
          speed={p.speed}
          offset={p.offset}
          color={p.color}
          active={activeStage === 2}
        />
      ))}
    </>
  );
}
