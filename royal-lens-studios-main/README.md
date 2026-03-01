# Photographer Website

Full-stack project with:
- Frontend: Vite + React + Tailwind (`royal-lens-studios-main/`)
- Backend: Java Spring Boot + JWT + MySQL (`backend/`)
- Deploy: Render Web Service (Docker)

## Local development

### 1) Start backend (Spring Boot)
From repo root:

```bash
cd backend
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

Backend runs on `http://localhost:8080`.

On Windows PowerShell, use:

```powershell
cd backend
.\mvnw.cmd spring-boot:run --% -Dspring-boot.run.profiles=dev
```

`mvnw` auto-downloads Maven, so no global Maven install is required.

### 2) Start frontend (Vite)
From repo root:

```bash
cd royal-lens-studios-main
npm.cmd install
npm.cmd run dev -- --host 0.0.0.0 --port 5173
```

Frontend runs on `http://localhost:5173`.

Create `royal-lens-studios-main/.env` with:

```env
VITE_API_BASE_URL=http://localhost:8080
```

## Docker (single service style)
From repo root:

```bash
docker compose up --build
```

App runs on `http://localhost:8080`.

## Render deployment
- Service type: `Web Service` (Docker)
- Uses root `Dockerfile`
- Health check: `/actuator/health`
- Configure env vars from `royal-lens-studios-main/.env.render.example`
- Keep `VITE_API_BASE_URL` empty for same-origin setup (frontend + API in same service)

## Admin promotion (manual)
After first user signup, promote admin in MySQL:

```sql
UPDATE users SET role='ADMIN' WHERE email='your-email@example.com';
```
