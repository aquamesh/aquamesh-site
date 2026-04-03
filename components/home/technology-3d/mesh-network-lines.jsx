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
];

// Alternate line colors for more visual pop
const LINE_COLORS = ["#22d3ee", "#34d399", "#67e8f9", "#a78bfa", "#22d3ee", "#34d399", "#67e8f9"];

function MeshLine({ a, b, index, active }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      const pulse = Math.sin(t * 0.8 + index * 0.9);
      const targetOpacity = active ? 0.52 + pulse * 0.18 : 0.11 + pulse * 0.08;
      ref.current.material.opacity = MathUtils.lerp(
        ref.current.material.opacity,
        targetOpacity,
        0.08
      );
      ref.current.material.dashOffset -= 0.006;
    }
  });

  const from = [a[0], 0.18, a[2]];
  const to = [b[0], 0.18, b[2]];

  return (
    <Line
      ref={ref}
      points={[from, to]}
      color={LINE_COLORS[index % LINE_COLORS.length]}
      lineWidth={1.5}
      transparent
      opacity={0.25}
      dashed
      dashSize={0.25}
      gapSize={0.15}
    />
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
