/**
 * Post-build script that generates sitemap.xml from the static export output.
 * Scans the `out/` directory for index.html files and writes sitemap.xml.
 *
 * Usage: node scripts/generate-sitemap.mjs [--base-url https://aquamesh.ai]
 */

import { readdir, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";

const SITE_URL =
  process.argv.includes("--base-url")
    ? process.argv[process.argv.indexOf("--base-url") + 1]
    : process.env.SITE_URL || "https://aquamesh.ai";

const OUT_DIR = join(process.cwd(), "out");

async function collectRoutes(dir) {
  const routes = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.name.startsWith("_") || entry.name.startsWith(".")) continue;

    if (entry.isDirectory()) {
      routes.push(...(await collectRoutes(fullPath)));
    } else if (entry.name === "index.html") {
      const rel = relative(OUT_DIR, dir);
      const route = rel === "" ? "/" : `/${rel}/`;
      routes.push(route);
    }
  }

  return routes;
}

const EXCLUDE = new Set(["/404/", "/cancel/", "/success/", "/products/aqualog/"]);

const routes = (await collectRoutes(OUT_DIR))
  .filter((r) => !EXCLUDE.has(r))
  .sort();
const today = new Date().toISOString().split("T")[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) =>
      `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const outPath = join(OUT_DIR, "sitemap.xml");
await writeFile(outPath, xml, "utf-8");
console.log(`Sitemap written to ${outPath} (${routes.length} routes)`);
