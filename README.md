# phpMyFAQ Website

Modern Next.js website for [phpMyFAQ](https://github.com/thorsten/phpMyFAQ) - the multilingual FAQ system.

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Bootstrap 5** for responsive design
- **SCSS** for styling
- **Playwright** for E2E testing

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test:e2e` - Run Playwright E2E tests
- `npm run test:e2e:ui` - Run E2E tests with UI
- `npm run test:e2e:headed` - Run E2E tests in headed mode

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── download/          # Download page
│   ├── features/          # Features page
│   ├── documentation/     # Documentation page
│   ├── support/           # Support page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.scss       # Global styles
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── Hero.tsx           # Homepage hero section
│   ├── Features.tsx       # News/features component
│   └── PageLayout.tsx     # Page layout wrapper
└── lib/                   # Utility functions
tests/
└── e2e/                   # Playwright E2E tests
public/                    # Static assets
```

## Testing

This project includes comprehensive E2E tests using Playwright to ensure:
- All pages load correctly (no 404 errors)
- Navigation works properly
- Favicon loads without errors
- Page content displays correctly

Run tests:
```bash
npm run test:e2e
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
npm run build
```

The site is optimized for static hosting and can be deployed to any static hosting provider.
