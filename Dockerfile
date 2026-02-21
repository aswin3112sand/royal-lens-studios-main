# syntax=docker/dockerfile:1

FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies first for better layer caching.
COPY royal-lens-studios-main/package.json royal-lens-studios-main/package-lock.json ./
RUN npm ci

COPY royal-lens-studios-main/ ./

# Optional build-time overrides for Vite env values.
ARG VITE_SUPABASE_PROJECT_ID
ARG VITE_SUPABASE_PUBLISHABLE_KEY
ARG VITE_SUPABASE_URL
ENV VITE_SUPABASE_PROJECT_ID=$VITE_SUPABASE_PROJECT_ID
ENV VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

RUN npm install -g serve@14.2.4
COPY --from=builder /app/dist ./dist

ENV PORT=8080
EXPOSE 8080

CMD ["sh", "-c", "serve -s dist -l ${PORT}"]
