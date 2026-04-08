"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { MathUtils } from "three";
import { PROBE_POSITIONS } from "./sensor-probes";

const EDGES = [
  [0, 1],
  [0, 3],
  [1, 2],
  [1, 4],
  [2, 5],
  [3, 4],
  [4, 5],
  [5, 6],
  [4, 7],
  [6, 7],
  [7, 8],
];

const LINE_COLORS = [
  "#7dd3cf",
  "#5eead4",
  "#67e8f9",
  "#8ae4dc",
  "#7dd3cf",
  "#5eead4",
  "#67e8f9",
  "#38bdf8",
  "#60a5fa",
  "#67e8f9",
  "#38bdf8",
];

function MeshLine({ a, b, index, active }) {
  const glowRef = useRef();
  const coreRef = useRef();
  const from = [a[0], a[1] + 0.14, a[2]];
  const to = [b[0], b[1] + 0.14, b[2]];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = Math.sin(t * 0.8 + index * 0.9);

    if (glowRef.current) {
      const glowTarget = active ? 0.12 + pulse * 0.02 : 0.045 + pulse * 0.015;
      glowRef.current.material.opacity = MathUtils.lerp(
        glowRef.current.material.opacity,
        glowTarget,
        0.08
      );
    }

    if (coreRef.current) {
      const coreTarget = active ? 0.42 + pulse * 0.08 : 0.16 + pulse * 0.05;
      coreRef.current.material.opacity = MathUtils.lerp(
        coreRef.current.material.opacity,
        coreTarget,
        0.08
      );
      coreRef.current.material.dashOffset -= 0.004;
    }
  });

  const color = LINE_COLORS[index % LINE_COLORS.length];

  return (
    <>
      <Line
        ref={glowRef}
        points={[from, to]}
        color={color}
        lineWidth={4.2}
        transparent
        opacity={0.08}
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
        renderOrder={8}
      />
      <Line
        ref={coreRef}
        points={[from, to]}
        color={color}
        lineWidth={1.35}
        transparent
        opacity={0.38}
        dashed
        dashSize={0.16}
        gapSize={0.19}
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
        renderOrder={9}
      />
    </>
  );
}

export default function MeshNetworkLines({ active = false }) {
  return (
    <>
      {EDGES.map(([i, j], idx) => (
        <MeshLine
          key={idx}
          a={PROBE_POSITIONS[i]}
          b={PROBE_POSITIONS[j]}
          index={idx}
          active={active}
        />
      ))}
    </>
  );
}
