"use client";

export default function SkyEnvironment() {
  return (
    <>
      <ambientLight intensity={0.6} color="#e3f7ff" />
      <hemisphereLight
        args={["#b0e5ff", "#112029", 0.74]}
      />
      <directionalLight position={[5, 10, 6]} intensity={1.12} color="#eff8ff" />
      <directionalLight position={[-6, 7, 2]} intensity={0.58} color="#7dd3fc" />
      <directionalLight position={[2, 4, 10]} intensity={0.44} color="#a7f3d0" />
    </>
  );
}
