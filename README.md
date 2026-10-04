# phpMyFAQ Website

The website of [phpMyFAQ](https://www.phpmyfaq.de), the open-source FAQ management system. It is a statically exported
Next.js site: content lives in Markdown files, release data is fetched from GitHub at build time, and the result is
plain HTML that any web server can host.

## Tech Stack

- **Next.js 16** (App Router, static export) with **React 19** and **TypeScript 7**
- **SCSS modules** for styling, with a small set of design tokens in `src/app/globals.scss` for light and dark mode
- **Inline SVG icons** generated from Font Awesome Free by `pnpm generate:icons` (no icon font is shipped)
- **marked** and **gray-matter** for the Markdown content
- **oxlint** and **oxfmt** for linting and formatting
- **Vitest** with React Testing Library for unit and component tests
- **Playwright** with axe-core for end-to-end and WCAG 2.1 AA checks

## Getting Started

```bash
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000). The dev server runs on webpack (see the `dev` script) because
the TypeScript 7 integration panics under Turbopack.

## Available Scripts

### Development

- `pnpm dev` - Start the development server
- `pnpm build` - Build the static site into `out/` (runs `generate:news-api` first, then sets the `lang` attribute of non-English pages via `scripts/set-page-languages.ts` and copies `static/.htaccess`)
- `pnpm serve` - Serve `out/` locally on port 3100 like the production host does
- `pnpm lint` / `pnpm lint:fix` - Run oxlint
- `pnpm format` / `pnpm format:check` - Run oxfmt

### Testing

- `pnpm test` - Run unit tests in watch mode
- `pnpm test:ci` - Run unit tests once
- `pnpm test:ui` - Run unit tests with the Vitest UI
- `pnpm test:coverage` - Run unit tests with a coverage report
- `pnpm test:e2e` - Run Playwright end-to-end tests
- `pnpm test:e2e:ui` - Run end-to-end tests with the Playwright UI
- `pnpm test:e2e:headed` - Run end-to-end tests in a headed browser

### Data and Generators

- `pnpm fetch:versions` - Fetch the latest release information from GitHub into `data/versions.json`
- `pnpm fetch:downloads` - Fetch download metadata
- `pnpm update:data` - Run both fetchers
- `pnpm generate:news-api` - Write the JSON news API into `public/api/news/` (gitignored, runs before every build)
- `pnpm generate:icons` - Regenerate `src/components/icons.generated.ts`

## Project Structure

```
content/
├── changelog/             # Changelog rendered at /changelog
├── docs/                  # Legacy documentation (2.x and 3.x)
├── news/                  # One Markdown file per year, entries under ### YYYY-MM-DD headings
└── security/              # One Markdown file per advisory, plus the security policy
data/                      # Release data (versions, stable, development)
public/                    # Static assets, fonts and the generated news JSON API
scripts/                   # Data fetchers and generators (run with tsx)
src/
├── app/                   # App Router pages, sitemap, Open Graph image and Atom feed routes
├── components/            # React components with co-located SCSS modules and tests
├── contexts/              # Theme context (light/dark)
├── data/                  # Hand-maintained data such as the security policy values
├── lib/                   # Markdown parsing, news, changelog, advisories, feeds, structured data
└── test/                  # Vitest setup and cross-cutting tests
static/.htaccess           # Apache rules copied into out/ after the build
tests/e2e/                 # Playwright specs
```

## Search

The site search runs entirely in the browser with [Pagefind](https://pagefind.app). The build step
`scripts/build-search-index.ts` indexes every page that renders through `PageLayout` (marked with
`data-pagefind-body`) into `out/pagefind/`, with a section filter taken from the layout's `searchSection` prop. The
header's search button loads Pagefind's UI on first use; `/` or Ctrl+K opens it. The indexer is a prebuilt binary that
needs 4K memory pages; on machines where it cannot run, `PAGEFIND_OPTIONAL=1 pnpm build` builds the site without the
index, while CI and the deployment always build it.

## Content

- **News**: add an entry to `content/news/<year>.md` under a `### YYYY-MM-DD` heading. The homepage, the year pages,
  the JSON API and the Atom feed at `/news/atom.xml` pick it up automatically.
- **Security advisories**: add `content/security/advisory-YYYY-MM-DD.md`. It appears at `/advisories`, under
  `/security/<slug>` and in the feed at `/security/atom.xml`.
- **Releases**: run `pnpm update:data` to refresh `data/versions.json`; the hero, download page and "What's next"
  section read from it.

## Testing

Unit tests cover the Markdown and data helpers, the feeds and the components. The Playwright suite builds the static
export and runs against it, served by `scripts/serve-static.ts` the way the production host serves it. It checks that
every page loads with the right title, that navigation and footer links work, that the feeds are served, and runs an
axe-core WCAG 2.1 AA sweep over the main templates. Serious and critical violations fail the build. To skip the rebuild
between local runs, start `pnpm build && pnpm serve` once; Playwright reuses a running server.

The pre-commit hook runs `pnpm lint && pnpm test:ci`; commit messages follow Conventional Commits.

## Deployment

Every push to `main` is deployed automatically once the Vitest and Playwright workflows have passed for that commit.
The `Deploy` workflow (`.github/workflows/deploy.yml`) is triggered by the Playwright run, waits for the Vitest result,
builds the static export with full git history, uploads `out/` over FTPS and smoke-tests a few URLs afterwards. It can
also be started by hand from the Actions tab, which is also the way to publish after re-running a failed test workflow.

The site is hosted on all-inkl shared hosting. Create a dedicated FTP user in KAS (FTP, Neuer FTP-Benutzer) whose
directory is the document root `/www/htdocs/w0XXXXXX/www.phpmyfaq.de`, so the credentials in GitHub can reach nothing
else. The workflow needs the repository secrets `FTP_HOST` (the KAS server address, `w0XXXXXX.kasserver.com`),
`FTP_USER` and `FTP_PASSWORD`, plus `FTP_SERVER_DIR` only if the user is not already pinned to the document root. The
upload keeps a `.ftp-deploy-sync-state.json` on the server and only transfers files whose content changed; files that
disappeared from the export are deleted. Deployments run in the `production` environment, so approval rules can be
attached there.

Every run ends with an e-mail stating whether the site was deployed, the upload failed, or the deployment was skipped
because the tests were not green. It is sent through an SMTP mailbox configured with the secrets `MAIL_SERVER`,
`MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_FROM` and `MAIL_TO` (plus `MAIL_PORT` if not 465); without `MAIL_SERVER` the
step is skipped.

To deploy by hand:

```bash
pnpm build
lftp -e "mirror --reverse --delete --verbose out/ ./; quit" -u <ftp-user> ftps://w0XXXXXX.kasserver.com
```

The `out/` directory is a complete static site and can be served by any web server. The included `.htaccess` maps
clean `/api/news/<year>` URLs to the JSON files, sets the right type for the Open Graph image and adds cache headers.