import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 45_000,
  expect: {
    timeout: 5_000,
  },
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry',
  },
  webServer: {
    // Build and serve the plain Node SSR output. This avoids the Cloudflare
    // dev bindings (Wrangler/workerd subprocess) that nuxi dev spins up,
    // which can crash silently in sandboxed/containerized environments.
    command: 'pnpm run build && node .output/server/index.mjs',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    env: { PORT: '4173', HOST: '127.0.0.1' },
  },
});
