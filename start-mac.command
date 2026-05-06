#!/usr/bin/env bash
# Sila Protocol — macOS one-click launcher.
# Double-click this file in Finder to run. (Right-click > Open the first time
# to bypass Gatekeeper if macOS warns about an unidentified developer.)

set -e
cd "$(dirname "$0")"

YEL="\033[33m"; GRN="\033[32m"; RED="\033[31m"; DIM="\033[2m"; BLD="\033[1m"; RST="\033[0m"

banner() {
  printf "\n${YEL}=========================================================${RST}\n"
  printf  "${BLD}  SILA PROTOCOL${RST}  ·  Temple Transparency Demo\n"
  printf  "${DIM}  Runs on your machine only — no data leaves your computer.${RST}\n"
  printf  "${YEL}=========================================================${RST}\n\n"
}

ok()  { printf " ${GRN}[ok]${RST}  %s\n" "$1"; }
info(){ printf " ${YEL}[..]${RST}  %s\n" "$1"; }
err() { printf " ${RED}[!] ${RST}  %s\n" "$1"; }

press_any_key() {
  printf "\n%s" "$1"
  read -n 1 -s -r
  printf "\n"
}

banner

# ---- 1. Docker installed? --------------------------------------------------
if ! command -v docker >/dev/null 2>&1; then
  err "Docker is not installed on this machine."
  echo
  echo "  You have two options:"
  echo
  echo "  ---------------------------------------------------------------"
  echo "  EASIEST  -  Run the demo in your browser, no install needed:"
  echo
  echo "     https://codespaces.new/Anon5th/Sila?quickstart=1"
  echo
  echo "     (opens in your browser; needs only a free GitHub account)"
  echo "  ---------------------------------------------------------------"
  echo
  echo "  OR install Docker Desktop locally:"
  echo "     1. Download from  https://www.docker.com/products/docker-desktop/"
  echo "     2. Install and restart your Mac"
  echo "     3. Re-run this script"
  press_any_key "Press any key to exit..."
  exit 1
fi
ok "Docker is installed."

# ---- 2. Docker daemon running? ---------------------------------------------
if ! docker info >/dev/null 2>&1; then
  info "Docker Desktop is not running. Starting it..."
  open -a Docker || true

  for i in {1..40}; do
    sleep 3
    if docker info >/dev/null 2>&1; then
      break
    fi
    printf "      ...still waiting for Docker to start (%d/40)\n" "$i"
  done

  if ! docker info >/dev/null 2>&1; then
    err "Docker daemon did not start in 2 minutes."
    echo "      Open Docker Desktop manually, wait until it says \"Engine running\","
    echo "      then re-run this script."
    press_any_key "Press any key to exit..."
    exit 2
  fi
fi
ok "Docker daemon is running."

# ---- 3. Pull (fast path) or build (fallback) ------------------------------
echo ""
info "Pulling pre-built images from GitHub Container Registry..."

if docker compose pull >/dev/null 2>&1; then
  ok "Images pulled."
  echo ""
  info "Starting all services..."
  if ! docker compose up -d --no-build; then
    err "docker compose failed."
    echo "      For diagnostics:   docker compose logs"
    press_any_key "Press any key to exit..."
    exit 3
  fi
else
  info "Pull skipped — building from source instead."
  echo  "      First-run build takes 5–10 minutes (downloads Rust + Hardhat deps)."
  echo ""
  if ! docker compose up -d --build; then
    err "docker compose failed."
    echo "      For diagnostics:   docker compose logs"
    press_any_key "Press any key to exit..."
    exit 3
  fi
fi

# ---- 4. Wait for dashboard -------------------------------------------------
echo ""
info "Waiting for the dashboard to come online..."
ready=0
for i in {1..60}; do
  if curl -sf http://localhost:3000/api/health >/dev/null 2>&1; then
    ready=1
    break
  fi
  sleep 2
done

if [[ "$ready" -ne 1 ]]; then
  err "The dashboard did not come up in 2 minutes."
  echo "      Check the logs with:   docker compose logs"
  press_any_key "Press any key to exit..."
  exit 3
fi
ok "Dashboard is ready."

echo ""
printf "${YEL}=========================================================${RST}\n"
printf "${BLD}  SILA PROTOCOL is running.${RST}\n"
printf "  Open in browser:  ${GRN}http://localhost:3000${RST}\n"
printf "${YEL}=========================================================${RST}\n\n"

open http://localhost:3000 || true

press_any_key "Press any key to STOP all services and exit..."

# ---- 5. Tear down ----------------------------------------------------------
echo ""
info "Stopping services..."
docker compose down >/dev/null 2>&1 || docker compose down
ok "Stopped. You can close this window."
echo ""
press_any_key "Press any key to close..."
