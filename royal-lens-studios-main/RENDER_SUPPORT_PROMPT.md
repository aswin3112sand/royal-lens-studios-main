# Render Support Prompt (Vite + React + Spring Boot + MySQL)

My project uses:
- Frontend: Vite + React
- Backend: Spring Boot (JWT in HttpOnly cookies)
- DB: MySQL
- Deploy target: Render Web Service (Docker)

Current issue: deployed app shows blank/partial page.

Please debug with this exact checklist:
1. Verify Render is configured as **Web Service** using Dockerfile.
2. Confirm env vars are present:
   - SPRING_DATASOURCE_URL
   - SPRING_DATASOURCE_USERNAME
   - SPRING_DATASOURCE_PASSWORD
   - JWT_SECRET
   - COOKIE_SECURE
   - COOKIE_SAMESITE
   - APP_CORS_ALLOWED_ORIGINS
3. Check health endpoint `/actuator/health` is 200.
4. In browser network, confirm:
   - `/index.html` 200
   - `/assets/*.js` 200
   - `/api/public/packages` 200
5. If auth fails, confirm `Set-Cookie` for `AUTH_TOKEN` is present on login and not blocked by browser policy.
6. If deep-link routes fail, verify Spring fallback forwards non-API routes to `index.html`.

Expected result:
- Homepage content loads
- Auth works (register/login/logout)
- Admin routes work for ADMIN/STAFF users
- No blank screen on refresh or deep-link