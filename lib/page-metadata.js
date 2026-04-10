import { imageAssetHref, siteAssets } from "./site-assets";

export const SITE_NAME = "AquaMesh";
export const SITE_URL = "https://aquamesh.ai";
export const DEFAULT_DESCRIPTION =
  "Connected water-quality monitoring hardware and software for field deployment, remote telemetry, and analysis across research, industrial, and environmental programs.";
export const DEFAULT_OG_IMAGE = siteAssets.heroLandscape;

export function absoluteSiteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

function normalizePath(path = "/") {
  if (path === "/") {
    return "/";
  }

  return path.endsWith("/") ? path : `${path}/`;
}

function buildRobots(noIndex) {
  if (noIndex) {
    return {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    };
  }

  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  };
}

export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = "website",
  noIndex = false
}) {
  const canonicalPath = normalizePath(path);
  const resolvedImage = image.startsWith("/")
    ? image
    : imageAssetHref(image);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath
    },
    robots: buildRobots(noIndex),
    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: SITE_NAME,
      type,
      images: [
        {
          url: resolvedImage,
          alt: imageAlt || title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [resolvedImage]
    }
  };
}
