import { test, expect } from '@playwright/test';

const smokeRoutes = [
  { route: '/', heading: 'Luca Invernizzi' },
  { route: '/cv', heading: 'Curriculum Vitae' },
  { route: '/projects', heading: 'Projects' },
  { route: '/publications', heading: 'Publications' },
  { route: '/committees', heading: 'Academic Service' },
] as const;

test.describe('App smoke routes', () => {
  for (const { route, heading } of smokeRoutes) {
    test(`loads ${route} and renders expected heading`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response && response.ok()).toBeTruthy();
      await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
    });
  }
});
