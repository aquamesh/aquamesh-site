import { imageMetadataByPath } from "../../lib/image-metadata";
import { basePath } from "../../lib/site-paths";

function normalizeSrc(src) {
  if (typeof src !== "string") {
    return src;
  }

  if (basePath && src.startsWith(basePath)) {
    const normalized = src.slice(basePath.length);
    return normalized || "/";
  }

  return src;
}

export default function SiteImage({
  src,
  alt,
  width,
  height,
  priority = false,
  loading,
  decoding = "async",
  fetchPriority,
  ...props
}) {
  const normalizedSrc = normalizeSrc(src);
  const metadata = imageMetadataByPath[normalizedSrc];
  const resolvedWidth = width ?? metadata?.width;
  const resolvedHeight = height ?? metadata?.height;

  return (
    <img
      src={src}
      alt={alt}
      width={resolvedWidth}
      height={resolvedHeight}
      loading={loading ?? (priority ? "eager" : "lazy")}
      decoding={decoding}
      fetchPriority={fetchPriority ?? (priority ? "high" : undefined)}
      {...props}
    />
  );
}
