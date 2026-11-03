#!/usr/bin/env bash
# Deploys the latest `main` of the EcoShopify frontend as a NEW timestamped release.
# Run ON THE VPS:  bash deploy-front.sh        (add --yes to skip the confirmation)
# Implements docs/deploy-front-only-production-quick.md, with automatic rollback.
set -euo pipefail

REPO_URL="https://github.com/falconofcode/ecoshopify-frontend.git"
BRANCH="main"
BASE_DIR="/home/ecoshopify.com"
RELEASES_DIR="$BASE_DIR/releases"
PM2_NAME="ecoshopify"
PORT="5001"
NPM_BIN="/opt/nvm/versions/node/v20.20.2/bin/npm"
PUBLIC_URL="https://ecoshopify.com"
KEEP_RELEASES=5

# Release name from date and time: release-YYYYMMDD-HHMMSS (never collides in practice)
RELEASE="release-$(date +%Y%m%d-%H%M%S)"
RELEASE_DIR="$RELEASES_DIR/$RELEASE"

step() { printf '\n\033[1;34m==> %s\033[0m\n' "$*"; }
die()  { printf '\n\033[1;31mERROR: %s\033[0m\n' "$*" >&2; exit 1; }

# ---------- 1. Pre-checks ----------
step "1/8 Pre-checks"
for cmd in git node pm2 curl; do command -v "$cmd" >/dev/null || die "$cmd not found"; done
[ -x "$NPM_BIN" ] || die "npm not found at $NPM_BIN"
[ -d "$RELEASES_DIR" ] || die "$RELEASES_DIR does not exist"
[ ! -e "$RELEASE_DIR" ] || die "$RELEASE_DIR already exists, wait a second and retry"

# Current live release (PM2 exec cwd), used for env copy and rollback
PREV_DIR="$(pm2 jlist | node -e '
  let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{
    const p=JSON.parse(s).find(x=>x.name===process.argv[1]);
    console.log(p?p.pm2_env.pm_cwd:"");
  });' "$PM2_NAME")"
echo "Current live release: ${PREV_DIR:-<none>}"
curl -fsS -o /dev/null -I "http://127.0.0.1:$PORT" && echo "Live app responding on $PORT" \
  || echo "WARNING: live app is not responding on $PORT"

# ---------- 2. Check GitHub ----------
step "2/8 Checking latest $BRANCH on GitHub"
REMOTE_SHA="$(git ls-remote "$REPO_URL" "refs/heads/$BRANCH" | cut -c1-7)"
[ -n "$REMOTE_SHA" ] || die "Cannot read $BRANCH from GitHub (check access)"
echo "Latest $BRANCH commit: $REMOTE_SHA"

echo "New release: $RELEASE_DIR"
if [ "${1:-}" != "--yes" ]; then
  read -r -p "Deploy now? [y/N] " ans
  [ "$ans" = "y" ] || [ "$ans" = "Y" ] || die "Cancelled"
fi

# ---------- 3. Clone ----------
step "3/8 Cloning into $RELEASE"
cd "$RELEASES_DIR"
git clone --depth 1 --branch "$BRANCH" "$REPO_URL" "$RELEASE"
cd "$RELEASE_DIR"
CLONED_SHA="$(git rev-parse --short HEAD)"
echo "Cloned commit: $CLONED_SHA"
[ "$CLONED_SHA" = "$REMOTE_SHA" ] || echo "WARNING: main moved since step 2 ($REMOTE_SHA -> $CLONED_SHA)"

# ---------- 4. Env files (not in git; NEXT_PUBLIC_* are baked in at build time) ----------
step "4/8 Carrying over environment files"
if [ -n "$PREV_DIR" ] && [ -f "$PREV_DIR/.env.local" ]; then
  cp "$PREV_DIR/.env.local" .env.local
  echo "Copied .env.local from previous release"
elif [ -f "$BASE_DIR/.env.local" ]; then
  cp "$BASE_DIR/.env.local" .env.local
  echo "Copied $BASE_DIR/.env.local"
else
  echo "No .env.local found; relying on .env from the repository"
fi

# ---------- 5. Install and build ----------
step "5/8 npm ci"
"$NPM_BIN" ci
step "6/8 npm run build"
"$NPM_BIN" run build || die "Build failed. Live release untouched; remove $RELEASE_DIR if you like."

# ---------- 7. Switch PM2 ----------
start_release() {
  pm2 delete "$PM2_NAME" >/dev/null 2>&1 || true
  PORT="$PORT" pm2 start "$NPM_BIN" --name "$PM2_NAME" --cwd "$1" -- start
  pm2 save
}

step "7/8 Starting new release in PM2"
start_release "$RELEASE_DIR"

# ---------- 8. Verify (rollback on failure) ----------
step "8/8 Verifying"
ok=0
for i in $(seq 1 15); do
  if curl -fsS -o /dev/null -I "http://127.0.0.1:$PORT"; then ok=1; break; fi
  sleep 2
done
if [ "$ok" = 1 ]; then
  curl -fsS -o /dev/null -I "$PUBLIC_URL" || { echo "WARNING: $PUBLIC_URL check failed"; ok=0; }
fi

if [ "$ok" != 1 ]; then
  pm2 logs "$PM2_NAME" --lines 40 --nostream || true
  if [ -n "$PREV_DIR" ] && [ -d "$PREV_DIR" ]; then
    echo "Verification failed, rolling back to $PREV_DIR"
    start_release "$PREV_DIR"
    die "Rolled back to $PREV_DIR. Failed release kept at $RELEASE_DIR for inspection."
  fi
  die "Verification failed and no previous release to roll back to"
fi

pm2 list
echo
echo "Deployed $RELEASE ($CLONED_SHA). Previous release kept at: ${PREV_DIR:-none}"

# Prune old releases, never the live or previous one
cd "$RELEASES_DIR"
ls -1dt release-* 2>/dev/null | tail -n +$((KEEP_RELEASES + 1)) | while read -r old; do
  full="$RELEASES_DIR/$old"
  if [ "$full" != "$RELEASE_DIR" ] && [ "$full" != "$PREV_DIR" ]; then
    echo "Removing old release $old"
    rm -rf -- "$full"
  fi
done
