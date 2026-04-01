"use client";

export default function SkyEnvironment() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 10, 5]} intensity={0.7} color="#e0f0ff" />
      <directionalLight position={[-4, 6, -3]} intensity={0.25} color="#c4b5fd" />
    </>
  );
}
