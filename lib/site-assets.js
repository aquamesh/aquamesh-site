import { publicAssetHref } from "./site-paths";

function normalizeAssetPath(path) {
  return path.startsWith("/") ? path.slice(1) : path;
}

export function imageAssetHref(path) {
  return publicAssetHref(`/images/${normalizeAssetPath(path)}`);
}


export const siteAssets = {
  favicon: publicAssetHref("/favicon.ico"),
  logo: imageAssetHref("aquameshlogo.png"),
  logoMark: imageAssetHref("aquamesh.svg"),
  heroLandscape: imageAssetHref("updated_landscape_1.jpg"),
  heroVideo: imageAssetHref("aeriel_scripps_pier.mp4")
};
