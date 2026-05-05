#!/usr/bin/env bash
# Headless demo flow — exercises the approve and block paths via curl.
# Requires: `docker compose up` to be running and healthy first.

set -e

BANK="${BANK:-http://localhost:3000}"
ENGINE="${ENGINE:-http://localhost:8080}"

GREEN="\033[32m"
RED="\033[31m"
DIM="\033[2m"
RST="\033[0m"

echo -e "${DIM}--- engine health ---${RST}"
curl -fsS "$ENGINE/health" | jq . || curl -fsS "$ENGINE/health"
echo

run() {
  local label="$1"; shift
  local mcc="$1"; shift
  local amount="$1"; shift
  local expect="$1"; shift

  echo -e "${DIM}--- $label  (MCC $mcc · ฿$amount · expect $expect) ---${RST}"
  local body
  body=$(printf '{"label":"%s","mcc":%s,"amount":%s}' "$label" "$mcc" "$amount")
  local resp
  resp=$(curl -fsS -X POST "$BANK/api/transaction" -H 'Content-Type: application/json' -d "$body")
  local status
  status=$(echo "$resp" | (jq -r .status 2>/dev/null || sed -n 's/.*"status":"\([^"]*\)".*/\1/p'))

  if [[ "$status" == "$expect" ]]; then
    echo -e "${GREEN}OK${RST} → status=$status"
  else
    echo -e "${RED}MISMATCH${RST} → got status=$status, expected=$expect"
  fi
  echo "$resp" | (jq . 2>/dev/null || cat)
  echo
}

run "Pay Electricity Bill" 4900 1200    approved
run "Hospital Donation"    8062 5000    approved
run "Gold Rolex"           5944 850000  blocked
run "Casino Chips"         7995 100000  blocked

echo -e "${DIM}--- recent history ---${RST}"
curl -fsS "$BANK/api/history" | (jq '.[0:6]' 2>/dev/null || cat)
echo
