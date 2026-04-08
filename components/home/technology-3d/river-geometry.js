"use client";

export const TERRAIN_WIDTH = 24.5;
export const TERRAIN_LENGTH = 30;
export const RIVER_LENGTH = 28;
export const RIVER_MIN_Z = -RIVER_LENGTH / 2;
export const RIVER_MAX_Z = RIVER_LENGTH / 2;
export const WATER_LEVEL = 0.07;
const HEADWATER_EXTENSION = 4.5;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function clamp01(value) {
  return clamp(value, 0, 1);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function smoothstep(edge0, edge1, value) {
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function mainStemX(z) {
  return (
    Math.sin(z * 0.16 - 0.82) * 0.94 +
    Math.sin(z * 0.05 + 0.65) * 0.42 +
    Math.sin(z * 0.31 + 0.1) * 0.16
  );
}

function blendFromMain(z, start, end, targetFn) {
  const t = smoothstep(start, end, z);
  return lerp(mainStemX(z), targetFn(z), t);
}

export const DELTA_CHANNELS = [
  {
    id: "main",
    zStart: RIVER_MIN_Z - HEADWATER_EXTENSION,
    zEnd: 1.8,
    centerX(z) {
      return mainStemX(z);
    },
    halfWidth(z) {
      const base =
        0.62 +
        smoothstep(-10.5, 1.8, z) * 0.42 +
        Math.sin(z * 0.18 + 0.6) * 0.05;
      const headwaterTaper = smoothstep(-19, -16, z);
      return base * headwaterTaper;
    },
  },
  {
    id: "west-primary",
    zStart: -1.6,
    zEnd: 8.8,
    centerX(z) {
      return blendFromMain(z, -1.6, 6.4, (value) => {
        return -4.65 + Math.sin(value * 0.24 - 0.7) * 0.36;
      });
    },
    halfWidth(z) {
      return 0.42 + smoothstep(-1.6, 7.8, z) * 0.22 + Math.sin(z * 0.21) * 0.03;
    },
  },
  {
    id: "west-secondary",
    zStart: -0.9,
    zEnd: 7.4,
    centerX(z) {
      return blendFromMain(z, -0.9, 5.2, (value) => {
        return -2.35 + Math.sin(value * 0.27 + 0.25) * 0.28;
      });
    },
    halfWidth(z) {
      return 0.26 + smoothstep(-0.9, 6.4, z) * 0.13 + Math.sin(z * 0.24 - 0.3) * 0.02;
    },
  },
  {
    id: "center",
    zStart: -0.6,
    zEnd: 8.1,
    centerX(z) {
      return blendFromMain(z, -0.6, 5.8, (value) => {
        return -0.2 + Math.sin(value * 0.22 + 0.8) * 0.2;
      });
    },
    halfWidth(z) {
      return 0.32 + smoothstep(-0.6, 6.8, z) * 0.18 + Math.sin(z * 0.2 + 0.5) * 0.02;
    },
  },
  {
    id: "east-primary",
    zStart: -0.8,
    zEnd: 8.4,
    centerX(z) {
      return blendFromMain(z, -0.8, 6.1, (value) => {
        return 2.55 + Math.sin(value * 0.25 - 0.3) * 0.34;
      });
    },
    halfWidth(z) {
      return 0.34 + smoothstep(-0.8, 7.6, z) * 0.18 + Math.sin(z * 0.24 - 0.6) * 0.025;
    },
  },
  {
    id: "east-secondary",
    zStart: 0.2,
    zEnd: 7.7,
    centerX(z) {
      return blendFromMain(z, 0.2, 5.8, (value) => {
        return 4.95 + Math.sin(value * 0.29 + 0.55) * 0.24;
      });
    },
    halfWidth(z) {
      return 0.2 + smoothstep(0.2, 6.2, z) * 0.11 + Math.sin(z * 0.28) * 0.015;
    },
  },
];

export const DELTA_BAYS = [
  {
    id: "primary-bay",
    centerX: -3.6,
    centerZ: 10.9,
    radiusX: 9.8,
    radiusZ: 5.8,
    shape(theta) {
      return (
        1 +
        Math.sin(theta * 2.0 - 0.6) * 0.05 +
        Math.sin(theta * 5.0 + 0.9) * 0.025
      );
    },
  },
  {
    id: "east-inlet",
    centerX: 4.5,
    centerZ: 10.8,
    radiusX: 3.1,
    radiusZ: 4.4,
    shape(theta) {
      return 1 + Math.sin(theta * 3.0 + 0.4) * 0.04;
    },
  },
  {
    id: "open-water",
    centerX: -1.8,
    centerZ: 17.5,
    radiusX: 13.2,
    radiusZ: 8.0,
    shape(theta) {
      return (
        1 +
        Math.sin(theta * 1.6 - 0.3) * 0.06 +
        Math.sin(theta * 3.4 + 1.1) * 0.03
      );
    },
  },
];

function channelSignedDistance(x, z, channel) {
  if (z < channel.zStart) {
    const endX = channel.centerX(channel.zStart);
    return Math.hypot(x - endX, z - channel.zStart) - channel.halfWidth(channel.zStart);
  }

  if (z > channel.zEnd) {
    const endX = channel.centerX(channel.zEnd);
    return Math.hypot(x - endX, z - channel.zEnd) - channel.halfWidth(channel.zEnd);
  }

  return Math.abs(x - channel.centerX(z)) - channel.halfWidth(z);
}

function baySignedDistance(x, z, bay) {
  const dx = (x - bay.centerX) / bay.radiusX;
  const dz = (z - bay.centerZ) / bay.radiusZ;
  const theta = Math.atan2(dz, dx);
  const radiusScale = bay.shape ? bay.shape(theta) : 1;
  return Math.hypot(dx, dz) - radiusScale;
}

export function riverCenterX(z) {
  return mainStemX(z);
}

export function riverHalfWidth(z) {
  return DELTA_CHANNELS[0].halfWidth(z);
}

export function waterwaySignedDistance(x, z) {
  let distance = Infinity;

  for (const channel of DELTA_CHANNELS) {
    distance = Math.min(distance, channelSignedDistance(x, z, channel));
  }

  for (const bay of DELTA_BAYS) {
    distance = Math.min(distance, baySignedDistance(x, z, bay));
  }

  return distance;
}

export function shorelineBlend(x, z) {
  return 1 - smoothstep(0.25, 2.5, Math.abs(waterwaySignedDistance(x, z)));
}

export function terrainRipple(x, z) {
  return (
    Math.sin(x * 0.2 + z * 0.12) * 0.04 +
    Math.sin(z * 0.28 - x * 0.07) * 0.026 +
    Math.sin((x + z) * 0.14 - 0.8) * 0.018
  );
}

function bayBlend(x, z) {
  let blend = 0;

  for (const bay of DELTA_BAYS) {
    const dx = (x - bay.centerX) / bay.radiusX;
    const dz = (z - bay.centerZ) / bay.radiusZ;
    blend = Math.max(blend, clamp01(1 - Math.hypot(dx, dz)));
  }

  return blend;
}

export function terrainHeight(x, z) {
  const waterDistance = waterwaySignedDistance(x, z);
  const shore = shorelineBlend(x, z);
  const uplandLift = clamp01((2.2 - z) / 15.5) * 0.5;
  const lateralRise = clamp01((Math.abs(x) - 2.2) / 7.8) * 0.08;
  const deltaFlatten = smoothstep(-2.8, 9.5, z) * 0.16;
  const base =
    0.17 +
    uplandLift +
    lateralRise +
    terrainRipple(x, z) +
    Math.sin((x * 0.1 - z * 0.13) + 1.2) * 0.018;
  const shoreCarve = shore * (0.12 + smoothstep(-1.5, 8.5, z) * 0.08);
  const uplandDeepen = clamp01((-z - 8) / 10) * 0.4;
  const channelCut =
    waterDistance < 0
      ? 0.3 + Math.min(-waterDistance * 0.1, 0.18) + bayBlend(x, z) * 0.08 + uplandDeepen
      : 0;

  return base - deltaFlatten - shoreCarve - channelCut;
}

export function waterBottomY(x, z) {
  const waterDistance = waterwaySignedDistance(x, z);
  const bayDepth = bayBlend(x, z) * 0.09;
  const channelDepth = clamp01((-waterDistance + 0.08) / 1.5) * 0.11;

  return (
    WATER_LEVEL -
    0.11 -
    bayDepth -
    channelDepth +
    Math.sin(x * 0.16 + z * 0.18) * 0.01
  );
}

export function waterSurfaceY(x, z) {
  const flowDrop = smoothstep(RIVER_MIN_Z, RIVER_MAX_Z, z) * 0.018;
  const bayLift = bayBlend(x, z) * 0.004;
  return WATER_LEVEL - flowDrop + bayLift;
}

export function sampleChannelPoint(channelId, z, lateral = 0) {
  const channel = DELTA_CHANNELS.find((entry) => entry.id === channelId) ?? DELTA_CHANNELS[0];
  const clampedZ = clamp(z, channel.zStart, channel.zEnd);
  const width = channel.halfWidth(clampedZ);
  const x = channel.centerX(clampedZ) + lateral * width;
  return [x, waterSurfaceY(x, clampedZ), clampedZ];
}
