"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

const GATEWAY_POS = [6, 0, 0];

export { GATEWAY_POS };

// Abstract gateway: a cluster of low-poly geometric shards that pulse
function GatewayCrystal({ position, size, color, emissive, rotSpeed, axis }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.x = axis[0] * t * rotSpeed;
    ref.current.rotation.y = axis[1] * t * rotSpeed;
  });
  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[size, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.5}
        flatShading
        roughness={0.35}
        metalness={0.15}
      />
    </mesh>
  );
}

export default function GatewayHub() {
  const ringRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.y = t * 0.3;
      ringRef.current.material.emissiveIntensity = 0.3 + Math.sin(t * 1.2) * 0.2;
    }
  });

  return (
    <group position={GATEWAY_POS}>
      {/* Shore / land — low-poly rough terrain */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.5, 0.01, 0]}>
        <planeGeometry args={[5, 10, 6, 6]} />
        <meshStandardMaterial color="#1a3b2a" roughness={0.95} flatShading />
      </mesh>

      {/* Main crystal */}
      <Float speed={1.2} floatIntensity={0.1} rotationIntensity={0}>
        <group position={[0, 1.0, 0]}>
          <GatewayCrystal
            position={[0, 0, 0]}
            size={0.45}
            color="#22d3ee"
            emissive="#0891b2"
            rotSpeed={0.2}
            axis={[0.5, 1]}
          />
          <GatewayCrystal
            position={[0.35, -0.4, 0.2]}
            size={0.25}
            color="#34d399"
            emissive="#059669"
            rotSpeed={0.3}
            axis={[1, 0.6]}
          />
          <GatewayCrystal
            position={[-0.3, -0.3, -0.15]}
            size={0.2}
            color="#a78bfa"
            emissive="#7c3aed"
            rotSpeed={0.25}
            axis={[0.3, 1]}
          />
        </group>
      </Float>

      {/* Rotating hex ring around the gateway */}
      <mesh ref={ringRef} position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.8, 0.03, 6, 6]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.4}
          flatShading
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Glow */}
      <pointLight color="#22d3ee" intensity={1.0} distance={5} position={[0, 1.5, 0]} />
      <pointLight color="#34d399" intensity={0.4} distance={3} position={[0.3, 0.8, 0.2]} />
    </group>
  );
}
