"use client";

import { terrainHeight } from "./river-geometry";

const INDUSTRIAL_OFFSET_X = -0.98;
const INDUSTRIAL_OFFSET_Z = -0.22;
const INDUSTRIAL_SCALE = [1.18, 1.1, 1.18];

function siteX(x) {
  return x + INDUSTRIAL_OFFSET_X;
}

function siteZ(z) {
  return z + INDUSTRIAL_OFFSET_Z;
}

function scaleFootprint([width, height, depth]) {
  return [width * 1.18, height * 1.08, depth * 1.18];
}

const INDUSTRIAL_SITE_X = siteX(-5.08);
const INDUSTRIAL_SITE_Z = siteZ(2.85);
const INDUSTRIAL_MARKER_POS = [
  INDUSTRIAL_SITE_X + 0.2,
  terrainHeight(INDUSTRIAL_SITE_X, INDUSTRIAL_SITE_Z) + 0.08,
  INDUSTRIAL_SITE_Z + 0.08,
];

export { INDUSTRIAL_MARKER_POS };

function ShadowEllipse({ position, scale, opacity = 0.2 }) {
  return (
    <mesh
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={scale}
      receiveShadow
    >
      <circleGeometry args={[1, 28]} />
      <meshBasicMaterial
        color="#09141b"
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  );
}

function Platform({ x, z, size }) {
  const y = terrainHeight(x, z) + size[1] / 2 + 0.02;

  return (
    <mesh position={[x, y, z]} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color="#97846c"
        emissive="#574738"
        emissiveIntensity={0.08}
        roughness={0.92}
        metalness={0.04}
      />
    </mesh>
  );
}

function ProcessHall() {
  const x = siteX(-5.12);
  const z = siteZ(2.9);
  const ground = terrainHeight(x, z) + 0.04;

  return (
    <group position={[x, ground, z]} scale={INDUSTRIAL_SCALE}>
      <ShadowEllipse position={[0.02, 0.02, 0.08]} scale={[0.96, 0.62, 1]} opacity={0.28} />

      <mesh position={[0, 0.26, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.52, 0.52, 1.02]} />
        <meshStandardMaterial
          color="#87949a"
          emissive="#4d5a61"
          emissiveIntensity={0.1}
          roughness={0.44}
          metalness={0.5}
        />
      </mesh>

      <mesh position={[0, 0.58, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.68, 0.12, 1.14]} />
        <meshStandardMaterial
          color="#738087"
          emissive="#3d4850"
          emissiveIntensity={0.08}
          roughness={0.34}
          metalness={0.62}
        />
      </mesh>

      <mesh position={[0.68, 0.46, 0.01]} receiveShadow>
        <boxGeometry args={[0.08, 0.16, 0.56]} />
        <meshStandardMaterial
          color="#f2b35f"
          emissive="#f2b35f"
          emissiveIntensity={0.24}
          roughness={0.28}
          metalness={0.22}
        />
      </mesh>
    </group>
  );
}

function ControlBuilding() {
  const x = siteX(-4.18);
  const z = siteZ(3.9);
  const ground = terrainHeight(x, z) + 0.04;

  return (
    <group position={[x, ground, z]} scale={INDUSTRIAL_SCALE}>
      <ShadowEllipse position={[0.03, 0.02, 0.04]} scale={[0.62, 0.42, 1]} opacity={0.2} />

      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.88, 0.36, 0.76]} />
        <meshStandardMaterial
          color="#9da8ae"
          emissive="#5f6b72"
          emissiveIntensity={0.08}
          roughness={0.42}
          metalness={0.38}
        />
      </mesh>

      <mesh position={[0, 0.43, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.96, 0.12, 0.84]} />
        <meshStandardMaterial
          color="#7a858b"
          emissive="#465057"
          emissiveIntensity={0.06}
          roughness={0.34}
          metalness={0.56}
        />
      </mesh>
    </group>
  );
}

