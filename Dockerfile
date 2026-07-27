# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY index.html vite.config.js ./
COPY src/ ./src/
RUN npm run build
# Output: /app/dist/

# ── Stage 2: Serve ───────────────────────────────────────────────────────────
# nginx:alpine publishes multi-arch images (amd64/arm64/armv7), so this also
# builds and runs directly on a Raspberry Pi if you'd rather not cross-build.
FROM nginx:alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1
