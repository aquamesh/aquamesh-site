"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { MathUtils } from "three";
import { riverCenterX } from "./water-surface";

const PROBE_LAYOUT = [
  { z: -3.2, offset: -0.72 },
  { z: -1.6, offset: 0.58 },
  { z: 0.1, offset: -0.46 },
  { z: 1.7, offset: 0.74 },
  { z: 3.1, offset: -0.28 },
  { z: 4.6, offset: 0.62 },
];

export const PROBE_POSITIONS = PROBE_LAYOUT.map(({ z, offset }) => [
  riverCenterX(z) + offset,
  0.1,
  z,
]);

// Muted indicator LED color per probe
const LED_COLORS = [
  "#22d3ee",
  "#34d399",
  "#67e8f9",
  "#22d3ee",
  "#34d399",
  "#67e8f9",
];

function Probe({ position, index, active }) {
  const bodyRef = useRef();
  const capRef = useRef();
  const ledRef = useRef();
  const lightRef = useRef();
  const ledColor = LED_COLORS[index % LED_COLORS.length];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ledRef.current) {
      ledRef.current.material.emissiveIntensity = MathUtils.lerp(
        ledRef.current.material.emissiveIntensity,
        active
          ? 1.2 + Math.sin(t * 2 + index * 1.2) * 0.4
          : 0.3 + Math.sin(t * 0.8 + index) * 0.1,
        0.08
      );
    }
    if (lightRef.current) {
      lightRef.current.intensity = MathUtils.lerp(
        lightRef.current.intensity,
        active ? 0.4 : 0.08,
        0.08
      );
    }
  });

  return (
    <Float speed={1.8} floatIntensity={0.08} rotationIntensity={0}>
      <group position={position}>
        {/* Main cylindrical sensor body */}
        <mesh ref={bodyRef} position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.07, 0.09, 0.38, 12]} />
          <meshStandardMaterial
            color="#a8b6c4"
            emissive="#5f6f7e"
            emissiveIntensity={0.08}
            metalness={0.85}
            roughness={0.18}
          />
        </mesh>
        {/* Top cap — slightly wider ring */}
        <mesh ref={capRef} position={[0, 0.42, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.04, 12]} />
          <meshStandardMaterial
            color="#758495"
            emissive="#465362"
            emissiveIntensity={0.05}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
        {/* Bottom tip — tapered sensor tip */}
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.06, 0.02, 0.08, 12]} />
          <meshStandardMaterial
            color="#8899ab"
            emissive="#4f6070"
            emissiveIntensity={0.05}
            metalness={0.85}
            roughness={0.18}
          />
        </mesh>
        {/* Small LED indicator on upper body */}
        <mesh ref={ledRef} position={[0.075, 0.36, 0]}>
          <sphereGeometry args={[0.018, 8, 8]} />
          <meshStandardMaterial
            color={ledColor}
            emissive={ledColor}
            emissiveIntensity={0.4}
          />
        </mesh>
        {/* Subtle point light from LED */}
        <pointLight
          ref={lightRef}
          color={ledColor}
          intensity={active ? 0.4 : 0.08}
          distance={1.5}
          position={[0.1, 0.36, 0]}
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
