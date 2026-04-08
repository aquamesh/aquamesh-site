"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { MathUtils } from "three";

const GATEWAY_POS = [3.5, 1.2, 0];
const GATEWAY_MODEL_SCALE = 0.68;
const GATEWAY_BOX_CENTER_LOCAL = [0, 1.34, 0.36];
const GATEWAY_BOX_CENTER = [
  GATEWAY_POS[0] + GATEWAY_BOX_CENTER_LOCAL[0] * GATEWAY_MODEL_SCALE,
  GATEWAY_POS[1] + GATEWAY_BOX_CENTER_LOCAL[1] * GATEWAY_MODEL_SCALE,
  GATEWAY_POS[2] + GATEWAY_BOX_CENTER_LOCAL[2] * GATEWAY_MODEL_SCALE,
];

export { GATEWAY_POS, GATEWAY_BOX_CENTER };

export default function GatewayHub({ active = false }) {
  const mainLightRef = useRef();
  const accentLightRef = useRef();

  useFrame(() => {
    if (mainLightRef.current) {
      mainLightRef.current.intensity = MathUtils.lerp(
        mainLightRef.current.intensity,
        active ? 1.9 : 0.8,
        0.08
      );
    }
    if (accentLightRef.current) {
      accentLightRef.current.intensity = MathUtils.lerp(
        accentLightRef.current.intensity,
        active ? 0.95 : 0.35,
        0.08
      );
    }
  });

  return (
    <group position={GATEWAY_POS}>
      <group scale={GATEWAY_MODEL_SCALE}>
        <mesh position={[0, -0.06, 0]}>
          <cylinderGeometry args={[0.18, 0.22, 0.16, 12]} />
          <meshStandardMaterial
            color="#50606d"
            emissive="#2c3742"
            emissiveIntensity={0.05}
            roughness={0.72}
            metalness={0.42}
          />
        </mesh>

        <mesh position={[0, 0.98, 0]}>
          <cylinderGeometry args={[0.08, 0.1, 1.96, 10]} />
          <meshStandardMaterial
            color="#8e98a2"
            emissive="#54606a"
            emissiveIntensity={0.08}
            roughness={0.36}
            metalness={0.78}
          />
        </mesh>

        <mesh position={[0, 2.04, 0]}>
          <boxGeometry args={[0.16, 0.16, 0.28]} />
          <meshStandardMaterial
            color="#8b96a0"
            emissive="#505b66"
            emissiveIntensity={0.08}
            roughness={0.34}
            metalness={0.76}
          />
        </mesh>

        <mesh position={[0, 1.34, 0.14]}>
          <boxGeometry args={[0.16, 0.1, 0.24]} />
          <meshStandardMaterial
            color="#7f8b96"
            emissive="#49535d"
            emissiveIntensity={0.06}
            roughness={0.38}
            metalness={0.74}
          />
        </mesh>

        <RoundedBox
          args={[0.46, 0.52, 0.18]}
          radius={0.08}
          smoothness={5}
          position={[0, 1.34, 0.36]}
          rotation={[0, 0, 0]}
          castShadow
        >
          <meshStandardMaterial
            color="#aab3bc"
            emissive="#606b76"
            emissiveIntensity={active ? 0.34 : 0.18}
            roughness={0.28}
            metalness={0.74}
          />
        </RoundedBox>

        <mesh position={[0, 2.2, 0]}>
          <boxGeometry args={[0.18, 0.16, 0.18]} />
          <meshStandardMaterial
            color="#8b97a2"
            emissive="#515c66"
            emissiveIntensity={0.06}
            roughness={0.34}
            metalness={0.78}
          />
        </mesh>

        <mesh position={[0, 2.56, 0.1]} rotation={[-Math.PI / 4, 0, 0]}>
          <boxGeometry args={[0.08, 0.4, 0.08]} />
          <meshStandardMaterial
            color="#8b97a2"
            emissive="#515c66"
            emissiveIntensity={0.06}
            roughness={0.34}
            metalness={0.78}
          />
        </mesh>

        <group position={[0, 2.74, 0.18]} rotation={[-Math.PI / 4, 0, 0]}>
          <RoundedBox args={[1.16, 0.78, 0.06]} radius={0.04} smoothness={4}>
            <meshStandardMaterial
              color="#6d7781"
              emissive="#3e4851"
              emissiveIntensity={0.08}
              roughness={0.34}
              metalness={0.74}
            />
          </RoundedBox>
          <mesh position={[0, 0, 0.038]}>
            <boxGeometry args={[1.0, 0.62, 0.02]} />
            <meshStandardMaterial
              color="#255a74"
              emissive="#1d6f8d"
              emissiveIntensity={active ? 0.24 : 0.12}
              roughness={0.42}
              metalness={0.16}
            />
          </mesh>
        </group>
      </group>

      <pointLight
        ref={mainLightRef}
        color="#22d3ee"
        intensity={active ? 1.9 : 0.8}
        distance={7}
        position={[0.15, 1.75, 1.0]}
      />
      <pointLight
        ref={accentLightRef}
        color="#34d399"
        intensity={active ? 0.95 : 0.35}
        distance={5}
        position={[0, 2.78, 0.92]}
      />
    </group>
  );
}
