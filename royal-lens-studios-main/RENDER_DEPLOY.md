# Render Deploy Guide (Spring Boot + React, Single Docker Service)

## Service settings
- Type: **Web Service**
- Environment: **Docker**
- Dockerfile: `./Dockerfile`
- Health Check Path: `/actuator/health`

## Required env vars

```env
SPRING_PROFILES_ACTIVE=prod
SPRING_DATASOURCE_URL=jdbc:mysql://<host>:3306/photographer?sslMode=REQUIRED&serverTimezone=UTC
SPRING_DATASOURCE_USERNAME=<username>
SPRING_DATASOURCE_PASSWORD=<password>
SPRING_JPA_HIBERNATE_DDL_AUTO=validate
JWT_SECRET=<64+ char secret>
JWT_EXPIRATION_MS=86400000
COOKIE_SECURE=true
COOKIE_SAMESITE=Lax
APP_CORS_ALLOWED_ORIGINS=https://<your-render-domain>
```

`VITE_API_BASE_URL` is optional in production because frontend and API are same origin inside the same Spring app.

## Blank screen checklist
1. Open browser DevTools -> Console + Network.
2. Verify `/index.html` is 200.
3. Verify `/assets/*.js` files are 200.
4. Verify `/api/public/packages` and `/api/public/testimonials` are 200.
5. Check backend logs for DB connection or Flyway failures.

## Common error mapping
- `500` on startup: datasource/JWT env vars missing.
- `401` everywhere: auth cookie not set or blocked (check `COOKIE_SECURE`, `same-site`).
- `Failed to fetch`: wrong API base URL in local dev env.
- React route blank on refresh: ensure backend fallback controller is included (already added).