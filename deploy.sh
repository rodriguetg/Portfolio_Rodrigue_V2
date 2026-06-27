#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
echo "==> Build & up rodespe v3"
docker compose -f docker-compose.prod.yml up -d --build
docker image prune -f
sleep 6
echo "==> Healthcheck"
curl -sSf https://rodespe.com >/dev/null 2>&1 && echo "OK : rodespe.com répond" || echo "⚠ Healthcheck KO (vérifie les logs : docker compose -f docker-compose.prod.yml logs -f)"
