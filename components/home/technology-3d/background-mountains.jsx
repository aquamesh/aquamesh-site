"use client";

import { useMemo } from "react";
import { BufferGeometry, Color, DoubleSide, Float32BufferAttribute } from "three";

const ARC_SAMPLES = 120;

const PROFILE = [
  { offset: 3.0, heightFrac: 0, isBase: true },
  { offset: 2.0, heightFrac: 0.12 },
  { offset: 1.0, heightFrac: 0.45 },
  { offset: 0.0, heightFrac: 0.85 },
  { offset: -0.6, heightFrac: 1.0 },
  { offset: -1.4, heightFrac: 0.55 },
  { offset: -2.5, heightFrac: 0.12 },
  { offset: -5.0, heightFrac: 0, isBase: true },
];

const PROFILE_STEPS = PROFILE.length;

const COL_BASE = new Color("#698660");
const COL_MID = new Color("#7a8a7a");
const COL_UPPER = new Color("#9aacab");
const COL_PEAK = new Color("#bccbcc");
const COL_FOG = new Color("#d9e6e8");

function arcPoint(t, xRadius, zDepth, frontZ) {
  const angle = Math.PI * t;
  return {
    x: xRadius * Math.cos(angle),
    z: frontZ - zDepth * Math.pow(Math.sin(angle), 0.7),
  };
}

function arcNormalOutward(t, xRadius, zDepth, frontZ) {
  const dt = 0.002;
  const p0 = arcPoint(Math.max(0, t - dt), xRadius, zDepth, frontZ);
  const p1 = arcPoint(Math.min(1, t + dt), xRadius, zDepth, frontZ);
  const dx = p1.x - p0.x;
  const dz = p1.z - p0.z;
  const len = Math.hypot(dx, dz) || 1;
  return { x: -dz / len, z: dx / len };
}

function ridgeHeight(t, maxHeight) {
  const envelope = Math.sin(Math.PI * t);
  const base = 0.6 + (maxHeight - 0.6) * envelope;
  const noise =
    Math.sin(t * 47 + 0.8) * 0.55 +
    Math.sin(t * 23 - 0.4) * 0.4 +
    Math.sin(t * 71 + 1.5) * 0.2 +
    Math.sin(t * 13 + 2.1) * 0.3;
  const endFade = Math.min(1, Math.min(t, 1 - t) / 0.08);
  return Math.max(0, (base + noise) * endFade);
}

function buildRangeGeometry({ xRadius, zDepth, frontZ, maxHeight, fogBlend }) {
  const geometry = new BufferGeometry();
  const vertices = [];
  const colors = [];
  const indices = [];
  const tempColor = new Color();

  for (let i = 0; i < ARC_SAMPLES; i++) {
    const t = i / (ARC_SAMPLES - 1);
    const point = arcPoint(t, xRadius, zDepth, frontZ);
    const normal = arcNormalOutward(t, xRadius, zDepth, frontZ);
    const height = ridgeHeight(t, maxHeight);

    for (let j = 0; j < PROFILE_STEPS; j++) {
      const { offset, heightFrac, isBase } = PROFILE[j];
      const x = point.x + normal.x * offset;
      const z = point.z + normal.z * offset;

      let y;
      if (isBase) {
        y = -0.5;
      } else {
        y = -0.1 + height * heightFrac;
        y += Math.sin(x * 0.8 + z * 0.6) * 0.06;
        y += Math.sin(x * 0.3 - z * 0.4 + 1.2) * 0.04;
      }

      const hr = isBase ? 0 : heightFrac;
      if (hr < 0.3) {
        tempColor.copy(COL_BASE).lerp(COL_MID, hr / 0.3);
      } else if (hr < 0.65) {
        tempColor.copy(COL_MID).lerp(COL_UPPER, (hr - 0.3) / 0.35);
      } else {
        tempColor.copy(COL_UPPER).lerp(COL_PEAK, (hr - 0.65) / 0.35);
      }
      tempColor.lerp(COL_FOG, hr * hr * 0.4 + fogBlend);
      const warm = Math.sin(t * 8.2 + 0.5) * 0.025;
      tempColor.r = Math.min(1, Math.max(0, tempColor.r + warm));
      tempColor.b = Math.min(1, Math.max(0, tempColor.b - warm * 0.5));

      vertices.push(x, y, z);
      colors.push(tempColor.r, tempColor.g, tempColor.b);
    }
  }

  for (let i = 0; i < ARC_SAMPLES - 1; i++) {
    for (let j = 0; j < PROFILE_STEPS - 1; j++) {
      const a = i * PROFILE_STEPS + j;
      const b = a + 1;
      const c = a + PROFILE_STEPS;
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

export default function BackgroundMountains() {
  const nearRange = useMemo(
    () =>
      buildRangeGeometry({
        xRadius: 16,
        zDepth: 27,
        frontZ: 8,
        maxHeight: 5,
        fogBlend: 0,
      }),
    []
  );

  const farRange = useMemo(
    () =>
      buildRangeGeometry({
        xRadius: 22,
        zDepth: 35,
        frontZ: 10,
        maxHeight: 7.5,
        fogBlend: 0.3,
      }),
    []
  );

  return (
    <>
      <mesh geometry={nearRange}>
        <meshStandardMaterial
          vertexColors
          side={DoubleSide}
          emissive="#4a5e58"
          emissiveIntensity={0.06}
          roughness={0.94}
          metalness={0.02}
        />
      </mesh>
      <mesh geometry={farRange}>
        <meshStandardMaterial
          vertexColors
          side={DoubleSide}
          emissive="#4a5e58"
          emissiveIntensity={0.04}
          roughness={0.96}
          metalness={0.01}
        />
      </mesh>
    </>
  );
}
