# CityBike Playwright QA Challenge · Lab 03

An independent practice application for the CityBike DevOps course. This folder is **not** your previous `citybike-lab` Git repository. Create a new local Git repository or put it into a dedicated GitHub repository.

## Requirements

- Node.js **22 or 24 LTS** and npm
- Git and a code editor
- Internet for initial `npm install` and browser download

## Setup

```bash
npm ci
npx playwright install chromium
npm run check:files
npm run check:api
npm run test:e2e
```

Playwright starts its own Node HTTP server through `webServer` in `playwright.config.js`.
Preview the application manually with `npm start`, then visit http://127.0.0.1:4173. Use Ctrl+C to stop the preview.

On a computer with system Chromium already installed, you can optionally point `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to it, but a managed Playwright Chromium installation is recommended.

## Expected initial behavior

- Two smoke tests pass.
- Challenge tests in `tests/02`–`tests/04` are initially marked `test.skip`.
- One defect is intentionally present in `public/app.js` (`BUG-101`). **Do not fix it until your test demonstrates it.**
- `.github/workflows/playwright.yml` is incomplete on purpose.

## No secrets

This is a fictional service. Never use actual customer data or real credentials. Keep the repository public only if permitted by the instructor; private is fine.


## Troubleshooting and what the ZIP does NOT bundle

- `npm ci` downloads the **exact pinned npm packages** (Playwright Test, Playwright, Playwright Core) described by `package-lock.json`. Internet is needed the first time.
- `npx playwright install chromium` downloads the Chromium browser used by Playwright; it is **not bundled** because the browser is large and OS-specific.
- On Linux if system libraries are missing, use `npx playwright install --with-deps chromium` (administrator privileges may be required).
- If the `npx playwright install chromium` command times out, check the network/proxy settings. On locked-down networks, prepare each machine before class.
- `npm run check:api` verifies the standalone application with five API/HTTP checks **without installing npm packages**.
- `npm run check:files` verifies all project files, npm packages and Playwright Chromium once installation is complete.
- The workflow file in `.github/workflows/playwright.yml` and four `test.skip(...)` exercises are incomplete **intentionally**: students must implement them. Initially, 2 smoke tests pass and 4 challenges are skipped.
- The tests and application run locally; **no Python, Docker, Jenkins, API keys, .env files, or previous CityBike Git lab are needed**.
- Do not use `npm init playwright@latest`: that creates a different project and can overwrite or complicate the workshop files.
