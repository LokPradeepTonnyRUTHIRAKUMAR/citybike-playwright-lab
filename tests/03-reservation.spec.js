const { test, expect } = require('@playwright/test');

// Test 1: Invalid email should not send a POST request.
test('invalid email blocks reservation', async ({ page }) => {
  await page.goto('/');

  // Wait until stations are displayed.
  await expect(page.getByTestId('station-card')).toHaveCount(4);

  // Select Central Square.
  await page.getByRole('button', {
    name: 'Reserve at Central Square'
  }).click();

  // Monitor reservation API requests.
  let postRequests = 0;

  page.on('request', request => {
    if (
      request.url().includes('/api/reservations') &&
      request.method() === 'POST'
    ) {
      postRequests++;
    }
  });

  // Enter an invalid email.
  await page.getByLabel('Email address').fill('invalid-email');

  // Submit the reservation.
  await page.getByRole('button', {
    name: 'Confirm reservation'
  }).click();

  // Verify validation error.
  await expect(
    page.getByText('Enter a valid email address.')
  ).toBeVisible();

  // Verify that no POST request was sent.
  expect(postRequests).toBe(0);
});


// Test 2: Successful reservation with mocked API response.
test('reservation sends correct payload and confirms booking', async ({ page }) => {
  await page.goto('/');

  // Wait for station cards.
  await expect(page.getByTestId('station-card')).toHaveCount(4);

  // Select Central Square.
  await page.getByRole('button', {
    name: 'Reserve at Central Square'
  }).click();

  let requestBody;

  // Intercept reservation API.
  await page.route('**/api/reservations', async route => {
    requestBody = route.request().postDataJSON();

    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({
        reservationId: 'CB-DEMO-777'
      })
    });
  });

  // Enter valid email.
  await page.getByLabel('Email address').fill('student@example.com');

  // Confirm reservation.
  await page.getByRole('button', {
    name: 'Confirm reservation'
  }).click();

  // Verify request payload.
  await expect.poll(() => requestBody).toEqual({
    stationId: 'central',
    email: 'student@example.com'
  });

  // Verify successful reservation message.
  await expect(
    page.getByText('Reservation confirmed: CB-DEMO-777')
  ).toBeVisible();
});