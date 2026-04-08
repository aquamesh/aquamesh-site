"use client";

import { useMemo } from "react";
import { BufferGeometry, Color, Float32BufferAttribute } from "three";
import {
  TERRAIN_LENGTH,
  TERRAIN_WIDTH,
  shorelineBlend,
  terrainHeight,
  waterwaySignedDistance,
} from "./river-geometry";

const TERRAIN_SEGMENTS_X = 110;
const TERRAIN_SEGMENTS_Z = 150;
const TERRAIN_MIN_Z = -20;
const TERRAIN_MAX_Z = TERRAIN_LENGTH / 2;

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function smoothstep(edge0, edge1, value) {
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function buildTerrainGeometry() {
  const geometry = new BufferGeometry();
  const vertices = [];
  const colors = [];
  const indices = [];
  const wetSand = new Color("#b69873");
  const drySand = new Color("#ceb48f");
  const deltaGrass = new Color("#7f9d6f");
  const uplandGrass = new Color("#789368");
  const moss = new Color("#698660");
  const silt = new Color("#9e8866");
  const tempColor = new Color();

  const terrainZRange = TERRAIN_MAX_Z - TERRAIN_MIN_Z;

  for (let iz = 0; iz <= TERRAIN_SEGMENTS_Z; iz++) {
    const z = TERRAIN_MIN_Z + (iz / TERRAIN_SEGMENTS_Z) * terrainZRange;

    for (let ix = 0; ix <= TERRAIN_SEGMENTS_X; ix++) {
      const x = -TERRAIN_WIDTH / 2 + (ix / TERRAIN_SEGMENTS_X) * TERRAIN_WIDTH;
      const y = terrainHeight(x, z);
      const shore = shorelineBlend(x, z);
      const waterDistance = waterwaySignedDistance(x, z);
      const uplandMix = clamp01((1.8 - z) / 15);
      const edgeMix = clamp01((Math.abs(x) - 2.5) / 8);
      const duneMix = smoothstep(-1.4, 8.5, z);

      if (waterDistance < 0) {
        tempColor.copy(silt).lerp(wetSand, shore * 0.55);
      } else {
        tempColor
          .copy(deltaGrass)
          .lerp(uplandGrass, uplandMix * 0.42)
          .lerp(moss, edgeMix * 0.35)
          .lerp(wetSand, shore * 0.42)
          .lerp(drySand, shore * 0.62 + duneMix * 0.12);
      }

      vertices.push(x, y, z);
      colors.push(tempColor.r, tempColor.g, tempColor.b);
    }
  }

  for (let iz = 0; iz < TERRAIN_SEGMENTS_Z; iz++) {
    for (let ix = 0; ix < TERRAIN_SEGMENTS_X; ix++) {
      const a = iz * (TERRAIN_SEGMENTS_X + 1) + ix;
      const b = a + 1;
      const c = a + (TERRAIN_SEGMENTS_X + 1);
      const d = c + 1;
      indices.push(a, c, b);
      indices.push(b, c, d);
    }
  }

  geometry.setIndex(indices);
  geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
  geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
  geometry.computeVertexNormals();

  return geometry;
}

export default function MountainTerrain() {
  const terrainGeometry = useMemo(() => buildTerrainGeometry(), []);

  return (
    <>
      <mesh position={[0, -0.46, -2.5]} receiveShadow>
        <boxGeometry args={[24.9, 0.32, 36]} />
        <meshStandardMaterial
          color="#8d7357"
          emissive="#6e573f"
          emissiveIntensity={0.06}
          roughness={0.98}
          metalness={0.02}
        />
      </mesh>
      <mesh geometry={terrainGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          vertexColors
          emissive="#41543f"
          emissiveIntensity={0.08}
          roughness={0.96}
          metalness={0.02}
        />
      </mesh>
    </>
  );
}
