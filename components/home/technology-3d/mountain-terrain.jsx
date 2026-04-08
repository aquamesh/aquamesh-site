"use client";

import { useMemo } from "react";
import { BufferGeometry, Float32BufferAttribute } from "three";
import { RIVER_LENGTH, bankHeight, riverCenterX, riverHalfWidth } from "./river-geometry";

const LANDFORMS = [
  {
    pos: [-9.2, 0, -11.7],
    radii: [4.0, 3.0, 2.2],
    segments: 7,
    colors: ["#2a4a3f", "#366055", "#4b7b6c"],
  },
  {
    pos: [4.2, 0, -14.2],
    radii: [2.2, 1.65, 1.2],
    segments: 6,
    colors: ["#2c4d42", "#3a6458", "#4f8172"],
  },
  {
    pos: [9.2, 0, -10.8],
    radii: [4.5, 3.4, 2.5],
    segments: 8,
    colors: ["#29493e", "#355f53", "#4a7a6b"],
  },
  {
    pos: [-10.3, 0, -6.7],
    radii: [3.4, 2.5],
    segments: 6,
    colors: ["#2b493e", "#436e60"],
  },
  {
    pos: [10.2, 0, -7.1],
    radii: [3.6, 2.6],
    segments: 6,
    colors: ["#2a473d", "#416b5d"],
  },
  {
    pos: [-3.9, 0, -8.4],
    radii: [2.8, 1.9],
    segments: 6,
    colors: ["#2e4d42", "#487566"],
  },
  {
    pos: [5.8, 0, -14.6],
    radii: [1.65, 1.2],
    segments: 6,
    colors: ["#2d4c41", "#467264"],
  },
];

const BANK_SEGMENTS_Z = 84;
const BANK_SEGMENTS_X = 16;
const SHADOW_SEGMENTS_X = 5;
const BANK_WIDTH = 5.8;
const SHORE_SHADOW_WIDTH = 1.05;

function buildStripGeometry(side, width, segmentsX, yOffset = 0) {
  const geometry = new BufferGeometry();
  const vertices = [];
  const indices = [];

  for (let iz = 0; iz <= BANK_SEGMENTS_Z; iz++) {
    const z = -RIVER_LENGTH / 2 + (iz / BANK_SEGMENTS_Z) * RIVER_LENGTH;
    const cx = riverCenterX(z);
    const halfW = riverHalfWidth(z);
    const edgeX = cx + side * (halfW + 0.12);

    for (let ix = 0; ix <= segmentsX; ix++) {
      const t = ix / segmentsX;
      const lateralEase = 0.84 + Math.sin(z * 0.16 + side * 0.5) * 0.04;
      const x = edgeX + side * width * t * lateralEase;
      const y =
        bankHeight(side, z, t) +
        Math.sin(t * Math.PI) * 0.018 +
        Math.sin((z + side * 1.6) * 0.42 + t * 4.2) * 0.008 +
        yOffset;

      vertices.push(x, y, z);
    }
  }

  for (let iz = 0; iz < BANK_SEGMENTS_Z; iz++) {
    for (let ix = 0; ix < segmentsX; ix++) {
      const a = iz * (segmentsX + 1) + ix;
      const b = a + 1;
      const c = a + (segmentsX + 1);
      const d = c + 1;
      if (side < 0) {
        indices.push(a, b, c);
        indices.push(b, d, c);
      } else {
        indices.push(a, c, b);
        indices.push(b, c, d);
      }
    }
  }

  geometry.setIndex(indices);
  geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
  geometry.computeVertexNormals();

  return geometry;
}

function TopographicMound({ pos, radii, segments, colors }) {
  const stepHeight = 0.18;

  return (
    <group position={pos}>
      {radii.map((radius, index) => (
        <mesh
          key={`${radius}-${index}`}
          position={[0, stepHeight / 2 + index * stepHeight, 0]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[radius * 0.9, radius, stepHeight, segments]} />
          <meshStandardMaterial
            color={colors[Math.min(index, colors.length - 1)]}
            emissive={colors[Math.min(index, colors.length - 1)]}
            emissiveIntensity={0.08}
            flatShading
            roughness={0.86}
            metalness={0.03}
          />
        </mesh>
      ))}
      <mesh
        position={[0, radii.length * stepHeight + 0.035, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry
          args={[radii[radii.length - 1] * 0.52, radii[radii.length - 1] * 0.68, 0.07, segments]}
        />
        <meshStandardMaterial
          color="#82b3a1"
          emissive="#4b7267"
          emissiveIntensity={0.12}
          flatShading
          roughness={0.82}
          metalness={0.02}
        />
      </mesh>
    </group>
  );
}

function ChannelBank({ side }) {
  const bankGeometry = useMemo(() => buildStripGeometry(side, BANK_WIDTH, BANK_SEGMENTS_X), [side]);
  const shadowGeometry = useMemo(
    () => buildStripGeometry(side, SHORE_SHADOW_WIDTH, SHADOW_SEGMENTS_X, 0.01),
    [side]
  );

  return (
    <>
      <mesh geometry={bankGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          color="#23463a"
          emissive="#183329"
          emissiveIntensity={0.1}
          roughness={0.9}
          metalness={0.02}
        />
      </mesh>
      <mesh geometry={shadowGeometry} receiveShadow>
        <meshBasicMaterial
          color="#07141a"
          transparent
          opacity={0.22}
          depthWrite={false}
          polygonOffset
          polygonOffsetFactor={-1}
        />
      </mesh>
    </>
  );
}

export default function MountainTerrain() {
  return (
    <>
      <mesh position={[0, -0.31, 0]} receiveShadow>
        <boxGeometry args={[24.5, 0.2, 30.5]} />
        <meshStandardMaterial
          color="#14252d"
          emissive="#112129"
          emissiveIntensity={0.04}
          flatShading
          roughness={0.95}
          metalness={0.02}
        />
      </mesh>

      <ChannelBank side={-1} />
      <ChannelBank side={1} />

      {LANDFORMS.map((form, index) => (
        <TopographicMound key={index} {...form} />
      ))}
    </>
  );
}
