"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Vector3, MathUtils } from "three";
import SkyEnvironment from "./sky-environment";
import MountainTerrain from "./mountain-terrain";
import BackgroundMountains from "./background-mountains";
import WaterSurface from "./water-surface";
import SensorProbes from "./sensor-probes";
import MeshNetworkLines from "./mesh-network-lines";
import GatewayHub from "./gateway-hub";
import DataFlowParticles from "./data-flow-particles";
import CloudElement from "./cloud-element";
import IndustrialSite from "./industrial-site";
import SceneAnnotations from "./scene-annotations";

const CAMERA_OVERVIEW = {
  position: [2.5, 10.9, 18.1],
  target: [0.05, 0.02, 3.2],
};

const CAMERA_VIEWS = {
  sensors: {
    position: [1.35, 4.85, 8.9],
    target: [0.15, 0.18, -1.2],
  },
  industrial: {
    position: [-2.45, 3.3, 9.25],
    target: [-6.1, 0.05, 2.7],
  },
  coastal: {
    position: [-2.15, 2.9, 14.4],
    target: [-3.55, 0.05, 8.85],
  },
  gateway: {
    position: [6.7, 0.75, 9.85],
    target: [6.45, 0.7, 9.43],
  },
  cloud: {
    position: [6.1, 8.55, 15.6],
    target: [6.45, 5.2, 9.2],
  },
};

const _pos = new Vector3();
const _target = new Vector3();

function StageCamera({ activeViewRef }) {
  const { camera, size } = useThree();
  const currentPos = useRef(new Vector3(...CAMERA_OVERVIEW.position));
  const currentTarget = useRef(new Vector3(...CAMERA_OVERVIEW.target));

  useFrame(() => {
    const activeView = activeViewRef.current;
    const stage =
      activeView === null
        ? CAMERA_OVERVIEW
        : CAMERA_VIEWS[activeView] ?? CAMERA_VIEWS.sensors;

    const aspect = size.width / Math.max(size.height, 1);
    let framePadding =
      aspect < 0.8
        ? 2.35
        : aspect < 1
          ? 1.8
          : aspect < 1.3
            ? 1.3
            : aspect < 1.6
              ? 0.9
              : 0.65;

    if (activeView === "gateway" && aspect < 1.0) {
      framePadding *= 0.4;
    }

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

function DynamicFog({ activeViewRef }) {
  const fogRef = useRef();

  useFrame(() => {
    if (!fogRef.current) return;
    const isOverview = activeViewRef.current === null;
    const nearTarget = isOverview ? 42 : 26;
    const farTarget = isOverview ? 108 : 72;
    fogRef.current.near = MathUtils.lerp(
      fogRef.current.near,
      nearTarget,
      0.05
    );
    fogRef.current.far = MathUtils.lerp(fogRef.current.far, farTarget, 0.05);
  });

  return <fog ref={fogRef} attach="fog" args={["#d9e6e8", 42, 108]} />;
}

export default function TechnologyScene({
  activeStage = null,
  activeView = null,
  onSelectView,
}) {
  const activeViewRef = useRef(null);
  activeViewRef.current = activeView;
  const isOverview = activeStage === null;

  return (
    <Canvas
      className="block h-full w-full"
      style={{ display: "block", height: "100%", width: "100%" }}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: CAMERA_OVERVIEW.position, fov: 40 }}
    >
      <color attach="background" args={["#dfe8e8"]} />
      <DynamicFog activeViewRef={activeViewRef} />
      <SkyEnvironment />

      <MountainTerrain />
      <BackgroundMountains />
      <WaterSurface />
      <IndustrialSite />
      <SensorProbes active={isOverview || activeStage === 0} />
      <MeshNetworkLines active={isOverview || activeStage === 0} />
      <GatewayHub active={isOverview || activeStage === 1} />
      <DataFlowParticles activeStage={activeStage} />
      <CloudElement active={isOverview || activeStage === 2} />
      <SceneAnnotations
        activeView={activeView}
        onSelectView={onSelectView}
      />

      <StageCamera activeViewRef={activeViewRef} />
    </Canvas>
  );
}
