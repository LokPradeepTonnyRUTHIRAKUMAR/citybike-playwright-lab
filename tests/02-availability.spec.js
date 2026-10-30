const { test, expect } = require('@playwright/test');

test('BUG-101: available-only filter excludes zero-bike stations', async ({ page }) => {
  await page.goto('/');

  // Check that four stations are initially displayed
  await expect(page.getByTestId('station-card')).toHaveCount(4);

  // Enable Available bikes only
  await page.getByRole('checkbox', {
    name: 'Available bikes only'
  }).check();

  // Check that only three stations remain
  await expect(page.getByTestId('station-card')).toHaveCount(3);

  // Riverside Park should disappear
  await expect(
    page.getByRole('heading', { name: 'Riverside Park' })
  ).toHaveCount(0);
});