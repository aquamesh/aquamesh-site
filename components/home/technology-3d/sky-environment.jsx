"use client";

export default function SkyEnvironment() {
  return (
    <>
      <ambientLight intensity={0.6} color="#e3f7ff" />
      <hemisphereLight
        args={["#b0e5ff", "#112029", 0.74]}
      />
      <directionalLight
        castShadow
        position={[5, 10, 6]}
        intensity={1.22}
        color="#eff8ff"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00008}
        shadow-normalBias={0.03}
        shadow-camera-near={1}
        shadow-camera-far={32}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />
      <directionalLight position={[-6, 7, 2]} intensity={0.58} color="#7dd3fc" />
      <directionalLight position={[2, 4, 10]} intensity={0.44} color="#a7f3d0" />
    </>
  );
}
