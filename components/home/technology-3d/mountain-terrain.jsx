"use client";

const PEAKS = [
  // Back row — tall peaks
  { pos: [-6, 0, -12], height: 8, radius: 4.5, segments: 6, color: "#1a2e2a", snow: true },
  { pos: [0, 0, -14], height: 7, radius: 4, segments: 5, color: "#1f332e", snow: true },
  { pos: [7, 0, -11], height: 9, radius: 5, segments: 7, color: "#1a2e2a", snow: true },
  { pos: [-3, 0, -10], height: 6, radius: 3.5, segments: 6, color: "#223830", snow: true },

  // Mid row — medium peaks
  { pos: [-10, 0, -8], height: 5, radius: 3, segments: 5, color: "#1f332e" },
  { pos: [10, 0, -9], height: 5.5, radius: 3.5, segments: 6, color: "#1a2e2a" },
  { pos: [4, 0, -13], height: 4.5, radius: 3, segments: 5, color: "#223830" },

  // Flanking — smaller hills
  { pos: [-9, 0, -5], height: 3, radius: 2.5, segments: 5, color: "#1c3029" },
  { pos: [9, 0, -6], height: 3.5, radius: 2.8, segments: 5, color: "#1c3029" },
  { pos: [-12, 0, -10], height: 4, radius: 3, segments: 6, color: "#223830" },
];

function Mountain({ pos, height, radius, segments, color, snow }) {
  return (
    <group position={pos}>
      <mesh position={[0, height / 2, 0]}>
        <coneGeometry args={[radius, height, segments]} />
        <meshStandardMaterial color={color} flatShading roughness={0.85} metalness={0.05} />
      </mesh>
      {snow && (
        <mesh position={[0, height * 0.82, 0]}>
          <coneGeometry args={[radius * 0.35, height * 0.28, segments]} />
          <meshStandardMaterial color="#3a5a52" flatShading roughness={0.9} metalness={0.02} />
        </mesh>
      )}
    </group>
  );
}

export default function MountainTerrain() {
  return (
    <>
      {PEAKS.map((peak, i) => (
        <Mountain key={i} {...peak} />
      ))}

      {/* Left riverbank */}
      <mesh position={[-6, -0.1, 0]}>
        <boxGeometry args={[10, 0.1, 28]} />
        <meshStandardMaterial color="#12261f" flatShading roughness={0.85} metalness={0.05} />
      </mesh>

      {/* Right riverbank */}
      <mesh position={[6, -0.1, 0]}>
        <boxGeometry args={[10, 0.1, 28]} />
        <meshStandardMaterial color="#12261f" flatShading roughness={0.85} metalness={0.05} />
      </mesh>
    </>
  );
}
