"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { CanvasTexture, MathUtils, SRGBColorSpace } from "three";
import { terrainHeight } from "./river-geometry";

const GATEWAY_SITE_X = 6.45;
const GATEWAY_SITE_Z = 2.05;
const GATEWAY_POS = [
  GATEWAY_SITE_X,
  terrainHeight(GATEWAY_SITE_X, GATEWAY_SITE_Z) + 0.02,
  GATEWAY_SITE_Z,
];
const GATEWAY_SCENE_SCALE = 0.48;
const GATEWAY_MODEL_SCALE = 0.45;
const GATEWAY_BOX_CENTER_LOCAL = [0, 1.34, 0.36];
const GATEWAY_BOX_CENTER = [
  GATEWAY_POS[0] + GATEWAY_BOX_CENTER_LOCAL[0] * GATEWAY_MODEL_SCALE * GATEWAY_SCENE_SCALE,
  GATEWAY_POS[1] + GATEWAY_BOX_CENTER_LOCAL[1] * GATEWAY_MODEL_SCALE * GATEWAY_SCENE_SCALE,
  GATEWAY_POS[2] + GATEWAY_BOX_CENTER_LOCAL[2] * GATEWAY_MODEL_SCALE * GATEWAY_SCENE_SCALE,
];

export { GATEWAY_POS, GATEWAY_BOX_CENTER };

function createGatewayBadgeTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const plateX = 76;
  const plateY = 56;
  const plateWidth = 360;
  const plateHeight = 400;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#000000";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const iconCenterX = 250;
  const iconCenterY = 204;

  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(plateX + 20, plateY + 26);
  ctx.lineTo(plateX + 86, plateY + 26);
  ctx.moveTo(plateX + plateWidth - 86, plateY + 26);
  ctx.lineTo(plateX + plateWidth - 20, plateY + 26);
  ctx.stroke();

  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.moveTo(iconCenterX - 92, iconCenterY + 24);
  ctx.lineTo(iconCenterX - 26, iconCenterY - 14);
  ctx.lineTo(iconCenterX + 24, iconCenterY + 18);
  ctx.lineTo(iconCenterX - 44, iconCenterY + 58);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(iconCenterX - 8, iconCenterY + 4);
  ctx.lineTo(iconCenterX + 54, iconCenterY - 54);
  ctx.stroke();

  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(iconCenterX + 80, iconCenterY - 74, 24, -Math.PI * 0.24, Math.PI * 1.08);
  ctx.stroke();

  ctx.lineWidth = 8;
  [52, 76, 100].forEach((radius) => {
    ctx.beginPath();
    ctx.arc(iconCenterX + 80, iconCenterY - 74, radius, Math.PI * 0.72, Math.PI * 1.18);
    ctx.stroke();
  });

  ctx.beginPath();
  ctx.roundRect(192, 248, 120, 118, 22);
  ctx.stroke();

  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(252, 248);
  ctx.lineTo(252, 228);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(148, 284);
  ctx.lineTo(192, 284);
  ctx.moveTo(148, 330);
  ctx.lineTo(192, 330);
  ctx.moveTo(312, 284);
  ctx.lineTo(356, 284);
  ctx.moveTo(312, 330);
  ctx.lineTo(356, 330);
  ctx.stroke();

  ctx.lineWidth = 7;
  ctx.strokeRect(84, 248, 84, 118);
  ctx.strokeRect(344, 248, 84, 118);

  [112, 140, 372, 400].forEach((x) => {
    ctx.beginPath();
    ctx.moveTo(x, 248);
    ctx.lineTo(x, 366);
    ctx.stroke();
  });

  [287, 326].forEach((y) => {
    ctx.beginPath();
    ctx.moveTo(84, y);
    ctx.lineTo(168, y);
    ctx.moveTo(344, y);
    ctx.lineTo(428, y);
    ctx.stroke();
  });

  ctx.fillStyle = "#000000";
  ctx.font = "800 52px Inter, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("D2C", 256, 440);

  ctx.fillStyle = "rgba(0, 0, 0, 0.78)";
  ctx.font = "700 22px Inter, Arial, sans-serif";
  ctx.fillText("SAT LINK", 256, 470);

  ctx.strokeStyle = "rgba(0, 0, 0, 0.78)";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(150, 488);
  ctx.lineTo(362, 488);
  ctx.stroke();

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function Rock({ position, rotation, scale }) {
  return (
    <mesh position={position} rotation={rotation} scale={scale} receiveShadow>
      <dodecahedronGeometry args={[0.18, 0]} />
      <meshStandardMaterial
        color="#68736c"
        emissive="#2e3732"
        emissiveIntensity={0.08}
        roughness={0.95}
        metalness={0.03}
        flatShading
      />
    </mesh>
  );
}

