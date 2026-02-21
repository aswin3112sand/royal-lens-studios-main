# syntax=docker/dockerfile:1

FROM node:20-alpine AS frontend-build
WORKDIR /frontend

COPY royal-lens-studios-main/package.json royal-lens-studios-main/package-lock.json ./
RUN npm ci

COPY royal-lens-studios-main/ ./
RUN npm run build

FROM maven:3.9.9-eclipse-temurin-17 AS backend-build
WORKDIR /app

COPY backend/pom.xml backend/pom.xml
RUN mvn -f backend/pom.xml -DskipTests dependency:go-offline

COPY backend/ backend/
COPY --from=frontend-build /frontend/dist backend/src/main/resources/static
RUN mvn -f backend/pom.xml -DskipTests package

FROM eclipse-temurin:17-jre-alpine AS runner
WORKDIR /app

COPY --from=backend-build /app/backend/target/photographer-backend.jar app.jar

ENV PORT=8080
EXPOSE 8080

CMD ["sh", "-c", "java -Dserver.port=${PORT} -jar app.jar"]
