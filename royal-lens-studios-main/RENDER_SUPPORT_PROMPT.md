# Render Support Prompt (Tamil + English)

Use this prompt when asking support/AI to debug Render blank screen issues for this project:

```text
My deployed site on Render is showing a blank/dark screen.
Please debug with exact fixes for my stack.

Project details:
- Frontend: Vite + React (SPA with BrowserRouter)
- Backend: Supabase client integration in frontend
- Repo structure: nested app folder -> royal-lens-studios-main
- I want live Render behavior to match localhost exactly.

Required Render config (must verify):
- Service Type: Static Site
- Root Directory: royal-lens-studios-main
- Build Command: npm run build
- Publish Directory: dist
- SPA Rewrite: /* -> /index.html (Rewrite)

Required env vars (Render -> Environment):
- VITE_SUPABASE_URL
- VITE_SUPABASE_PUBLISHABLE_KEY
- VITE_SUPABASE_PROJECT_ID

Please check and fix these blank-screen causes:
1) wrong build/publish/root directory
2) missing VITE env variables
3) missing BrowserRouter rewrite
4) stale chunk cache (`Failed to fetch dynamically imported module`)
5) JS MIME mismatch (`text/html` served for JS assets)

Give step-by-step Console + Network debugging:
- Open DevTools
- Preserve log
- Disable cache
- Hard refresh
- Verify index.html 200
- Verify /assets/*.js 200
- Verify no runtime env errors

Expected success criteria:
- Home route loads full UI (not dark blank)
- Direct routes (/about, /services, /contact) load correctly
- No missing chunk errors after refresh
- Mobile load also works without blank transitions
```

Short Tamil note:
- Render la `Root Directory`, `Build Command`, `Publish Directory`, `Rewrite`, `VITE_*` env values sariyaa irukkanum.
- idhu wrong-na blank screen varum.
