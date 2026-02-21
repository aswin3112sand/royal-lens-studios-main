# Render Deployment and Blank Screen Fix (Vite + React)

This project is:
- Frontend: Vite + React
- Backend integration: Supabase client SDK in frontend (`src/integrations/supabase/client.ts`)

## Required Render static site settings

Use these exact settings in Render:

- Service Type: `Static Site`
- Root Directory: `royal-lens-studios-main`
- Build Command: `npm run build`
- Publish Directory: `dist`

If you deploy using Render Blueprint, this repo already includes `render.yaml` at the repo root with these values.

## Required environment variables

Add these in Render -> Service -> Environment:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

Use the same values from local `.env`.  
Template: `.env.render.example`

Important: Vite reads `VITE_*` vars at build time, so redeploy after changing them.

## React Router rewrite rule

Because the app uses `BrowserRouter`, add SPA rewrite:

- Source: `/*`
- Destination: `/index.html`
- Action: `Rewrite`

If using `render.yaml`, this route is already configured.

## Console and Network debug steps

1. Open deployed URL in Chrome.
2. Open DevTools (`F12`).
3. In Console, enable `Preserve log`.
4. In Network, enable `Disable cache`.
5. Hard refresh (`Ctrl+Shift+R`).
6. Check:
- `index.html` returns `200`.
- `/assets/*.js` returns `200` (no `404`, no HTML MIME mismatch).
- no runtime startup error about Supabase URL/key.

## Error -> fix mapping

### 1) `404` for `/assets/...js` or CSS
- Cause: wrong Root Directory / Publish Directory.
- Fix:
  - Root Directory = `royal-lens-studios-main`
  - Build Command = `npm run build`
  - Publish Directory = `dist`

### 2) `supabaseUrl is required` or undefined key
- Cause: missing `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY`.
- Fix:
  - Set env vars in Render.
  - Trigger a fresh deploy.

### 3) Blank page on deep links like `/about`
- Cause: missing SPA rewrite.
- Fix:
  - Add rewrite `/* -> /index.html`.

### 4) `Failed to fetch dynamically imported module`
- Cause: stale browser cache with old chunk map.
- Fix:
  - Hard refresh / incognito.
  - Redeploy once if needed.

### 5) MIME type errors for JS (`text/html`)
- Cause: static path/rewrite misconfiguration.
- Fix:
  - Correct publish directory and SPA rewrite config.

## Quick verification after deploy

1. Open `/` and confirm full app renders.
2. Open `/services` directly and confirm route renders.
3. Confirm Network shows all JS chunks as `200`.
4. Confirm no startup errors in Console.
