"use client";

export const RIVER_LENGTH = 24;
export const RIVER_MIN_Z = -RIVER_LENGTH / 2;
export const RIVER_MAX_Z = RIVER_LENGTH / 2;

export function riverCenterX(z) {
  return (
    Math.sin(z * 0.11 - 0.55) * 1.7 +
    Math.sin(z * 0.27 + 1.15) * 0.72 +
    Math.sin(z * 0.05 - 1.1) * 0.46
  );
}

export function riverHalfWidth(z) {
  return 2.45 + Math.sin(z * 0.18 + 0.9) * 0.32 + Math.sin(z * 0.07 - 0.35) * 0.18;
}

export function terrainRipple(x, z) {
  return (
    Math.sin(x * 0.55 + z * 0.19) * 0.026 +
    Math.sin(z * 0.37 - x * 0.14) * 0.018 +
    Math.sin((x + z) * 0.22 - 0.8) * 0.014
  );
}

export function bankInnerHeight(z, side) {
  return (
    0.068 +
    Math.sin(z * 0.28 + side * 0.7) * 0.02 +
    Math.sin(z * 0.11 - side * 0.9) * 0.012
  );
}

export function bankHeight(side, z, t) {
  const rise = Math.pow(t, 0.78) * 0.34;
  return bankInnerHeight(z, side) + rise + terrainRipple(side * (1.2 + t * 3.4), z) * 0.9;
}

export function riverbedY(localRatio, z) {
  const edgeLift = Math.pow(Math.abs(localRatio), 1.3) * 0.13;
  const centerTrough =
    -0.19 +
    Math.sin(z * 0.22 - 0.4) * 0.015 +
    Math.sin(z * 0.48 + 1.2) * 0.008;

  return centerTrough + edgeLift + Math.sin(localRatio * 4.6 + z * 0.18) * 0.004;
}

export function waterSurfaceY(localRatio, z) {
  const shallowLift = Math.pow(Math.abs(localRatio), 1.15) * 0.014;
  return 0.032 + shallowLift + Math.sin(z * 0.31 + localRatio * 2.1) * 0.003;
}

export function waterColorMix(localRatio, z) {
  const edgeFade = Math.pow(Math.abs(localRatio), 0.92);
  const centerDepthBias = 1 - edgeFade * 0.9;
  const longitudinalShift = (Math.sin(z * 0.24 - 0.3) + 1) * 0.06;
  return Math.max(0, Math.min(1, centerDepthBias - longitudinalShift));
}
