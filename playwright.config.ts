import { defineConfig, devices } from '@playwright/test';

// The suite runs against the static export in out/, served the way the
// production host serves it, so it tests what is actually deployed. Start the
// server yourself with `pnpm build && pnpm serve` to skip the rebuild between
// local runs; outside CI an already running server is reused.
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3100',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'pnpm build && pnpm serve',
    url: 'http://localhost:3100',
    reuseExistingServer: !process.env.CI,
    timeout: 300000,
    env: {
      PORT: '3100',
    },
  },
});