"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { MathUtils } from "three";

const CLOUD_POS = [0.35, 4.8, -0.45];

export { CLOUD_POS };

// Abstract cloud: cluster of low-poly rotating polyhedra with vivid color
function CloudShard({ position, size, color, emissive, speed, axis, active }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.x = axis[0] * t * speed;
    ref.current.rotation.y = axis[1] * t * speed;
    ref.current.rotation.z = axis[2] * t * speed;
    ref.current.material.emissiveIntensity = MathUtils.lerp(
      ref.current.material.emissiveIntensity,
      active ? 1.05 : 0.28,
      0.08
    );
    ref.current.material.opacity = MathUtils.lerp(
      ref.current.material.opacity,
      active ? 0.98 : 0.48,
      0.08
    );
    const s = MathUtils.lerp(ref.current.scale.x, active ? 1.1 : 1, 0.08);
    ref.current.scale.setScalar(s);
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
  { pos: [0, 0, 0], size: 0.42, color: "#6ecff6", emissive: "#1c9dbb", speed: 0.15, axis: [1, 0.6, 0] },
  { pos: [0.55, 0.15, 0.15], size: 0.3, color: "#a8e6cf", emissive: "#94d2bd", speed: 0.2, axis: [0.3, 1, 0.5] },
  { pos: [-0.42, 0.12, 0.12], size: 0.34, color: "#88d8f7", emissive: "#1c9dbb", speed: 0.12, axis: [0.7, 0.2, 1] },
  { pos: [0.15, -0.22, -0.22], size: 0.26, color: "#c4b5fd", emissive: "#8b5cf6", speed: 0.25, axis: [0.4, 1, 0.3] },
  { pos: [-0.15, 0.34, -0.12], size: 0.22, color: "#67e8f9", emissive: "#06b6d4", speed: 0.18, axis: [1, 0.4, 0.7] },
];

export default function CloudElement({ active = false }) {
  const mainLightRef = useRef();
  const accentLightRef = useRef();

  useFrame(() => {
    if (mainLightRef.current) {
      mainLightRef.current.intensity = MathUtils.lerp(
        mainLightRef.current.intensity,
        active ? 1.4 : 0.45,
        0.08
      );
    }
    if (accentLightRef.current) {
      accentLightRef.current.intensity = MathUtils.lerp(
        accentLightRef.current.intensity,
        active ? 0.7 : 0.15,
        0.08
      );
    }
  });

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
            active={active}
          />
        ))}
        <pointLight
          ref={mainLightRef}
          color="#67e8f9"
          intensity={active ? 1.4 : 0.45}
          distance={5}
          position={[0, -0.6, 0]}
        />
        <pointLight
          ref={accentLightRef}
          color="#c4b5fd"
          intensity={active ? 0.7 : 0.15}
          distance={3}
          position={[0.5, 0, 0.3]}
        />
      </group>
    </Float>
  );
}
