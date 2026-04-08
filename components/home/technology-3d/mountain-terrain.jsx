"use client";

const LANDFORMS = [
  {
    pos: [-7.2, 0, -11.8],
    radii: [4.8, 3.7, 2.7],
    segments: 7,
    colors: ["#2a4a3f", "#366055", "#4b7b6c"],
  },
  {
    pos: [0.1, 0, -13.2],
    radii: [4.4, 3.3, 2.4],
    segments: 6,
    colors: ["#2c4d42", "#3a6458", "#4f8172"],
  },
  {
    pos: [7.8, 0, -10.9],
    radii: [5.1, 3.8, 2.8],
    segments: 8,
    colors: ["#29493e", "#355f53", "#4a7a6b"],
  },
  {
    pos: [-10.3, 0, -6.7],
    radii: [3.4, 2.5],
    segments: 6,
    colors: ["#2b493e", "#436e60"],
  },
  {
    pos: [10.2, 0, -7.1],
    radii: [3.6, 2.6],
    segments: 6,
    colors: ["#2a473d", "#416b5d"],
  },
  {
    pos: [-3.9, 0, -8.4],
    radii: [2.8, 1.9],
    segments: 6,
    colors: ["#2e4d42", "#487566"],
  },
  {
    pos: [4.6, 0, -12.8],
    radii: [2.9, 2.1],
    segments: 6,
    colors: ["#2d4c41", "#467264"],
  },
];

function TopographicMound({ pos, radii, segments, colors }) {
  const stepHeight = 0.18;

  return (
    <group position={pos}>
      {radii.map((radius, index) => (
        <mesh
          key={`${radius}-${index}`}
          position={[0, stepHeight / 2 + index * stepHeight, 0]}
        >
          <cylinderGeometry args={[radius * 0.9, radius, stepHeight, segments]} />
          <meshStandardMaterial
            color={colors[Math.min(index, colors.length - 1)]}
            emissive={colors[Math.min(index, colors.length - 1)]}
            emissiveIntensity={0.08}
            flatShading
            roughness={0.86}
            metalness={0.03}
          />
        </mesh>
      ))}
      <mesh position={[0, radii.length * stepHeight + 0.035, 0]}>
        <cylinderGeometry
          args={[radii[radii.length - 1] * 0.52, radii[radii.length - 1] * 0.68, 0.07, segments]}
        />
        <meshStandardMaterial
          color="#82b3a1"
          emissive="#4b7267"
          emissiveIntensity={0.12}
          flatShading
          roughness={0.82}
          metalness={0.02}
        />
      </mesh>
    </group>
  );
}

function RiverBank({ position, colorTop, colorBase }) {
  return (
    <group position={position}>
      <mesh position={[0, -0.06, 0]}>
        <boxGeometry args={[7.4, 0.16, 28.2]} />
        <meshStandardMaterial
          color={colorTop}
          emissive={colorTop}
          emissiveIntensity={0.06}
          flatShading
          roughness={0.86}
          metalness={0.03}
        />
      </mesh>
      <mesh position={[0, -0.19, 0]}>
        <boxGeometry args={[8.2, 0.12, 29]} />
        <meshStandardMaterial
          color={colorBase}
          emissive={colorBase}
          emissiveIntensity={0.04}
          flatShading
          roughness={0.92}
          metalness={0.02}
        />
      </mesh>
    </group>
  );
}

export default function MountainTerrain() {
  return (
    <>
      <mesh position={[0, -0.28, 0]}>
        <boxGeometry args={[24.5, 0.16, 30.5]} />
        <meshStandardMaterial
          color="#14252d"
          emissive="#112129"
          emissiveIntensity={0.04}
          flatShading
          roughness={0.93}
          metalness={0.02}
        />
      </mesh>

      <RiverBank position={[-8.7, 0, 0]} colorTop="#23463a" colorBase="#173229" />
      <RiverBank position={[8.7, 0, 0]} colorTop="#23463a" colorBase="#173229" />

      {LANDFORMS.map((form, index) => (
        <TopographicMound key={index} {...form} />
      ))}
    </>
  );
}
