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
  "#4aada8",
  "#2ebfaa",
  "#35b8d0",
  "#52b5ad",
  "#4aada8",
  "#2ebfaa",
  "#35b8d0",
  "#1a96cc",
  "#3b82d6",
  "#35b8d0",
  "#1a96cc",
];

export default function MeshNetworkLines({ active = false }) {
  const glowRefs = useRef([]);
  const coreRefs = useRef([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    for (let index = 0; index < EDGES.length; index++) {
      const pulse = Math.sin(t * 0.8 + index * 0.9);
      const glow = glowRefs.current[index];
      const core = coreRefs.current[index];

      if (glow) {
        const glowTarget = active ? 0.22 + pulse * 0.03 : 0.1 + pulse * 0.02;
        glow.material.opacity = MathUtils.lerp(
          glow.material.opacity,
          glowTarget,
          0.08
        );
      }

      if (core) {
        const coreTarget = active ? 0.55 + pulse * 0.1 : 0.35 + pulse * 0.08;
        core.material.opacity = MathUtils.lerp(
          core.material.opacity,
          coreTarget,
          0.08
        );
        core.material.dashOffset -= 0.004;
      }
    }
  });

  return (
    <>
      {EDGES.map(([i, j], idx) => {
        const a = PROBE_POSITIONS[i];
        const b = PROBE_POSITIONS[j];
        const from = [a[0], a[1] + 0.14, a[2]];
        const to = [b[0], b[1] + 0.14, b[2]];
        const color = LINE_COLORS[idx % LINE_COLORS.length];

        return (
          <group key={idx}>
            <Line
              ref={(el) => (glowRefs.current[idx] = el)}
              points={[from, to]}
              color={color}
              lineWidth={4.2}
              transparent
              opacity={0.14}
              depthTest={false}
              depthWrite={false}
              toneMapped={false}
              renderOrder={8}
            />
            <Line
              ref={(el) => (coreRefs.current[idx] = el)}
              points={[from, to]}
              color={color}
              lineWidth={1.8}
              transparent
              opacity={0.45}
              dashed
              dashSize={0.16}
              gapSize={0.19}
              depthTest={false}
              depthWrite={false}
              toneMapped={false}
              renderOrder={9}
            />
          </group>
        );
      })}
    </>
  );
}
