#!/usr/bin/env bash
# Build and (re)deploy the widget-dashboard container via docker compose.
#
# Usage:
#   ./deploy.sh          build and start (or restart) the app in the background
#   ./deploy.sh logs     follow the running container's logs
#   ./deploy.sh stop     stop and remove the container
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

if command -v docker compose >/dev/null 2>&1 || docker compose version >/dev/null 2>&1; then
  COMPOSE=(docker compose)
elif command -v docker-compose >/dev/null 2>&1; then
  COMPOSE=(docker-compose)
else
  echo "error: neither 'docker compose' nor 'docker-compose' is available" >&2
  exit 1
fi

case "${1:-up}" in
  up)
    "${COMPOSE[@]}" up -d --build
    echo "widget-dashboard is running at http://localhost:8080"
    ;;
  logs)
    "${COMPOSE[@]}" logs -f
    ;;
  stop)
    "${COMPOSE[@]}" down
    ;;
  *)
    echo "usage: $0 [up|logs|stop]" >&2
    exit 1
    ;;
esac
