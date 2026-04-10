"use client";

import { useCallback, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, Color, Float32BufferAttribute } from "three";
import {
  TERRAIN_LENGTH,
  TERRAIN_WIDTH,
  waterBottomY,
  waterSurfaceY,
  waterwaySignedDistance,
} from "./river-geometry";

const GRID_SEGMENTS_X = 144;
const GRID_SEGMENTS_Z = 196;
const WATER_EDGE_THRESHOLD = 0.035;
const WATER_MIN_Z = -20;
const WATER_MAX_Z = TERRAIN_LENGTH / 2;

const SURFACE_SHALLOW = new Color("#8ad8ef");
const SURFACE_DEEP = new Color("#2f78a7");
const BED_EDGE = new Color("#cbb28c");
const BED_DEEP = new Color("#75583e");

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function sampleWaterPoint(x, z) {
  const signedDistance = waterwaySignedDistance(x, z);
  const surfaceY = waterSurfaceY(x, z);
  const bedY = waterBottomY(x, z);
  const depthMix = clamp01((surfaceY - bedY - 0.07) / 0.18);
  const centerMix = clamp01((-signedDistance + WATER_EDGE_THRESHOLD) / 1.2);
  const surfaceColor = SURFACE_SHALLOW
    .clone()
    .lerp(SURFACE_DEEP, clamp01(0.18 + depthMix * 0.56 + centerMix * 0.22));
  const bedColor = BED_EDGE
    .clone()
    .lerp(BED_DEEP, clamp01(0.14 + depthMix * 0.68 + centerMix * 0.14));

  return {
    x,
    z,
    signedDistance,
    surfaceY,
    bedY,
    surfaceColor,
    bedColor,
  };
}

function interpolatePoint(a, b, isoLevel) {
  const delta = b.signedDistance - a.signedDistance;
  const t = Math.abs(delta) < 1e-5 ? 0.5 : (isoLevel - a.signedDistance) / delta;
  const clampedT = clamp01(t);
  return sampleWaterPoint(
    a.x + (b.x - a.x) * clampedT,
    a.z + (b.z - a.z) * clampedT
  );
}

function clipPolygonToWater(polygon, isoLevel) {
  const output = [];

  for (let index = 0; index < polygon.length; index++) {
    const current = polygon[index];
    const next = polygon[(index + 1) % polygon.length];
    const currentInside = current.signedDistance <= isoLevel;
    const nextInside = next.signedDistance <= isoLevel;

    if (currentInside && nextInside) {
      output.push(next);
    } else if (currentInside && !nextInside) {
      output.push(interpolatePoint(current, next, isoLevel));
    } else if (!currentInside && nextInside) {
      output.push(interpolatePoint(current, next, isoLevel));
      output.push(next);
    }
  }

  return output;
}

function polygonAreaXZ(points) {
  let area = 0;

  for (let index = 0; index < points.length; index++) {
    const current = points[index];
    const next = points[(index + 1) % points.length];
    area += current.x * next.z - next.x * current.z;
  }

  return area * 0.5;
}

function pushTriangle(target, a, b, c, useSurface) {
  const p1 = useSurface ? [a.x, a.surfaceY, a.z] : [a.x, a.bedY, a.z];
  const p2 = useSurface ? [b.x, b.surfaceY, b.z] : [b.x, b.bedY, b.z];
  const p3 = useSurface ? [c.x, c.surfaceY, c.z] : [c.x, c.bedY, c.z];
  const c1 = useSurface ? a.surfaceColor : a.bedColor;
  const c2 = useSurface ? b.surfaceColor : b.bedColor;
  const c3 = useSurface ? c.surfaceColor : c.bedColor;

  target.vertices.push(...p1, ...p2, ...p3);
  target.colors.push(
    c1.r,
    c1.g,
    c1.b,
    c2.r,
    c2.g,
    c2.b,
    c3.r,
    c3.g,
    c3.b
  );
}

