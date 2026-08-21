@echo off
setlocal
cd /d "%~dp0"
if not exist node_modules (
  echo Installing NOVA OS dependencies...
  call npm install
  if errorlevel 1 goto :error
)
echo Starting NOVA OS...
call npm run dev
exit /b %errorlevel%
:error
echo.
echo NOVA OS setup failed. Check Node.js, npm and your internet connection.
pause
exit /b 1
