function normalizeBasePath(input) {
  if (!input || input === "/") {
    return "";
  }

  const prefixed = input.startsWith("/") ? input : `/${input}`;
  return prefixed.endsWith("/") ? prefixed.slice(0, -1) : prefixed;
}

export const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

function normalizePublicPath(path) {
  if (!path || path === "/") {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function withBasePath(url) {
  return `${basePath}${url === "/" ? "/" : url}`;
}

export function routeHref(path) {
  return withBasePath(normalizePublicPath(path));
}

export function homeSectionHref(route, sectionId) {
  if (route === "") {
    return `#${sectionId}`;
  }

  return `${withBasePath("/")}#${sectionId}`;
}

export function publicAssetHref(path) {
  return routeHref(normalizePublicPath(path));
}
