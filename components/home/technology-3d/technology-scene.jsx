"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Vector3, MathUtils } from "three";
import SkyEnvironment from "./sky-environment";
import MountainTerrain from "./mountain-terrain";
import WaterSurface from "./water-surface";
import SensorProbes from "./sensor-probes";
import MeshNetworkLines from "./mesh-network-lines";
import GatewayHub from "./gateway-hub";
import DataFlowParticles from "./data-flow-particles";
import CloudElement from "./cloud-element";

const CAMERA_OVERVIEW = {
  // Overview: full system — river, gateway, data flow, cloud
  position: [8, 7, 20],
  target: [0, 5, -1],
};

const CAMERA_STAGES = [
  {
    // Stage 0: Close to river, looking at sensor cluster
    position: [3, 2.5, 8],
    target: [0, 0.3, 0.5],
  },
  {
    // Stage 1: Pull back to show gateway on bank + data flow
    position: [5, 4, 11],
    target: [1.5, 1.5, -0.5],
  },
  {
    // Stage 2: Wide shot — full vertical stack, river to sky
    position: [6, 9, 18],
    target: [0, 6, -2],
  },
];

const _pos = new Vector3();
const _target = new Vector3();

function StageCamera({ activeStageRef }) {
  const { camera } = useThree();
  const currentPos = useRef(new Vector3(...CAMERA_OVERVIEW.position));
  const currentTarget = useRef(new Vector3(...CAMERA_OVERVIEW.target));

  useFrame(() => {
    const stageIndex = activeStageRef.current;
    const stage =
      stageIndex === null
        ? CAMERA_OVERVIEW
        : CAMERA_STAGES[
            Math.max(0, Math.min(CAMERA_STAGES.length - 1, stageIndex))
          ];

    _pos.set(stage.position[0], stage.position[1], stage.position[2]);
    _target.set(stage.target[0], stage.target[1], stage.target[2]);

    currentPos.current.lerp(_pos, 0.07);
    currentTarget.current.lerp(_target, 0.07);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);
  });

  return null;
}

function DynamicFog({ activeStageRef }) {
  const fogRef = useRef();

  useFrame(() => {
    if (!fogRef.current) return;
    const isOverview = activeStageRef.current === null;
    const nearTarget = isOverview ? 28 : 15;
    const farTarget = isOverview ? 65 : 45;
    fogRef.current.near = MathUtils.lerp(
      fogRef.current.near,
      nearTarget,
      0.05
    );
    fogRef.current.far = MathUtils.lerp(fogRef.current.far, farTarget, 0.05);
  });

  return <fog ref={fogRef} attach="fog" args={["#050f16", 28, 65]} />;
}

export default function TechnologyScene({ activeStage = null }) {
  const activeStageRef = useRef(null);
  activeStageRef.current = activeStage;
  const isOverview = activeStage === null;

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: CAMERA_OVERVIEW.position, fov: 50 }}
    >
      <color attach="background" args={["#050f16"]} />
      <DynamicFog activeStageRef={activeStageRef} />
      <SkyEnvironment />

      <MountainTerrain />
      <WaterSurface />
      <SensorProbes active={isOverview || activeStage === 0} />
      <MeshNetworkLines active={isOverview || activeStage === 0} />
      <GatewayHub active={isOverview || activeStage === 1} />
      <DataFlowParticles activeStage={activeStage} />
      <CloudElement active={isOverview || activeStage === 2} />

      <StageCamera activeStageRef={activeStageRef} />
    </Canvas>
  );
}
