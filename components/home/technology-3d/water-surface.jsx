"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, Float32BufferAttribute } from "three";

// River meander function — shared with sensor-probes for alignment
export function riverCenterX(z) {
  return Math.sin(z * 0.25) * 1.2;
}

const RIVER_LENGTH = 24; // z from -12 to +12
const RIVER_WIDTH = 4;
const SEGMENTS_Z = 80;
const SEGMENTS_X = 12;

export default function WaterSurface() {
  const meshRef = useRef();

  const geo = useMemo(() => {
    const g = new BufferGeometry();
    const vertices = [];
    const indices = [];
    const halfW = RIVER_WIDTH / 2;

    // Build vertex grid
    for (let iz = 0; iz <= SEGMENTS_Z; iz++) {
      const z = -RIVER_LENGTH / 2 + (iz / SEGMENTS_Z) * RIVER_LENGTH;
      const cx = riverCenterX(z);
      for (let ix = 0; ix <= SEGMENTS_X; ix++) {
        const localX = -halfW + (ix / SEGMENTS_X) * RIVER_WIDTH;
        vertices.push(cx + localX, 0, z);
      }
    }

    // Build triangle indices
    for (let iz = 0; iz < SEGMENTS_Z; iz++) {
      for (let ix = 0; ix < SEGMENTS_X; ix++) {
        const a = iz * (SEGMENTS_X + 1) + ix;
        const b = a + 1;
        const c = a + (SEGMENTS_X + 1);
        const d = c + 1;
        indices.push(a, c, b);
        indices.push(b, c, d);
      }
    }

    g.setIndex(indices);
    g.setAttribute("position", new Float32BufferAttribute(vertices, 3));
    g.computeVertexNormals();
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
        Math.sin(x * 0.35 + t * 0.5) * 0.08 +
        Math.sin(z * 0.25 + t * 0.4) * 0.06 +
        Math.sin((x + z) * 0.5 + t * 0.3) * 0.03
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
        opacity={0.88}
      />
    </mesh>
  );
}
