# NOVA OS Complete

NOVA OS is an advanced **local PC command center** built with Electron, React 19 and TypeScript. It combines a desktop/window environment with system monitoring, file/storage tools, process visibility, Windows inventory, developer diagnostics, local productivity tools and a privacy-aware system assistant.

## Main applications

System Dashboard, Performance, Files, Storage Analyzer, Duplicate Finder, Processes, Services, Startup, Applications, Network, Developer Center, Safe Terminal, Health, Alerts, Clipboard, Screenshots, Media workspace, Notes, Tasks, Calendar, Logs, Privacy Center, NOVA AI and Settings.

## Real local capabilities

NOVA reads current CPU/RAM/GPU/network telemetry using `systeminformation`, enumerates local drives and files, performs bounded storage scans, verifies duplicate files with SHA-256, reads Windows installed-app/service/startup inventories where supported, inspects processes and ports, exposes selected development runtime checks, reads/writes the text clipboard on user action, lists common screenshot folders, and persists NOVA notes/tasks/events/settings inside Electron user data.

## Safety boundary

The renderer is sandboxed and has no raw Node.js access. Privileged operations are implemented behind narrow preload/IPC APIs. The terminal is deliberately allowlisted, file deletion goes to Trash/Recycle Bin, and process termination blocks low protected PIDs and NOVA itself.

## Run

```bash
npm install
npm run dev
```

On Windows you can also run `START-NOVA.bat`.

## Validate

```bash
npm run check
npm run lint:structure
npm run test:smoke
```

## Build Windows installer

```bash
npm run dist:win
```

or use `BUILD-WINDOWS.bat`.

## Notes

Hardware telemetry varies by device, driver and operating system. NOVA shows unavailable readings as unsupported rather than inventing values. Windows registry/service/startup discovery is intentionally Windows-specific.
