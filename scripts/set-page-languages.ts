#!/usr/bin/env node

// The App Router has one root layout, so every exported page starts with
// <html lang="en">. Pages written in another language are listed here and get
// their lang attribute fixed in the static export after the build. Only the
// export is deployed, so this is the HTML search engines and screen readers
// actually see; the dev server keeps "en".

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const PAGE_LANGUAGES: Record<string, string> = {
  'souveraenitaet/index.html': 'de',
};

const root = join(process.cwd(), 'out');
let failed = false;

for (const [file, lang] of Object.entries(PAGE_LANGUAGES)) {
  const path = join(root, file);
  const html = readFileSync(path, 'utf8');
  const updated = html.replace(/<html lang="en"/, `<html lang="${lang}"`);
  if (updated === html) {
    console.error(`❌ ${file}: no <html lang="en"> to replace`);
    failed = true;
    continue;
  }
  writeFileSync(path, updated);
  console.log(`✅ ${file}: lang="${lang}"`);
}

process.exit(failed ? 1 : 0);