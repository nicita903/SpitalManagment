@echo off
title Gestiune Spital - Server JSON
cd /d "%~dp0"
echo Pornire server pentru Gestiune Spital...
echo.
echo Dupa pornire, deschide in browser:
echo http://localhost:8080/login.html
echo.
node server.js
pause
