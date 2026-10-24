@echo off
title Atelier Valois Dev Server
echo ===================================================
echo   Starting Atelier Valois - Haute Couture Boutique
echo ===================================================
echo.
echo Opening browser at http://localhost:3000 ...
timeout /t 2 /nobreak > nul
start http://localhost:3000
npm run dev