function addPolygon(targets, polygon) {
  if (polygon.length < 3) return;

  const orientedPolygon =
    polygonAreaXZ(polygon) > 0 ? [...polygon].reverse() : polygon;

  for (let index = 1; index < orientedPolygon.length - 1; index++) {
    pushTriangle(
      targets.surface,
      orientedPolygon[0],
      orientedPolygon[index],
      orientedPolygon[index + 1],
      true
    );
    pushTriangle(
      targets.bed,
      orientedPolygon[0],
      orientedPolygon[index],
      orientedPolygon[index + 1],
      false
    );
  }
}

function buildUnifiedWaterGeometry() {
  const surface = {
    vertices: [],
    colors: [],
  };
  const bed = {
    vertices: [],
    colors: [],
  };
  const stepX = TERRAIN_WIDTH / GRID_SEGMENTS_X;
  const waterZRange = WATER_MAX_Z - WATER_MIN_Z;
  const stepZ = waterZRange / GRID_SEGMENTS_Z;
  const samples = [];

  for (let iz = 0; iz <= GRID_SEGMENTS_Z; iz++) {
    const z = WATER_MIN_Z + iz * stepZ;
    const row = [];

    for (let ix = 0; ix <= GRID_SEGMENTS_X; ix++) {
      const x = -TERRAIN_WIDTH / 2 + ix * stepX;
      row.push(sampleWaterPoint(x, z));
    }

    samples.push(row);
  }

  for (let iz = 0; iz < GRID_SEGMENTS_Z; iz++) {
    for (let ix = 0; ix < GRID_SEGMENTS_X; ix++) {
      const topLeft = samples[iz][ix];
      const topRight = samples[iz][ix + 1];
      const bottomRight = samples[iz + 1][ix + 1];
      const bottomLeft = samples[iz + 1][ix];
      const center = sampleWaterPoint(
        (topLeft.x + bottomRight.x) * 0.5,
        (topLeft.z + bottomRight.z) * 0.5
      );

      const triangles = [
        [center, topLeft, topRight],
        [center, topRight, bottomRight],
        [center, bottomRight, bottomLeft],
        [center, bottomLeft, topLeft],
      ];

      triangles.forEach((triangle) => {
        addPolygon(
          { surface, bed },
          clipPolygonToWater(triangle, WATER_EDGE_THRESHOLD)
        );
      });
    }
  }

  const surfaceGeometry = new BufferGeometry();
  const bedGeometry = new BufferGeometry();

  surfaceGeometry.setAttribute(
    "position",
    new Float32BufferAttribute(surface.vertices, 3)
  );
  surfaceGeometry.setAttribute(
    "color",
    new Float32BufferAttribute(surface.colors, 3)
  );
  surfaceGeometry.computeVertexNormals();

  bedGeometry.setAttribute(
    "position",
    new Float32BufferAttribute(bed.vertices, 3)
  );
  bedGeometry.setAttribute("color", new Float32BufferAttribute(bed.colors, 3));
  bedGeometry.computeVertexNormals();

  return {
    surfaceGeometry,
    bedGeometry,
  };
}

export default function WaterSurface() {
  const waveShaderRef = useRef(null);
  const { surfaceGeometry, bedGeometry } = useMemo(
    () => buildUnifiedWaterGeometry(),
    []
  );

  const attachWaterMaterial = useCallback((material) => {
    if (!material || material.userData.wavePatched) return;
    material.userData.wavePatched = true;
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        `#include <common>
uniform float uTime;`
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
transformed.y +=
    sin(transformed.x * 0.24 + uTime * 0.18) * 0.009
  + sin(transformed.z * 0.18 + uTime * 0.12) * 0.006
  + sin((transformed.x + transformed.z) * 0.16 + uTime * 0.08) * 0.003;`
      );
      waveShaderRef.current = shader;
    };
    material.customProgramCacheKey = () => "water-wave-v1";
  }, []);

  useFrame(({ clock }) => {
    if (waveShaderRef.current) {
      waveShaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <>
      <mesh geometry={bedGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          vertexColors
          emissive="#6f5439"
          emissiveIntensity={0.1}
          metalness={0.02}
          roughness={0.96}
        />
      </mesh>
      <mesh geometry={surfaceGeometry} receiveShadow>
        <meshStandardMaterial
          ref={attachWaterMaterial}
          vertexColors
          emissive="#5eb4db"
          emissiveIntensity={0.16}
          metalness={0.08}
          roughness={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>
    </>
  );
}
