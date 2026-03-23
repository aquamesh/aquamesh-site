"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { PlaneGeometry } from "three";

export default function WaterSurface() {
  const meshRef = useRef();
  // Low-poly water — fewer segments for faceted look
  const geo = useMemo(() => {
    const g = new PlaneGeometry(22, 22, 32, 32);
    g.rotateX(-Math.PI / 2);
    return g;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pos = meshRef.current.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(
        i,
        Math.sin(x * 0.35 + t * 0.5) * 0.1 +
        Math.sin(z * 0.25 + t * 0.4) * 0.07 +
        Math.sin((x + z) * 0.5 + t * 0.3) * 0.04
      );
    }
    pos.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} geometry={geo}>
      <meshStandardMaterial
        color="#0c3547"
        emissive="#0a2a3a"
        emissiveIntensity={0.15}
        metalness={0.1}
        roughness={0.65}
        flatShading
        transparent
        opacity={0.92}
      />
    </mesh>
  );
}
