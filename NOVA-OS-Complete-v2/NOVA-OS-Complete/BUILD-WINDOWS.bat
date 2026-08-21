@echo off
setlocal
cd /d "%~dp0"
if not exist node_modules (
  echo Installing NOVA OS dependencies...
  call npm install
  if errorlevel 1 goto :error
)
echo Building NOVA OS Windows installer...
call npm run dist:win
if errorlevel 1 goto :error
echo.
echo Done. Check the release folder.
pause
exit /b 0
:error
echo.
echo Build failed. Review the error above.
pause
exit /b 1
