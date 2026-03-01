# Render Deploy Guide (Spring Boot + React, Single Docker Service)

## Service settings
- Type: **Web Service**
- Environment: **Docker**
- Dockerfile: `./Dockerfile`
- Health Check Path: `/actuator/health`
- Graceful shutdown window: `maxShutdownDelaySeconds: 45` (in `render.yaml`)

## Required env vars

```env
SPRING_PROFILES_ACTIVE=prod
SPRING_DATASOURCE_URL=jdbc:h2:mem:photographer;MODE=MySQL;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
SPRING_DATASOURCE_USERNAME=sa
SPRING_DATASOURCE_PASSWORD=
SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.h2.Driver
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_FLYWAY_ENABLED=false
APP_FORCE_H2_FALLBACK=false
APP_AUTO_H2_FALLBACK=true
JWT_SECRET=<64+ char secret>
JWT_EXPIRATION_MS=86400000
COOKIE_SECURE=true
COOKIE_SAMESITE=Lax
APP_CORS_ALLOWED_ORIGINS=https://<your-render-domain>
```

`VITE_API_BASE_URL` is optional in production because frontend and API are same origin inside the same Spring app.
Keep it empty unless frontend is hosted separately.

## Performance defaults included in this repo
- Production gzip compression is enabled in `application-prod.yml`.
- Docker runtime uses container-aware JVM memory flags (`JAVA_OPTS`).

## Blank screen checklist
1. Open browser DevTools -> Console + Network.
2. Verify `/index.html` is 200.
3. Verify `/assets/*.js` files are 200.
4. Verify `/api/public/packages` and `/api/public/testimonials` are 200.
5. Check backend logs for DB connection or Flyway failures.

## Common error mapping
- `500` on startup + `Communications link failure`: invalid MySQL host/port (never use `localhost` on Render) or DB server unreachable.
- `401` everywhere: auth cookie not set or blocked (check `COOKIE_SECURE`, `same-site`).
- `Failed to fetch`: wrong API base URL in local dev env.
- React route blank on refresh: ensure backend fallback controller is included (already added).

## Switching to MySQL later
1. Update Render env vars to real MySQL endpoint (`SPRING_DATASOURCE_URL`, username/password, driver).
2. Set:
   - `SPRING_DATASOURCE_DRIVER_CLASS_NAME=com.mysql.cj.jdbc.Driver`
   - `SPRING_JPA_HIBERNATE_DDL_AUTO=validate`
   - `SPRING_FLYWAY_ENABLED=true`
3. Redeploy.
