"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import WaterSurface from "./water-surface";
import SensorProbes, { PROBE_POSITIONS } from "./sensor-probes";
import MeshNetworkLines from "./mesh-network-lines";
import GatewayHub, { GATEWAY_POS } from "./gateway-hub";
import DataFlowParticles from "./data-flow-particles";
import CloudElement, { CLOUD_POS } from "./cloud-element";

// Probe cluster center
const probeCenter = PROBE_POSITIONS.reduce(
  (acc, p) => [acc[0] + p[0], acc[1] + p[1], acc[2] + p[2]],
  [0, 0, 0]
).map((v) => v / PROBE_POSITIONS.length);

const CAMERA_STAGES = [
  {
    position: [probeCenter[0], 8, probeCenter[2] + 6],
    target: [probeCenter[0], 0, probeCenter[2]],
  },
  {
    position: [GATEWAY_POS[0] - 3, 5, GATEWAY_POS[2] + 7],
    target: [GATEWAY_POS[0] - 1, 0.8, GATEWAY_POS[2]],
  },
  {
    position: [CLOUD_POS[0] - 4, 10, CLOUD_POS[2] + 8],
    target: [(CLOUD_POS[0] + GATEWAY_POS[0]) / 2, 3, 0],
  },
];

const _pos = new Vector3();
const _target = new Vector3();

function ScrollCamera({ progressRef }) {
  const { camera } = useThree();
  const currentPos = useRef(new Vector3(...CAMERA_STAGES[0].position));
  const currentTarget = useRef(new Vector3(...CAMERA_STAGES[0].target));

  useFrame(() => {
    const raw = progressRef.current;
    const n = CAMERA_STAGES.length;
    // Remap to match the padded stage range used for text overlays (0.15–0.85)
    const pad = 0.15;
    const p = Math.max(0, Math.min(1, (raw - pad) / (1 - 2 * pad)));
    const scaled = p * (n - 1);
    const idx = Math.min(Math.floor(scaled), n - 2);
    const t = scaled - idx;
    const eased = t * t * (3 - 2 * t);

    const a = CAMERA_STAGES[idx];
    const b = CAMERA_STAGES[idx + 1];

    _pos.set(
      a.position[0] + (b.position[0] - a.position[0]) * eased,
      a.position[1] + (b.position[1] - a.position[1]) * eased,
      a.position[2] + (b.position[2] - a.position[2]) * eased
    );
    _target.set(
      a.target[0] + (b.target[0] - a.target[0]) * eased,
      a.target[1] + (b.target[1] - a.target[1]) * eased,
      a.target[2] + (b.target[2] - a.target[2]) * eased
    );

    currentPos.current.lerp(_pos, 0.08);
    currentTarget.current.lerp(_target, 0.08);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);
  });

  return null;
}

export default function TechnologyScene({ scrollProgress = 0 }) {
  const progressRef = useRef(0);
  progressRef.current = scrollProgress;

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 8, 6], fov: 45 }}
      style={{ background: "#050f16" }}
    >
      <fog attach="fog" args={["#050f16", 12, 28]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={0.7} color="#e0f0ff" />
      <directionalLight position={[-4, 6, -3]} intensity={0.25} color="#c4b5fd" />

      <WaterSurface />
      <SensorProbes />
      <MeshNetworkLines />
      <GatewayHub />
      <DataFlowParticles />
      <CloudElement />

      <ScrollCamera progressRef={progressRef} />
    </Canvas>
  );
}
