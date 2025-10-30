# phpMyFAQ Website

Modern Next.js website for [phpMyFAQ](https://www.phpmyfaq.de), a popular open-source FAQ management system.

## Tech Stack

- **Next.js 15.5.4** with App Router
- **TypeScript** for type safety
- **Bootstrap 5** for responsive design
- **SCSS** for styling
- **Font Awesome** for icons
- **Vitest** for unit testing
- **Playwright** for E2E testing

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Start the development server:

```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

### Development

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Testing

- `pnpm test` - Run unit tests with Vitest
- `pnpm test:ui` - Run unit tests with UI
- `pnpm test:coverage` - Run unit tests with a coverage report
- `pnpm test:e2e` - Run Playwright E2E tests
- `pnpm test:e2e:ui` - Run E2E tests with UI
- `pnpm test:e2e:headed` - Run E2E tests in headed mode

### Data Fetching

- `pnpm fetch:versions` - Fetch latest version information
- `pnpm fetch:downloads` - Fetch download metadata
- `pnpm update:data` - Update all external data

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── download/          # Download page
│   ├── features/          # Features page
│   ├── documentation/     # Documentation page
│   ├── support/           # Support page
│   ├── news/              # News pages (by year)
│   ├── docs/              # Documentation pages
│   ├── security/          # Security advisories
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.scss       # Global styles
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── Hero.tsx           # Homepage hero section
│   ├── RecentNews.tsx     # News component with markdown parsing
│   └── PageLayout.tsx     # Page layout wrapper
├── lib/                   # Utility functions
│   ├── data.ts            # Data fetching helpers
│   ├── news.ts            # News markdown parser
│   └── markdown.ts        # Markdown/Handlebars processor
└── test/                  # Test configuration
e2e/                       # Playwright E2E tests
public/                    # Static assets
data/                      # External data (versions, downloads)
scripts/                   # Data fetching scripts
```

## Testing

### Unit Tests

This project includes comprehensive unit tests using Vitest and React Testing Library:

- Component rendering and behavior
- Utility functions and data helpers
- News parsing and markdown processing

Run unit tests:

```bash
pnpm test              # Run all tests
pnpm test:ui           # Interactive UI
pnpm test:coverage     # Coverage report
```

### E2E Tests

Playwright E2E tests ensure:

- All pages load correctly (no 404 errors)
- Navigation works properly
- Favicon loads without errors
- Page content displays correctly

Run E2E tests:

```bash
pnpm test:e2e          # Headless mode
pnpm test:e2e:ui       # Interactive UI
pnpm test:e2e:headed   # Headed browser mode
```

## Development

The site uses:

- **Bootstrap classes** for responsive layout
- **Custom fonts** (Lato, Cabin) loaded from `/public/fonts/`
- **Component-based architecture** for maintainability
- **TypeScript** for development safety

## Deployment

Build the static site:

```bash
pnpm build
```

The site is optimized for static hosting and can be deployed to any static hosting provider.
