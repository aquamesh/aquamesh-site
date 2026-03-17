import { createReadStream, existsSync, statSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const DEFAULT_PORT = 8000;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp"
};

function resolvePort() {
  const portArgIndex = process.argv.findIndex((arg) => arg === "--port" || arg === "-p");
  if (portArgIndex !== -1) {
    const parsed = Number.parseInt(process.argv[portArgIndex + 1], 10);
    if (Number.isInteger(parsed) && parsed > 0) {
      return parsed;
    }
  }

  const envPort = Number.parseInt(process.env.PORT ?? "", 10);
  if (Number.isInteger(envPort) && envPort > 0) {
    return envPort;
  }

  return DEFAULT_PORT;
}

function toFilePath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath.split("?")[0]);
  const normalizedPath = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  const relativePath = normalizedPath.replace(/^[/\\]+/, "");
  let filePath = path.join(rootDir, relativePath);

  if (decodedPath === "/") {
    filePath = path.join(rootDir, "index.html");
  } else if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  return filePath;
}

const server = http.createServer((req, res) => {
  const urlPath = req.url ?? "/";
  const filePath = toFilePath(urlPath);

  if (!filePath.startsWith(rootDir) || !existsSync(filePath) || statSync(filePath).isDirectory()) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  const extension = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[extension] ?? "application/octet-stream";

  res.writeHead(200, {
    "Cache-Control": "no-store",
    "Content-Type": contentType
  });

  createReadStream(filePath).pipe(res);
});

const port = resolvePort();
server.listen(port, "0.0.0.0", () => {
  console.log(`AquaMesh site running at http://0.0.0.0:${port}`);
});
