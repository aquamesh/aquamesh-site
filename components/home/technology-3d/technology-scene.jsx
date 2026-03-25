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
    position: [probeCenter[0] - 1.2, 3.8, probeCenter[2] + 10],
    target: [probeCenter[0], 0.5, probeCenter[2]],
  },
  {
    position: [GATEWAY_POS[0] - 2.2, GATEWAY_POS[1] + 1.2, GATEWAY_POS[2] + 7.5],
    target: [GATEWAY_POS[0], GATEWAY_POS[1] + 0.8, GATEWAY_POS[2]],
  },
  {
    position: [CLOUD_POS[0] - 2.2, CLOUD_POS[1] + 0.8, CLOUD_POS[2] + 7.5],
    target: [CLOUD_POS[0], CLOUD_POS[1] + 0.1, CLOUD_POS[2]],
  },
];

const _pos = new Vector3();
const _target = new Vector3();

function StageCamera({ activeStageRef }) {
  const { camera } = useThree();
  const currentPos = useRef(new Vector3(...CAMERA_STAGES[0].position));
  const currentTarget = useRef(new Vector3(...CAMERA_STAGES[0].target));

  useFrame(() => {
    const stageIndex = Math.max(0, Math.min(CAMERA_STAGES.length - 1, activeStageRef.current));
    const stage = CAMERA_STAGES[stageIndex];

    _pos.set(
      stage.position[0],
      stage.position[1],
      stage.position[2]
    );
    _target.set(
      stage.target[0],
      stage.target[1],
      stage.target[2]
    );

    currentPos.current.lerp(_pos, 0.06);
    currentTarget.current.lerp(_target, 0.06);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);
  });

  return null;
}

export default function TechnologyScene({ activeStage = 0 }) {
  const activeStageRef = useRef(0);
  activeStageRef.current = activeStage;

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 6, 9.5], fov: 42 }}
      style={{ background: "#050f16" }}
    >
      <fog attach="fog" args={["#050f16", 12, 28]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={0.7} color="#e0f0ff" />
      <directionalLight position={[-4, 6, -3]} intensity={0.25} color="#c4b5fd" />

      <WaterSurface />
      <SensorProbes active={activeStage === 0} />
      <MeshNetworkLines active={activeStage === 0} />
      <GatewayHub active={activeStage === 1} />
      <DataFlowParticles activeStage={activeStage} />
      <CloudElement active={activeStage === 2} />

      <StageCamera activeStageRef={activeStageRef} />
    </Canvas>
  );
}
