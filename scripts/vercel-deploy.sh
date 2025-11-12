#!/usr/bin/env bash
set -euo pipefail

# Read environment from .env if present
if [ -f .env ]; then
  # shellcheck disable=SC2046
  export $(grep -v '^#' .env | xargs -d '\n')
fi

VERCEL_TOKEN="${VERCEL_TOKEN:?Missing VERCEL_TOKEN}"
VERCEL_PROJECT="${VERCEL_PROJECT:-automate-site}"
VERCEL_TEAM_FLAG=""
if [ -n "${VERCEL_TEAM:-}" ]; then
  VERCEL_TEAM_FLAG="--scope ${VERCEL_TEAM}"
fi

# Optional: build locally first
pnpm build

# Deploy preview (pass --prod for production)
npx -y vercel --yes --name "${VERCEL_PROJECT}" --token "${VERCEL_TOKEN}" ${VERCEL_TEAM_FLAG} "$@"
