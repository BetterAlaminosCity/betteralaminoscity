import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { createGzip } from "node:zlib";
import { extname, join } from "node:path";

// Vercel (our production host) compresses responses automatically; the plain
// static server Lighthouse CI would otherwise use does not. Serving
// uncompressed JS/CSS under Lighthouse's throttled network simulation
// understates real-world performance scores, so we gzip here to match prod.
const ROOT = join(import.meta.dirname, "../build/client");
const PORT = Number(process.env.PORT) || 4173;

const MIME: Record<string, string> = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".xml": "application/xml",
  ".txt": "text/plain",
};
const COMPRESSIBLE = new Set([".html", ".js", ".css", ".json", ".svg", ".xml", ".txt"]);

createServer((req, res) => {
  const pathname = decodeURIComponent((req.url ?? "/").split("?")[0]);
  let filePath = join(ROOT, pathname);
  if (pathname.endsWith("/") || !existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = join(filePath, "index.html");
  }
  if (!existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  const ext = extname(filePath);
  res.setHeader("Content-Type", MIME[ext] ?? "application/octet-stream");
  const acceptsGzip = (req.headers["accept-encoding"] ?? "").includes("gzip");
  if (acceptsGzip && COMPRESSIBLE.has(ext)) {
    res.setHeader("Content-Encoding", "gzip");
    createReadStream(filePath).pipe(createGzip()).pipe(res);
  } else {
    createReadStream(filePath).pipe(res);
  }
}).listen(PORT, () => console.log(`lhci static server listening on :${PORT}`));
