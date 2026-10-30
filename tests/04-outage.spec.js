const { test, expect } = require('@playwright/test');

test('station API outage shows an error and retry restores results', async ({ page }) => {
  let attempts = 0;

  // Intercept station API requests.
  await page.route('**/api/stations', async route => {
    attempts++;

    if (attempts === 1) {
      // First request: simulate server failure.
      await route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Service temporarily unavailable'
        })
      });
    } else {
      // Second request: allow the real API request.
      await route.continue();
    }
  });

  // Open the application.
  await page.goto('/');

  // Verify the error message.
  await expect(
    page.getByRole('alert')
  ).toContainText('Unable to load stations.');

  // Verify that the first request failed.
  expect(attempts).toBe(1);

  // Click Retry loading.
  await page.getByRole('button', {
    name: 'Retry loading'
  }).click();

  // Verify that all four stations return.
  await expect(
    page.getByTestId('station-card')
  ).toHaveCount(4);

  // Verify that the error disappears.
  await expect(
    page.getByRole('alert')
  ).toBeHidden();

  // Verify that retry was attempted.
  expect(attempts).toBe(2);
});