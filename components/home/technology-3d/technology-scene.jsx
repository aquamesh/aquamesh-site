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
  // Overview: more aerial, map-like view across the full system
  position: [4.5, 13.2, 16.2],
  target: [1.6, 1.45, -1.1],
};

const CAMERA_STAGES = [
  {
    // Stage 0: Elevated look at the sensor cluster within the river path
    position: [2.6, 5.9, 7.5],
    target: [0.1, 0.4, 0.6],
  },
  {
    // Stage 1: Elevated bank view to keep a systems-diagram feel
    position: [5.8, 6.9, 9.9],
    target: [2.2, 1.15, -0.5],
  },
  {
    // Stage 2: Wide aerial shot of the full river-to-cloud stack
    position: [5.2, 11.0, 14.7],
    target: [2.8, 4.5, -3.3],
  },
];

const _pos = new Vector3();
const _target = new Vector3();

function StageCamera({ activeStageRef }) {
  const { camera, size } = useThree();
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

    const aspect = size.width / Math.max(size.height, 1);
    const framePadding =
      aspect < 1 ? 1.6 : aspect < 1.3 ? 1.15 : aspect < 1.6 ? 0.7 : 0.35;

    _pos.set(
      stage.position[0],
      stage.position[1] + framePadding * 0.75,
      stage.position[2] + framePadding * 1.5
    );
    _target.set(
      stage.target[0],
      stage.target[1] - framePadding * 0.08,
      stage.target[2] + framePadding * 0.18
    );

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
    const nearTarget = isOverview ? 34 : 19;
    const farTarget = isOverview ? 78 : 54;
    fogRef.current.near = MathUtils.lerp(
      fogRef.current.near,
      nearTarget,
      0.05
    );
    fogRef.current.far = MathUtils.lerp(fogRef.current.far, farTarget, 0.05);
  });

  return <fog ref={fogRef} attach="fog" args={["#0a1820", 34, 78]} />;
}

export default function TechnologyScene({ activeStage = null }) {
  const activeStageRef = useRef(null);
  activeStageRef.current = activeStage;
  const isOverview = activeStage === null;

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: CAMERA_OVERVIEW.position, fov: 44 }}
    >
      <color attach="background" args={["#08141b"]} />
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
