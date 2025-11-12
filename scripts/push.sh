#!/usr/bin/env bash
set -euo pipefail

if [ -f .env ]; then
  # shellcheck disable=SC2046
  export $(grep -v '^#' .env | xargs -d '\n')
fi

REMOTE="${REMOTE:-origin}"
BRANCH="${BRANCH:-main}"

if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo "Not a git repository. Initializing..."
  git init -q
  git add -A
  git commit -m "chore: initial commit" -q || true
fi

if ! git remote | grep -q "^${REMOTE}$"; then
  if [ -z "${GIT_URL:-}" ]; then
    echo "Missing GIT_URL. Create .env from .env.example and set GIT_URL."
    exit 1
  fi
  git remote add "${REMOTE}" "${GIT_URL}"
fi

# Ensure branch exists remotely
UPSTREAM_EXISTS=$(git ls-remote --heads "${REMOTE}" "${BRANCH}" | wc -l || true)
if [ "${UPSTREAM_EXISTS}" -eq 0 ]; then
  echo "Creating remote branch ${BRANCH} on ${REMOTE}"
fi

git push -u "${REMOTE}" "HEAD:${BRANCH}"
