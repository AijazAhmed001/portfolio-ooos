# NOVA OS Architecture

NOVA is split into three trust zones: the React renderer, the sandboxed preload bridge, and the privileged Electron main process. The renderer can request only named operations exposed by `window.nova`. Native filesystem, process, registry, clipboard and system-information work happens in the main process.

## Data flow

`React UI -> preload bridge -> ipcMain handlers -> services -> local operating system`

Heavy directory scans are bounded. The storage and duplicate-finder services cap traversal so an accidental root-drive scan does not grow without limit. A future production release can move these scans to Electron utility processes without changing the renderer contract.
