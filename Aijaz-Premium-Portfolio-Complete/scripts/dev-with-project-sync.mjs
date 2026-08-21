import { spawn } from "node:child_process";

const children = [
  spawn(process.execPath, ["scripts/sync-projects.mjs"], {
    stdio: "inherit",
    windowsHide: true,
  }),
  spawn("npx", ["vite"], {
    stdio: "inherit",
    shell: true,
    windowsHide: true,
  }),
];

let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) {
    if (!child.killed) child.kill();
  }
  process.exit(code);
}

for (const child of children) {
  child.on("error", (error) => {
    console.error(error.message);
    stop(1);
  });
  child.on("exit", (code) => {
    if (!stopping && code && code !== 0) stop(code);
  });
}

process.on("SIGINT", () => stop(0));
process.on("SIGTERM", () => stop(0));
