# Security model

- `contextIsolation: true`
- `nodeIntegration: false`
- `sandbox: true`
- renderer receives no `fs`, `child_process`, `require` or generic `exec` primitive
- terminal commands are allowlisted
- low/system PIDs and NOVA's own process are blocked from termination
- file deletion uses the operating-system Trash/Recycle Bin
- remote permission requests are denied by default
- local heuristic AI reads only current telemetry in this build

NOVA is a powerful local desktop app. Any future privileged feature should be added as a narrow IPC method with argument validation rather than exposing a general-purpose shell or filesystem object.
