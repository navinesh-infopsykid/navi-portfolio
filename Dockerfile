# ─────────────────────────────────────────────────────────────
# Navineshraj R — portfolio
# Stage 1 builds the static site with Node; stage 2 serves it with
# a small, non-root nginx image (~25 MB). Works on Render, Railway,
# Fly.io, Koyeb, Google Cloud Run, a VPS — anything that runs Docker.
#
#   docker build -t navi-portfolio .
#   docker run -p 8080:8080 navi-portfolio   → http://localhost:8080
# ─────────────────────────────────────────────────────────────

# ---------- 1. build ----------
FROM node:22-alpine AS build
WORKDIR /app

# Install deps first so Docker can cache this layer between builds
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .

# Served from the domain root inside the container (not /navi-portfolio/)
ARG VITE_BASE=/
# Optional — the contact form falls back to a mailto link without them
ARG VITE_EMAIL_SERVICE_ID=""
ARG VITE_EMAIL_TEMPLATE_ID=""
ARG VITE_EMAIL_PUBLIC_KEY=""
ENV VITE_BASE=$VITE_BASE \
    VITE_EMAIL_SERVICE_ID=$VITE_EMAIL_SERVICE_ID \
    VITE_EMAIL_TEMPLATE_ID=$VITE_EMAIL_TEMPLATE_ID \
    VITE_EMAIL_PUBLIC_KEY=$VITE_EMAIL_PUBLIC_KEY

RUN npm run build

# ---------- 2. serve ----------
FROM nginxinc/nginx-unprivileged:1.27-alpine AS runtime

# Hosts like Render / Railway / Cloud Run inject $PORT; default 8080.
ENV PORT=8080
COPY deploy/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT}/healthz" || exit 1
