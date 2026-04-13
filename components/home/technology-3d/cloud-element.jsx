"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { MathUtils } from "three";

const CLOUD_POS = [6.45, 5.2, 9.2];

export { CLOUD_POS };

// Abstract cloud: cluster of low-poly rotating polyhedra with vivid color
function CloudShard({ position, size, color, emissive, setRef }) {
  return (
    <mesh ref={setRef} position={position}>
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
  { pos: [0, 0, 0], size: 0.86, color: "#6ecff6", emissive: "#1c9dbb", speed: 0.15, axis: [1, 0.6, 0] },
  { pos: [1.18, 0.18, 0.18], size: 0.6, color: "#a8e6cf", emissive: "#94d2bd", speed: 0.2, axis: [0.3, 1, 0.5] },
  { pos: [-1.02, 0.16, 0.18], size: 0.68, color: "#88d8f7", emissive: "#1c9dbb", speed: 0.12, axis: [0.7, 0.2, 1] },
  { pos: [0.32, -0.48, -0.35], size: 0.5, color: "#c4b5fd", emissive: "#8b5cf6", speed: 0.25, axis: [0.4, 1, 0.3] },
  { pos: [-0.34, 0.7, -0.18], size: 0.45, color: "#67e8f9", emissive: "#06b6d4", speed: 0.18, axis: [1, 0.4, 0.7] },
];

export default function CloudElement({ active = false }) {
  const mainLightRef = useRef();
  const accentLightRef = useRef();
  const shardRefs = useRef([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    for (let i = 0; i < SHARDS.length; i++) {
      const shard = shardRefs.current[i];
      if (!shard) continue;
      const { speed, axis } = SHARDS[i];

      shard.rotation.x = axis[0] * t * speed;
      shard.rotation.y = axis[1] * t * speed;
      shard.rotation.z = axis[2] * t * speed;
      shard.material.emissiveIntensity = MathUtils.lerp(
        shard.material.emissiveIntensity,
        active ? 1.05 : 0.28,
        0.08
      );
      shard.material.opacity = MathUtils.lerp(
        shard.material.opacity,
        active ? 0.98 : 0.48,
        0.08
      );
      const s = MathUtils.lerp(shard.scale.x, active ? 1.1 : 1, 0.08);
      shard.scale.setScalar(s);
    }

    if (mainLightRef.current) {
      mainLightRef.current.intensity = MathUtils.lerp(
        mainLightRef.current.intensity,
        active ? 2.15 : 0.95,
        0.08
      );
    }
    if (accentLightRef.current) {
      accentLightRef.current.intensity = MathUtils.lerp(
        accentLightRef.current.intensity,
        active ? 1.1 : 0.45,
        0.08
      );
    }
  });

  return (
    <Float speed={0.6} floatIntensity={0.22} rotationIntensity={0.03}>
      <group position={CLOUD_POS} scale={1.16}>
        {SHARDS.map((s, i) => (
          <CloudShard
            key={i}
            position={s.pos}
            size={s.size}
            color={s.color}
            emissive={s.emissive}
            setRef={(el) => (shardRefs.current[i] = el)}
          />
        ))}
        <pointLight
          ref={mainLightRef}
          color="#67e8f9"
          intensity={active ? 2.15 : 0.95}
          distance={12}
          position={[0.15, -0.8, 0]}
        />
        <pointLight
          ref={accentLightRef}
          color="#c4b5fd"
          intensity={active ? 1.1 : 0.45}
          distance={7}
          position={[1.1, 0.1, 0.5]}
        />
      </group>
    </Float>
  );
}
