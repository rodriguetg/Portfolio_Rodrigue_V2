#!/bin/bash
set -e

cd ~/portfolio

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Déploiement rodespe.com — $(date '+%Y-%m-%d %H:%M')"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo "→ Pull depuis GitHub..."
git pull

echo "→ Arrêt de l'ancien container (évite conflit de nom)..."
docker compose -f docker-compose.prod.yml down

echo "→ Rebuild + redémarrage..."
docker compose -f docker-compose.prod.yml up -d --build

echo "→ Nettoyage des vieilles images..."
docker image prune -f

echo "→ Vérification..."
sleep 3
docker ps | grep portfolio_app || { echo "❌ Container pas up !"; exit 1; }

STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://rodespe.com)
if [ "$STATUS" = "200" ]; then
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "✅ Déployé — https://rodespe.com répond $STATUS"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
else
    echo "⚠️  Site répond $STATUS — vérifier les logs :"
    echo "   docker logs portfolio_app --tail 50"
fi
