#!/usr/bin/env node

// Serves the static export in out/ the way the production Apache host does:
// directory URLs end in a slash and resolve to index.html, /api/news/<name>
// maps to the JSON file, the permanent redirects from .htaccess are applied,
// and unknown paths get 404.html with a 404 status. The Playwright suite runs
// against this server (see playwright.config.ts).

import { createReadStream, existsSync, readFileSync, statSync } from 'fs';
import { createServer, type IncomingMessage, type ServerResponse } from 'http';
import { extname, join, normalize, resolve } from 'path';

const root = resolve(process.cwd(), 'out');
const port = Number(process.env.PORT ?? 3100);

const CONTENT_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
};

function contentType(filePath: string): string {
  // The Open Graph image is exported without an extension (see static/.htaccess).
  if (filePath.endsWith('opengraph-image')) return 'image/png';
  return CONTENT_TYPES[extname(filePath).toLowerCase()] ?? 'application/octet-stream';
}

function isFile(filePath: string): boolean {
  return existsSync(filePath) && statSync(filePath).isFile();
}

function isDirectory(filePath: string): boolean {
  return existsSync(filePath) && statSync(filePath).isDirectory();
}

interface Redirect {
  pattern: RegExp;
  target: string;
}

// The permanent redirects of the exported .htaccess, i.e. every RewriteRule
// with an R=301 flag. Apache matches the pattern against the path without its
// leading slash, and backreferences work the same way in both.
function loadRedirects(): Redirect[] {
  const htaccess = join(root, '.htaccess');
  if (!isFile(htaccess)) return [];

  const redirects: Redirect[] = [];
  for (const line of readFileSync(htaccess, 'utf-8').split('\n')) {
    const rule = line.match(/^\s*RewriteRule\s+(\S+)\s+(\S+)\s+\[([^\]]*)\]/);
    if (rule && /\bR=301\b/.test(rule[3])) {
      redirects.push({ pattern: new RegExp(rule[1]), target: rule[2] });
    }
  }
  return redirects;
}

const redirects = loadRedirects();

function send(res: ServerResponse, status: number, filePath: string): void {
  res.writeHead(status, { 'Content-Type': contentType(filePath) });
  createReadStream(filePath).pipe(res);
}

function handle(req: IncomingMessage, res: ServerResponse): void {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const pathname = decodeURIComponent(url.pathname);
  const target = normalize(join(root, pathname));

  if (!target.startsWith(root)) {
    res.writeHead(403).end();
    return;
  }

  const relative = pathname.replace(/^\//, '');
  const redirect = redirects.find((r) => r.pattern.test(relative));
  if (redirect) {
    res.writeHead(301, { Location: relative.replace(redirect.pattern, redirect.target) }).end();
    return;
  }

  if (isFile(target)) {
    send(res, 200, target);
    return;
  }

  if (isDirectory(target)) {
    if (!pathname.endsWith('/')) {
      res.writeHead(308, { Location: `${pathname}/${url.search}` }).end();
      return;
    }
    const index = join(target, 'index.html');
    if (isFile(index)) {
      send(res, 200, index);
      return;
    }
  }

  // Clean API URLs: /api/news/2026 -> /api/news/2026.json
  const apiMatch = pathname.match(/^\/api\/news\/([^/]+)\/?$/);
  if (apiMatch && isFile(join(root, 'api', 'news', `${apiMatch[1]}.json`))) {
    send(res, 200, join(root, 'api', 'news', `${apiMatch[1]}.json`));
    return;
  }

  const notFound = join(root, '404.html');
  if (isFile(notFound)) {
    send(res, 404, notFound);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not Found');
  }
}

if (!isFile(join(root, 'index.html'))) {
  console.error(`No static export found in ${root}. Run "pnpm build" first.`);
  process.exit(1);
}

createServer(handle).listen(port, () => {
  console.log(`Serving ${root} at http://localhost:${port}`);
});