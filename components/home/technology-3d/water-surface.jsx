"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, Color, Float32BufferAttribute } from "three";
import {
  RIVER_LENGTH,
  riverCenterX,
  riverHalfWidth,
  riverbedY,
  waterColorMix,
  waterSurfaceY,
} from "./river-geometry";

export { riverCenterX, riverHalfWidth } from "./river-geometry";

const SEGMENTS_Z = 80;
const SEGMENTS_X = 18;

export default function WaterSurface() {
  const meshRef = useRef();

  const { geometry, riverbedGeometry, baseYPositions } = useMemo(() => {
    const surfaceGeometry = new BufferGeometry();
    const bedGeometry = new BufferGeometry();
    const surfaceVertices = [];
    const bedVertices = [];
    const surfaceColors = [];
    const bedColors = [];
    const indices = [];
    const shallowColor = new Color("#2f7f8f");
    const deepColor = new Color("#12536d");
    const bedEdgeColor = new Color("#6d5b43");
    const bedCenterColor = new Color("#493521");

    for (let iz = 0; iz <= SEGMENTS_Z; iz++) {
      const z = -RIVER_LENGTH / 2 + (iz / SEGMENTS_Z) * RIVER_LENGTH;
      const cx = riverCenterX(z);
      const halfW = riverHalfWidth(z);

      for (let ix = 0; ix <= SEGMENTS_X; ix++) {
        const ratio = ix / SEGMENTS_X;
        const localRatio = ratio * 2 - 1;
        const x = cx + localRatio * halfW;
        const waterY = waterSurfaceY(localRatio, z);
        const bedY = riverbedY(localRatio, z);
        const waterMix = waterColorMix(localRatio, z);
        const surfaceColor = shallowColor.clone().lerp(deepColor, waterMix);
        const bedColor = bedEdgeColor.clone().lerp(bedCenterColor, waterMix * 0.9);

        surfaceVertices.push(x, waterY, z);
        bedVertices.push(x, bedY, z);
        surfaceColors.push(surfaceColor.r, surfaceColor.g, surfaceColor.b);
        bedColors.push(bedColor.r, bedColor.g, bedColor.b);
      }
    }

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

    surfaceGeometry.setIndex(indices);
    surfaceGeometry.setAttribute("position", new Float32BufferAttribute(surfaceVertices, 3));
    surfaceGeometry.setAttribute("color", new Float32BufferAttribute(surfaceColors, 3));
    surfaceGeometry.computeVertexNormals();

    bedGeometry.setIndex(indices);
    bedGeometry.setAttribute("position", new Float32BufferAttribute(bedVertices, 3));
    bedGeometry.setAttribute("color", new Float32BufferAttribute(bedColors, 3));
    bedGeometry.computeVertexNormals();

    return {
      geometry: surfaceGeometry,
      riverbedGeometry: bedGeometry,
      baseYPositions: new Float32Array(
        surfaceVertices.filter((_, index) => index % 3 === 1)
      ),
    };
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const t = clock.getElapsedTime();
    const pos = meshRef.current.geometry.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(
        i,
        baseYPositions[i] +
          Math.sin(x * 0.24 + t * 0.16) * 0.012 +
          Math.sin(z * 0.17 + t * 0.12) * 0.008 +
          Math.sin((x + z) * 0.21 + t * 0.1) * 0.004
      );
    }

    pos.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <>
      <mesh geometry={riverbedGeometry} position={[0, 0.004, 0]} castShadow receiveShadow>
        <meshStandardMaterial
          vertexColors
          emissive="#2f2318"
          emissiveIntensity={0.12}
          metalness={0.03}
          roughness={0.95}
        />
      </mesh>
      <mesh ref={meshRef} geometry={geometry} position={[0, 0, 0]} receiveShadow>
        <meshStandardMaterial
          vertexColors
          emissive="#0d4054"
          emissiveIntensity={0.28}
          metalness={0.12}
          roughness={0.48}
          transparent
          opacity={0.94}
        />
      </mesh>
    </>
  );
}
