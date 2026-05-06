#!/usr/bin/env bash
# Sila Protocol — Linux one-click launcher.
# Run from a terminal:   ./start-linux.sh
# (chmod +x start-linux.sh once if needed)

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

open_browser() {
  local url="$1"
  if command -v xdg-open  >/dev/null 2>&1; then xdg-open  "$url" >/dev/null 2>&1 &
  elif command -v sensible-browser >/dev/null 2>&1; then sensible-browser "$url" >/dev/null 2>&1 &
  elif command -v gio  >/dev/null 2>&1; then gio open "$url" >/dev/null 2>&1 &
  else
    info "Open this URL manually: $url"
  fi
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
  echo "  OR install Docker locally:"
  echo "     Ubuntu/Debian:  https://docs.docker.com/engine/install/"
  echo "     Fedora:         sudo dnf install docker docker-compose-plugin"
  echo "     Then re-run this script."
  press_any_key "Press any key to exit..."
  exit 1
fi
ok "Docker is installed."

# ---- 2. Docker daemon running? ---------------------------------------------
if ! docker info >/dev/null 2>&1; then
  err "Docker daemon is not running."
  echo "      Start it with:   sudo systemctl start docker"
  echo "      (and:            sudo systemctl enable docker  for autostart)"
  echo "      Then re-run this script."
  press_any_key "Press any key to exit..."
  exit 2
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
for i in $(seq 1 60); do
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

open_browser http://localhost:3000

press_any_key "Press any key to STOP all services and exit..."

# ---- 5. Tear down ----------------------------------------------------------
echo ""
info "Stopping services..."
docker compose down >/dev/null 2>&1 || docker compose down
ok "Stopped."