function GrassClump({ position, rotation = [0, 0, 0], scale = 1 }) {
  const blades = [
    { x: -0.08, z: 0.02, h: 0.26, tilt: 0.2 },
    { x: 0, z: 0, h: 0.34, tilt: -0.12 },
    { x: 0.08, z: -0.03, h: 0.24, tilt: 0.16 },
    { x: 0.03, z: 0.07, h: 0.2, tilt: -0.22 },
  ];

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {blades.map((blade, index) => (
        <mesh
          key={index}
          position={[blade.x, blade.h / 2, blade.z]}
          rotation={[blade.tilt, 0, blade.tilt * 0.5]}
          receiveShadow
        >
          <coneGeometry args={[0.03, blade.h, 5]} />
          <meshStandardMaterial
            color="#6fa27e"
            emissive="#345540"
            emissiveIntensity={0.12}
            roughness={0.92}
            metalness={0.02}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}

function EllipseShadow({ position, scale, opacity = 0.24 }) {
  return (
    <mesh
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={scale}
      receiveShadow
    >
      <circleGeometry args={[1, 28]} />
      <meshBasicMaterial
        color="#07121a"
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function GatewayHub({ active = false }) {
  const mainLightRef = useRef();
  const accentLightRef = useRef();
  const badgeTexture = useMemo(() => createGatewayBadgeTexture(), []);

  useFrame(() => {
    if (mainLightRef.current) {
      mainLightRef.current.intensity = MathUtils.lerp(
        mainLightRef.current.intensity,
        active ? 1.9 : 0.8,
        0.08
      );
    }
    if (accentLightRef.current) {
      accentLightRef.current.intensity = MathUtils.lerp(
        accentLightRef.current.intensity,
        active ? 0.95 : 0.35,
        0.08
      );
    }
  });

  return (
    <group position={GATEWAY_POS} scale={GATEWAY_SCENE_SCALE}>
      <EllipseShadow position={[0.02, 0.045, 0.08]} scale={[0.72, 0.56, 1]} opacity={0.34} />
      <EllipseShadow position={[-0.88, 0.042, 0.24]} scale={[0.94, 0.42, 1]} opacity={0.18} />

      <mesh position={[0, 0.08, 0.04]} castShadow receiveShadow>
        <cylinderGeometry args={[0.38, 0.44, 0.16, 20]} />
        <meshStandardMaterial
          color="#8d959c"
          emissive="#424b52"
          emissiveIntensity={0.06}
          roughness={0.76}
          metalness={0.18}
        />
      </mesh>

      <Rock position={[-0.62, 0.13, 0.46]} rotation={[0.24, 0.4, 0.1]} scale={[1.2, 0.86, 0.94]} />
      <Rock position={[-0.42, 0.1, -0.28]} rotation={[0.15, -0.6, -0.12]} scale={[0.84, 0.62, 0.9]} />
      <Rock position={[0.54, 0.11, 0.24]} rotation={[0.18, 0.2, 0.24]} scale={[0.72, 0.58, 0.8]} />

      <GrassClump position={[-0.96, 0.04, -0.12]} rotation={[0, 0.2, 0]} scale={0.92} />
      <GrassClump position={[-0.58, 0.04, 0.76]} rotation={[0, -0.5, 0]} scale={0.86} />
      <GrassClump position={[0.62, 0.04, -0.58]} rotation={[0, 0.36, 0]} scale={0.74} />

      <group scale={GATEWAY_MODEL_SCALE}>
        <mesh position={[0, -0.06, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.18, 0.22, 0.16, 12]} />
          <meshStandardMaterial
            color="#50606d"
            emissive="#2c3742"
            emissiveIntensity={0.05}
            roughness={0.72}
            metalness={0.42}
          />
        </mesh>

        <mesh position={[0, 0.98, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.08, 0.1, 1.96, 10]} />
          <meshStandardMaterial
            color="#8e98a2"
            emissive="#54606a"
            emissiveIntensity={0.08}
            roughness={0.36}
            metalness={0.78}
          />
        </mesh>

        <mesh position={[0, 2.04, 0]} receiveShadow>
          <boxGeometry args={[0.16, 0.16, 0.28]} />
          <meshStandardMaterial
            color="#8b96a0"
            emissive="#505b66"
            emissiveIntensity={0.08}
            roughness={0.34}
            metalness={0.76}
          />
        </mesh>

        <mesh position={[0, 1.34, 0.14]} receiveShadow>
          <boxGeometry args={[0.16, 0.1, 0.24]} />
          <meshStandardMaterial
            color="#7f8b96"
            emissive="#49535d"
            emissiveIntensity={0.06}
            roughness={0.38}
            metalness={0.74}
          />
        </mesh>

        <RoundedBox
          args={[0.46, 0.52, 0.18]}
          radius={0.08}
          smoothness={5}
          position={[0, 1.34, 0.36]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color="#aab3bc"
            emissive="#606b76"
            emissiveIntensity={active ? 0.34 : 0.18}
            roughness={0.28}
            metalness={0.74}
          />
        </RoundedBox>

        {badgeTexture ? (
          <mesh position={[0, 1.34, 0.452]} renderOrder={1}>
            <planeGeometry args={[0.36, 0.4]} />
            <meshBasicMaterial
              map={badgeTexture}
              transparent
              opacity={active ? 0.98 : 0.9}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        ) : null}

        <mesh position={[0, 2.2, 0]} receiveShadow>
          <boxGeometry args={[0.18, 0.16, 0.18]} />
          <meshStandardMaterial
            color="#8b97a2"
            emissive="#515c66"
            emissiveIntensity={0.06}
            roughness={0.34}
            metalness={0.78}
          />
        </mesh>

        <mesh position={[0, 2.21, 0.1]} rotation={[-Math.PI / 4, 0, 0]} receiveShadow>
          <boxGeometry args={[0.08, 0.4, 0.08]} />
          <meshStandardMaterial
            color="#8b97a2"
            emissive="#515c66"
            emissiveIntensity={0.06}
            roughness={0.34}
            metalness={0.78}
          />
        </mesh>

        <group position={[0, 2.39, 0.18]} rotation={[-Math.PI / 4, 0, 0]}>
          <RoundedBox args={[1.16, 0.78, 0.06]} radius={0.04} smoothness={4} castShadow receiveShadow>
            <meshStandardMaterial
              color="#6d7781"
              emissive="#3e4851"
              emissiveIntensity={0.08}
              roughness={0.34}
              metalness={0.74}
            />
          </RoundedBox>
          <mesh position={[0, 0, 0.038]} receiveShadow>
            <boxGeometry args={[1.0, 0.62, 0.02]} />
            <meshStandardMaterial
              color="#255a74"
              emissive="#1d6f8d"
              emissiveIntensity={active ? 0.24 : 0.12}
              roughness={0.42}
              metalness={0.16}
            />
          </mesh>
        </group>
      </group>

      <pointLight
        ref={mainLightRef}
        color="#22d3ee"
        intensity={active ? 1.9 : 0.8}
        distance={7}
        position={[0.15, 1.75, 1.0]}
      />
      <pointLight
        ref={accentLightRef}
        color="#34d399"
        intensity={active ? 0.95 : 0.35}
        distance={5}
        position={[0, 2.78, 0.92]}
      />
    </group>
  );
}
