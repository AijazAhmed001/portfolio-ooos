const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
const execFileAsync = promisify(execFile);

async function powershell(script, fallback=[]) { if (process.platform!=='win32') return fallback; try { const {stdout}=await execFileAsync('powershell.exe',['-NoProfile','-NonInteractive','-ExecutionPolicy','Bypass','-Command',script],{windowsHide:true,maxBuffer:10*1024*1024,timeout:15000}); if(!stdout.trim()) return fallback; const data=JSON.parse(stdout); return Array.isArray(data)?data:[data]; } catch { return fallback; } }
async function installedApps(){return powershell(`$p=@('HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*','HKLM:\\Software\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*','HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*'); Get-ItemProperty $p -ErrorAction SilentlyContinue | ? DisplayName | select DisplayName,DisplayVersion,Publisher,InstallDate,EstimatedSize | sort DisplayName -Unique | ConvertTo-Json -Compress`);}
async function services(){return powershell(`Get-CimInstance Win32_Service | Select-Object Name,DisplayName,State,StartMode,PathName,ProcessId | Sort-Object DisplayName | ConvertTo-Json -Compress`);}
async function startup(){return powershell(`Get-CimInstance Win32_StartupCommand | Select-Object Name,Command,Location,User | Sort-Object Name | ConvertTo-Json -Compress`);}
module.exports={installedApps,services,startup,powershell};
