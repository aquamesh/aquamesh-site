"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

export const PROBE_POSITIONS = [
  [-3, 0.1, -2],
  [-1, 0.1, -3],
  [1.5, 0.1, -1],
  [-2, 0.1, 1],
  [0.5, 0.1, 2],
  [3, 0.1, 0],
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

function Probe({ position, index }) {
  const ringRef = useRef();
  const crystalRef = useRef();
  const colors = PROBE_COLORS[index % PROBE_COLORS.length];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.material.emissiveIntensity =
        0.5 + Math.sin(t * 1.5 + index * 1.2) * 0.4;
    }
    if (crystalRef.current) {
      crystalRef.current.rotation.y = t * 0.4 + index;
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
        <pointLight color={colors.accent} intensity={0.5} distance={2.5} position={[0, 0.3, 0]} />
      </group>
    </Float>
  );
}

export default function SensorProbes() {
  return (
    <>
      {PROBE_POSITIONS.map((pos, i) => (
        <Probe key={i} position={pos} index={i} />
      ))}
    </>
  );
}
