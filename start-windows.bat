@echo off
setlocal enabledelayedexpansion
title Sila Protocol Launcher

echo.
echo  =========================================================
echo    SILA PROTOCOL  -  Temple Transparency Demo
echo    https://sila-protocol.local  (runs on your machine only)
echo  =========================================================
echo.

REM ---- 1. Docker installed? ---------------------------------------------
where docker >nul 2>&1
if errorlevel 1 (
    echo  [!] Docker is not installed.
    echo.
    echo      This demo needs Docker Desktop.
    echo      Install it from:  https://www.docker.com/products/docker-desktop/
    echo      Then re-run this script.
    echo.
    pause
    exit /b 1
)
echo  [ok]  Docker is installed.

REM ---- 2. Docker daemon running? ----------------------------------------
docker info >nul 2>&1
if errorlevel 1 (
    echo  [..]  Docker Desktop is not running. Starting it...
    if exist "%ProgramFiles%\Docker\Docker\Docker Desktop.exe" (
        start "" "%ProgramFiles%\Docker\Docker\Docker Desktop.exe"
    ) else if exist "%LOCALAPPDATA%\Programs\Docker\Docker\Docker Desktop.exe" (
        start "" "%LOCALAPPDATA%\Programs\Docker\Docker\Docker Desktop.exe"
    ) else (
        echo  [!] Could not find Docker Desktop. Open it manually and re-run.
        pause
        exit /b 2
    )

    set /a TRIES=0
    :wait_docker
    timeout /t 3 /nobreak >nul
    docker info >nul 2>&1
    if not errorlevel 1 goto docker_ready
    set /a TRIES+=1
    if !TRIES! lss 40 (
        echo      ...still waiting for Docker to start (!TRIES!/40)
        goto wait_docker
    )
    echo  [!] Docker daemon did not start in 2 minutes.
    echo      Open Docker Desktop manually, wait until it says "Engine running",
    echo      then re-run this script.
    pause
    exit /b 2
)
:docker_ready
echo  [ok]  Docker daemon is running.

REM ---- 3. Move to script directory --------------------------------------
cd /d "%~dp0"
echo  [ok]  Working directory: %cd%

REM ---- 4. Pull images (fast path) or build locally (fallback) -----------
echo.
echo  [..]  Pulling pre-built images from GitHub Container Registry...
docker compose pull >nul 2>&1
if errorlevel 1 (
    echo  [..]  Pull skipped/unavailable — building from source instead.
    echo        First-run build takes 5-10 minutes ^(downloads Rust + Hardhat deps^).
    echo.
    docker compose up -d --build
    if errorlevel 1 (
        echo.
        echo  [!] docker compose failed.
        echo      For diagnostics:   docker compose logs
        pause
        exit /b 3
    )
) else (
    echo  [ok]  Images pulled.
    echo.
    echo  [..]  Starting all services...
    docker compose up -d --no-build
    if errorlevel 1 (
        echo.
        echo  [!] docker compose failed.
        echo      For diagnostics:   docker compose logs
        pause
        exit /b 3
    )
)

REM ---- 5. Wait for the dashboard to be live -----------------------------
echo.
echo  [..]  Waiting for the dashboard to come online...
set /a TRIES=0
:wait_bank
timeout /t 2 /nobreak >nul
curl -sf http://localhost:3000/api/health >nul 2>&1
if not errorlevel 1 goto bank_ready
set /a TRIES+=1
if !TRIES! lss 60 goto wait_bank
echo  [!] The dashboard did not come up in 2 minutes.
echo      Check the logs with:   docker compose logs
pause
exit /b 3

:bank_ready
echo  [ok]  Dashboard is ready.
echo.
echo  =========================================================
echo    SILA PROTOCOL is running.
echo    Open in browser:   http://localhost:3000
echo  =========================================================
echo.

start "" http://localhost:3000

echo.
echo  Press any key to STOP all services and exit.
pause >nul

echo.
echo  [..]  Stopping services...
docker compose down
echo  [ok]  Stopped. You can close this window.
echo.
pause
endlocal
