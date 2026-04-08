"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, Float32BufferAttribute } from "three";

// River meander function — shared with sensor-probes for alignment
export function riverCenterX(z) {
  return (
    Math.sin(z * 0.11 - 0.55) * 1.7 +
    Math.sin(z * 0.27 + 1.15) * 0.72 +
    Math.sin(z * 0.05 - 1.1) * 0.46
  );
}

function riverHalfWidth(z) {
  return 2.45 + Math.sin(z * 0.18 + 0.9) * 0.32 + Math.sin(z * 0.07 - 0.35) * 0.18;
}

const RIVER_LENGTH = 24; // z from -12 to +12
const SEGMENTS_Z = 80;
const SEGMENTS_X = 16;

export default function WaterSurface() {
  const meshRef = useRef();

  const { geometry, riverbedGeometry, baseYPositions } = useMemo(() => {
    const g = new BufferGeometry();
    const vertices = [];
    const indices = [];

    // Build vertex grid
    for (let iz = 0; iz <= SEGMENTS_Z; iz++) {
      const z = -RIVER_LENGTH / 2 + (iz / SEGMENTS_Z) * RIVER_LENGTH;
      const cx = riverCenterX(z);
      const halfW = riverHalfWidth(z);
      for (let ix = 0; ix <= SEGMENTS_X; ix++) {
        const localX = -halfW + (ix / SEGMENTS_X) * halfW * 2;
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
    const bedGeometry = g.clone();
    return {
      geometry: g,
      riverbedGeometry: bedGeometry,
      baseYPositions: new Float32Array(vertices.filter((_, index) => index % 3 === 1)),
    };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pos = meshRef.current.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(
        i,
        baseYPositions[i] +
          Math.sin(x * 0.22 + t * 0.16) * 0.012 +
          Math.sin(z * 0.16 + t * 0.12) * 0.008 +
          Math.sin((x + z) * 0.24 + t * 0.1) * 0.004
      );
    }
    pos.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <>
      <mesh geometry={riverbedGeometry} position={[0, 0.002, 0]}>
        <meshStandardMaterial
          color="#5c4a34"
          emissive="#3f2f1f"
          emissiveIntensity={0.08}
          metalness={0.04}
          roughness={0.92}
          flatShading
        />
      </mesh>
      <mesh ref={meshRef} geometry={geometry} position={[0, 0.035, 0]}>
        <meshStandardMaterial
          color="#1f647d"
          emissive="#154c64"
          emissiveIntensity={0.3}
          metalness={0.14}
          roughness={0.54}
          flatShading
          transparent
          opacity={0.94}
        />
      </mesh>
    </>
  );
}
