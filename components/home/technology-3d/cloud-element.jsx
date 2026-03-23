"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

const CLOUD_POS = [2, 6, -1];

export { CLOUD_POS };

// Abstract cloud: cluster of low-poly rotating polyhedra with vivid color
function CloudShard({ position, size, color, emissive, speed, axis }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.x = axis[0] * t * speed;
    ref.current.rotation.y = axis[1] * t * speed;
    ref.current.rotation.z = axis[2] * t * speed;
  });
  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[size, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.4}
        flatShading
        transparent
        opacity={0.75}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
}

const SHARDS = [
  { pos: [0, 0, 0], size: 0.55, color: "#6ecff6", emissive: "#1c9dbb", speed: 0.15, axis: [1, 0.6, 0] },
  { pos: [0.7, 0.2, 0.2], size: 0.4, color: "#a8e6cf", emissive: "#94d2bd", speed: 0.2, axis: [0.3, 1, 0.5] },
  { pos: [-0.55, 0.15, 0.15], size: 0.45, color: "#88d8f7", emissive: "#1c9dbb", speed: 0.12, axis: [0.7, 0.2, 1] },
  { pos: [0.2, -0.3, -0.3], size: 0.35, color: "#c4b5fd", emissive: "#8b5cf6", speed: 0.25, axis: [0.4, 1, 0.3] },
  { pos: [-0.2, 0.45, -0.15], size: 0.3, color: "#67e8f9", emissive: "#06b6d4", speed: 0.18, axis: [1, 0.4, 0.7] },
];

export default function CloudElement() {
  return (
    <Float speed={0.6} floatIntensity={0.3} rotationIntensity={0.03}>
      <group position={CLOUD_POS}>
        {SHARDS.map((s, i) => (
          <CloudShard
            key={i}
            position={s.pos}
            size={s.size}
            color={s.color}
            emissive={s.emissive}
            speed={s.speed}
            axis={s.axis}
          />
        ))}
        {/* Colored glow underneath */}
        <pointLight color="#67e8f9" intensity={0.8} distance={5} position={[0, -0.6, 0]} />
        <pointLight color="#c4b5fd" intensity={0.3} distance={3} position={[0.5, 0, 0.3]} />
      </group>
    </Float>
  );
}
