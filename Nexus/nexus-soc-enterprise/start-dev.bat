@echo off
setlocal
cd /d "%~dp0"
echo.
echo =========================================
echo      NEXUS SOC - Development Server
echo =========================================
echo.
if not exist node_modules (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 goto :error
)
echo Starting Vite...
call npm run dev
goto :eof
:error
echo.
echo Setup failed. Make sure Node.js and npm are installed and internet access is available for npm install.
pause
