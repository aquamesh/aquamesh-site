"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { MathUtils } from "three";

const GATEWAY_POS = [0.35, 2.2, -0.2];

export { GATEWAY_POS };

export default function GatewayHub({ active = false }) {
  const mainLightRef = useRef();
  const accentLightRef = useRef();

  useFrame(() => {
    if (mainLightRef.current) {
      mainLightRef.current.intensity = MathUtils.lerp(
        mainLightRef.current.intensity,
        active ? 1.6 : 0.55,
        0.08
      );
    }
    if (accentLightRef.current) {
      accentLightRef.current.intensity = MathUtils.lerp(
        accentLightRef.current.intensity,
        active ? 0.8 : 0.2,
        0.08
      );
    }
  });

  return (
    <group position={GATEWAY_POS}>
      <Float speed={1.15} floatIntensity={0.09} rotationIntensity={0.02}>
        <group scale={0.75}>
          {/* Main box body */}
          <mesh position={[0, 0.55, 0]} castShadow>
            <boxGeometry args={[1.4, 0.5, 0.8]} />
            <meshStandardMaterial
              color="#1e4d6b"
              emissive="#0f3a55"
              emissiveIntensity={active ? 0.6 : 0.3}
              flatShading
              roughness={0.62}
              metalness={0.28}
            />
          </mesh>

          {/* Top lid / trim strip */}
          <mesh position={[0, 0.82, 0]}>
            <boxGeometry args={[1.44, 0.06, 0.84]} />
            <meshStandardMaterial
              color="#2a6a8a"
              emissive="#164a65"
              emissiveIntensity={active ? 0.7 : 0.35}
              flatShading
              roughness={0.44}
              metalness={0.38}
            />
          </mesh>

          {/* Front panel accent line */}
          <mesh position={[0, 0.55, 0.405]}>
            <boxGeometry args={[1.2, 0.06, 0.02]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#22d3ee"
              emissiveIntensity={active ? 0.9 : 0.25}
              roughness={0.2}
              metalness={0.5}
            />
          </mesh>

          {/* LED indicators on front face */}
          <mesh position={[-0.45, 0.62, 0.41]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial
              color="#34d399"
              emissive="#34d399"
              emissiveIntensity={active ? 1.8 : 0.4}
              roughness={0.1}
              metalness={0.1}
            />
          </mesh>
          <mesh position={[-0.35, 0.62, 0.41]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#22d3ee"
              emissiveIntensity={active ? 1.8 : 0.3}
              roughness={0.1}
              metalness={0.1}
            />
          </mesh>
          <mesh position={[-0.25, 0.62, 0.41]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial
              color="#f59e0b"
              emissive="#f59e0b"
              emissiveIntensity={active ? 1.2 : 0.2}
              roughness={0.1}
              metalness={0.1}
            />
          </mesh>


        </group>
      </Float>

      <pointLight
        ref={mainLightRef}
        color="#22d3ee"
        intensity={active ? 1.6 : 0.55}
        distance={6}
        position={[0, 1.5, 0.3]}
      />
      <pointLight
        ref={accentLightRef}
        color="#34d399"
        intensity={active ? 0.8 : 0.2}
        distance={4}
        position={[0, 0.6, 0.1]}
      />
    </group>
  );
}
