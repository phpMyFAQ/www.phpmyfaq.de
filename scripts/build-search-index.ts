#!/usr/bin/env node

// Builds the Pagefind search index from the static export into out/pagefind/.
// Pagefind indexes every element marked data-pagefind-body (see PageLayout),
// so the header, footer, homepage and 404 page stay out of the results.
//
// The indexer is a prebuilt binary. On machines where it cannot run (it needs
// 4K memory pages), set PAGEFIND_OPTIONAL=1 to build the site without search;
// CI and the deployment never set it, so a broken index fails the build there.

import { spawnSync } from 'child_process';

const result = spawnSync('pagefind', ['--site', 'out', '--glob', '**/*.html'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

if (result.status === 0) {
  process.exit(0);
}

const reason = result.error ? result.error.message : `exit code ${result.status}`;
if (process.env.PAGEFIND_OPTIONAL === '1') {
  console.warn(`⚠️  Pagefind did not run (${reason}); continuing without a search index because PAGEFIND_OPTIONAL=1`);
  process.exit(0);
}
console.error(`❌ Pagefind failed (${reason})`);
process.exit(1);