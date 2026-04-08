"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { MathUtils } from "three";
import { sampleChannelPoint, waterSurfaceY } from "./river-geometry";

const PROBE_LAYOUT = [
  { channelId: "main", z: -6.2, lateral: -0.22 },
  { channelId: "main", z: -4.3, lateral: 0.18 },
  { channelId: "main", z: -2.1, lateral: -0.14 },
  { channelId: "center", z: 0.9, lateral: 0.14 },
  { channelId: "east-primary", z: 2.8, lateral: -0.16 },
  { channelId: "west-primary", z: 4.5, lateral: 0.12 },
  { x: -5.4, z: 8.4 },
  { x: -2.0, z: 9.7 },
  { x: 0.8, z: 9.2 },
];

export const PROBE_POSITIONS = PROBE_LAYOUT.map(({ channelId, x, z, lateral = 0 }) => {
  const [positionX, y, positionZ] = channelId
    ? sampleChannelPoint(channelId, z, lateral)
    : [x, waterSurfaceY(x, z), z];
  return [positionX, y + 0.055, positionZ];
});

const LED_COLORS = [
  "#22d3ee",
  "#34d399",
  "#67e8f9",
  "#22d3ee",
  "#34d399",
  "#67e8f9",
  "#38bdf8",
  "#60a5fa",
  "#22d3ee",
];

function ProbeShadow() {
  return (
    <mesh
      position={[0, -0.055, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[0.36, 0.24, 1]}
      receiveShadow
    >
      <circleGeometry args={[1, 20]} />
      <meshBasicMaterial
        color="#061017"
        transparent
        opacity={0.24}
        depthWrite={false}
      />
    </mesh>
  );
}

function Probe({ position, index, active }) {
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
    <group position={position}>
      <ProbeShadow />
      <Float speed={1.8} floatIntensity={0.08} rotationIntensity={0}>
        <group>
          <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.07, 0.09, 0.38, 12]} />
            <meshStandardMaterial
              color="#a8b6c4"
              emissive="#5f6f7e"
              emissiveIntensity={0.08}
              metalness={0.85}
              roughness={0.18}
            />
          </mesh>
          <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.04, 12]} />
            <meshStandardMaterial
              color="#758495"
              emissive="#465362"
              emissiveIntensity={0.05}
              metalness={0.9}
              roughness={0.15}
            />
          </mesh>
          <mesh position={[0, 0.01, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.06, 0.02, 0.08, 12]} />
            <meshStandardMaterial
              color="#8899ab"
              emissive="#4f6070"
              emissiveIntensity={0.05}
              metalness={0.85}
              roughness={0.18}
            />
          </mesh>
          <mesh ref={ledRef} position={[0.075, 0.36, 0]} castShadow>
            <sphereGeometry args={[0.018, 8, 8]} />
            <meshStandardMaterial
              color={ledColor}
              emissive={ledColor}
              emissiveIntensity={0.4}
            />
          </mesh>
          <pointLight
            ref={lightRef}
            color={ledColor}
            intensity={active ? 0.4 : 0.08}
            distance={1.5}
            position={[0.1, 0.36, 0]}
          />
        </group>
      </Float>
    </group>
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
