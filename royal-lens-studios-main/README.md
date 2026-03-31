# Photographer Website

Frontend-only photography studio website built with Vite, React, TypeScript, Tailwind, Framer Motion, and shadcn-style UI components.

## Local development

From repo root:

```bash
cd royal-lens-studios-main
npm.cmd install
npm.cmd run dev -- --host 0.0.0.0 --port 5173
```

App runs on `http://localhost:5173`.

No backend is required. Public content, auth, booking, and admin demo data are handled locally in the browser.

## Demo credentials

- Admin: `admin@royallens.studio` / `admin123`
- Staff: `staff@royallens.studio` / `staff123`
- Client: `client@example.com` / `client123`

## Build

```bash
cd royal-lens-studios-main
npm.cmd run build
```

## Notes

- Visual design, media assets, and frontend theme are unchanged.
- Data is stored in `localStorage`, so it stays frontend-only and can be replaced with real APIs later.
