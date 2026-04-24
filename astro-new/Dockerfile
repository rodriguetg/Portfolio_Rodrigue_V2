# syntax=docker/dockerfile:1

# ─── Stage 1 : Build Astro SSG ────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install deps (cached layer)
COPY package.json package-lock.json ./
RUN npm ci

# Copy sources & build
COPY . .
RUN npm run build

# ─── Stage 2 : Serve with Nginx ────────────────────────────────────────────
FROM nginx:alpine

# Remove default static site
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