function SettlingTanks() {
  const x = siteX(-4.56);
  const z = siteZ(1.72);
  const ground = terrainHeight(x, z) + 0.03;

  return (
    <group position={[x, ground, z]} scale={INDUSTRIAL_SCALE}>
      <ShadowEllipse position={[0, 0.016, 0.04]} scale={[0.78, 0.48, 1]} opacity={0.18} />

      <mesh position={[-0.32, 0.18, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.26, 0.36, 18]} />
        <meshStandardMaterial
          color="#8a979f"
          emissive="#526068"
          emissiveIntensity={0.08}
          roughness={0.36}
          metalness={0.52}
        />
      </mesh>

      <mesh position={[0.24, 0.16, 0.1]} castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.32, 18]} />
        <meshStandardMaterial
          color="#93a1a9"
          emissive="#56636a"
          emissiveIntensity={0.08}
          roughness={0.38}
          metalness={0.48}
        />
      </mesh>

      <mesh position={[-0.04, 0.34, 0.05]} receiveShadow>
        <boxGeometry args={[0.74, 0.08, 0.14]} />
        <meshStandardMaterial
          color="#768189"
          emissive="#435058"
          emissiveIntensity={0.06}
          roughness={0.42}
          metalness={0.56}
        />
      </mesh>
    </group>
  );
}

function ProcessTower() {
  const x = siteX(-6.02);
  const z = siteZ(2.22);
  const ground = terrainHeight(x, z) + 0.03;

  return (
    <group position={[x, ground, z]} scale={INDUSTRIAL_SCALE}>
      <ShadowEllipse position={[0.02, 0.02, 0.05]} scale={[0.5, 0.38, 1]} opacity={0.2} />

      <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.24, 0.76, 18]} />
        <meshStandardMaterial
          color="#9aa5ac"
          emissive="#58656c"
          emissiveIntensity={0.08}
          roughness={0.34}
          metalness={0.56}
        />
      </mesh>

      <mesh position={[0, 0.94, 0]} receiveShadow>
        <cylinderGeometry args={[0.06, 0.07, 0.34, 12]} />
        <meshStandardMaterial
          color="#7f8a92"
          emissive="#4b555e"
          emissiveIntensity={0.06}
          roughness={0.32}
          metalness={0.64}
        />
      </mesh>
    </group>
  );
}

function PipeRack() {
  const x = siteX(-5.58);
  const z = siteZ(2.55);
  const ground = terrainHeight(x, z) + 0.07;

  return (
    <group position={[x, ground, z]} scale={INDUSTRIAL_SCALE}>
      <mesh position={[0, 0.32, 0]} receiveShadow>
        <boxGeometry args={[0.9, 0.08, 0.18]} />
        <meshStandardMaterial
          color="#7c878f"
          emissive="#48545c"
          emissiveIntensity={0.06}
          roughness={0.4}
          metalness={0.56}
        />
      </mesh>
      <mesh position={[-0.34, 0.16, 0]} receiveShadow>
        <boxGeometry args={[0.08, 0.32, 0.08]} />
        <meshStandardMaterial color="#6a757e" roughness={0.52} metalness={0.42} />
      </mesh>
      <mesh position={[0.34, 0.16, 0]} receiveShadow>
        <boxGeometry args={[0.08, 0.32, 0.08]} />
        <meshStandardMaterial color="#6a757e" roughness={0.52} metalness={0.42} />
      </mesh>
    </group>
  );
}

function OutfallPipe() {
  const x = siteX(-3.74);
  const z = siteZ(3.08);
  const ground = terrainHeight(x, z) + 0.08;

  return (
    <group position={[x, ground, z]} rotation={[0.06, 0.34, -0.1]} scale={INDUSTRIAL_SCALE}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.07, 0.08, 1.42, 16]} />
        <meshStandardMaterial
          color="#78838b"
          emissive="#445057"
          emissiveIntensity={0.05}
          roughness={0.42}
          metalness={0.52}
        />
      </mesh>
    </group>
  );
}

export default function IndustrialSite() {
  return (
    <>
      <Platform x={siteX(-5.08)} z={siteZ(2.86)} size={scaleFootprint([2.36, 0.08, 1.54])} />
      <Platform x={siteX(-4.52)} z={siteZ(1.72)} size={scaleFootprint([1.1, 0.06, 0.88])} />
      <Platform x={siteX(-4.18)} z={siteZ(3.9)} size={scaleFootprint([1.08, 0.06, 0.92])} />

      <ProcessHall />
      <ControlBuilding />
      <SettlingTanks />
      <ProcessTower />
      <PipeRack />
      <OutfallPipe />
    </>
  );
}
