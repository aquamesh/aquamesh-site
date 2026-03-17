import { fileURLToPath } from "node:url";

function normalizeBasePath(input) {
  if (!input || input === "/") {
    return "";
  }

  const prefixed = input.startsWith("/") ? input : `/${input}`;
  return prefixed.endsWith("/") ? prefixed.slice(0, -1) : prefixed;
}

const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);
const rootDir = fileURLToPath(new URL(".", import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true
  },
  turbopack: {
    root: rootDir
  }
};

export default nextConfig;
