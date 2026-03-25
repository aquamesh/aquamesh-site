"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { MathUtils } from "three";

export const PROBE_POSITIONS = [
  [-1.8, 0.1, -1.2],
  [-0.6, 0.1, -1.8],
  [0.9, 0.1, -0.6],
  [-1.2, 0.1, 0.6],
  [0.3, 0.1, 1.2],
  [1.8, 0.1, 0],
];

// Alternate probe accent colors for variety
const PROBE_COLORS = [
  { body: "#0e4d6e", accent: "#22d3ee", emissive: "#0891b2" },
  { body: "#1a3d50", accent: "#34d399", emissive: "#059669" },
  { body: "#0e4d6e", accent: "#67e8f9", emissive: "#06b6d4" },
  { body: "#1a3d50", accent: "#a78bfa", emissive: "#7c3aed" },
  { body: "#0e4d6e", accent: "#f0abfc", emissive: "#c026d3" },
  { body: "#1a3d50", accent: "#fbbf24", emissive: "#d97706" },
];

function Probe({ position, index, active }) {
  const ringRef = useRef();
  const crystalRef = useRef();
  const lightRef = useRef();
  const colors = PROBE_COLORS[index % PROBE_COLORS.length];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current) {
      const target = active ? 1.25 : 0.42;
      ringRef.current.material.emissiveIntensity = MathUtils.lerp(
        ringRef.current.material.emissiveIntensity,
        target + Math.sin(t * 1.5 + index * 1.2) * (active ? 0.45 : 0.18),
        0.08
      );
      ringRef.current.material.opacity = MathUtils.lerp(
        ringRef.current.material.opacity,
        active ? 0.95 : 0.45,
        0.08
      );
    }
    if (crystalRef.current) {
      crystalRef.current.rotation.y = t * 0.4 + index;
      crystalRef.current.material.emissiveIntensity = MathUtils.lerp(
        crystalRef.current.material.emissiveIntensity,
        active ? 0.8 : 0.22,
        0.08
      );
      const s = MathUtils.lerp(crystalRef.current.scale.x, active ? 1.08 : 1, 0.08);
      crystalRef.current.scale.setScalar(s);
    }
    if (lightRef.current) {
      lightRef.current.intensity = MathUtils.lerp(
        lightRef.current.intensity,
        active ? 0.95 : 0.25,
        0.08
      );
    }
  });

  return (
    <Float speed={1.8} floatIntensity={0.08} rotationIntensity={0}>
      <group position={position}>
        {/* Low-poly probe crystal */}
        <mesh ref={crystalRef} position={[0, 0.25, 0]}>
          <octahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial
            color={colors.body}
            emissive={colors.emissive}
            emissiveIntensity={0.3}
            flatShading
            metalness={0.2}
            roughness={0.5}
          />
        </mesh>
        {/* Glow ring at water level — hex-shaped */}
        <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <ringGeometry args={[0.22, 0.38, 6]} />
          <meshStandardMaterial
            color={colors.accent}
            emissive={colors.accent}
            emissiveIntensity={0.7}
            flatShading
            transparent
            opacity={0.55}
          />
        </mesh>
        {/* Colored point light glow */}
        <pointLight
          ref={lightRef}
          color={colors.accent}
          intensity={active ? 0.95 : 0.25}
          distance={2.5}
          position={[0, 0.3, 0]}
        />
      </group>
    </Float>
  );
}

export default function SensorProbes({ active = false }) {
  return (
    <>
      {PROBE_POSITIONS.map((pos, i) => (
        <Probe key={i} position={pos} index={i} active={active} />
      ))}
    </>
  );
}
