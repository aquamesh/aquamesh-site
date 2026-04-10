"use client";

export default function SkyEnvironment() {
  return (
    <>
      <ambientLight intensity={0.92} color="#edf7f8" />
      <hemisphereLight args={["#eff8f7", "#b88b61", 0.82]} />
      <directionalLight
        castShadow
        position={[7, 12, 9]}
        intensity={1.34}
        color="#fffdf6"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.00006}
        shadow-normalBias={0.028}
        shadow-camera-near={1}
        shadow-camera-far={36}
        shadow-camera-left={-13}
        shadow-camera-right={13}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />
      <directionalLight position={[-9, 6, 2]} intensity={0.42} color="#a4dcef" />
      <directionalLight position={[1, 4, 11]} intensity={0.28} color="#d7ead0" />
    </>
  );
}
