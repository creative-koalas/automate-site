#!/usr/bin/env bash
set -euo pipefail

REMOTE="${REMOTE:-origin}"
BRANCH="${BRANCH:-main}"

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  echo "Not a git repository. Initializing..."
  git init -q
  git add -A
  git commit -m "chore: initial commit" -q || true
fi

if ! git remote | grep -q "^${REMOTE}$"; then
  if [ -z "${GIT_URL:-}" ]; then
    echo "Missing GIT_URL. Set GIT_URL env or add remote manually: git remote add ${REMOTE} <url>"
    exit 1
  fi
  git remote add "${REMOTE}" "${GIT_URL}"
fi

git push -u "${REMOTE}" "HEAD:${BRANCH}"
