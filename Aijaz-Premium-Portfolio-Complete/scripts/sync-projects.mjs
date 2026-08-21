import { access, readFile, readdir, watch } from "node:fs/promises";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const portfolioRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const workspaceRoot = resolve(portfolioRoot, "..");
const once = process.argv.includes("--once");

const exists = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

const run = (command, cwd) =>
  new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, {
      cwd,
      shell: true,
      stdio: "inherit",
      windowsHide: true,
    });
    child.on("error", rejectRun);
    child.on("exit", (code) =>
      code === 0 ? resolveRun() : rejectRun(new Error(`Command failed with exit code ${code}`)),
    );
  });

async function registrations() {
  const found = [];
  for (const entry of await readdir(workspaceRoot, { withFileTypes: true })) {
    if (!entry.isDirectory() || resolve(workspaceRoot, entry.name) === portfolioRoot) continue;
    const root = join(workspaceRoot, entry.name);
    const file = join(root, "portfolio.project.json");
    if (!(await exists(file))) continue;
    try {
      const config = JSON.parse(await readFile(file, "utf8"));
      if (config.enabled === false || !config.buildCommand) continue;
      found.push({ root, file, config });
    } catch (error) {
      console.warn(`[sync] ${entry.name}: invalid portfolio.project.json: ${error.message}`);
    }
  }
  return found.sort((a, b) => (a.config.order ?? 99) - (b.config.order ?? 99));
}

async function syncManifest() {
  await run("node scripts/generate-project-manifest.mjs", portfolioRoot);
}

let queue = Promise.resolve();
const pending = new Map();

function schedule(project, reason = "source changed") {
  clearTimeout(pending.get(project.config.slug));
  pending.set(
    project.config.slug,
    setTimeout(() => {
      pending.delete(project.config.slug);
      queue = queue.then(async () => {
        const cwd = resolve(project.root, project.config.projectDirectory || ".");
        console.log(`\n[sync] ${project.config.name}: ${reason}`);
        try {
          await run(project.config.buildCommand, cwd);
          await syncManifest();
          console.log(`[sync] ${project.config.name}: portfolio preview updated`);
        } catch (error) {
          console.error(`[sync] ${project.config.name}: ${error.message}`);
        }
      });
    }, 500),
  );
}

const projects = await registrations();
console.log(`[sync] registered ${projects.length} workspace projects`);

// Always create an up-to-date preview when the portfolio starts.
for (const project of projects) {
  schedule(project, "initial startup sync");
}
await new Promise((resolveWait) => setTimeout(resolveWait, 650));
await queue;

if (once) process.exit(0);

for (const project of projects) {
  const defaults = [
    join(project.config.projectDirectory || ".", "src"),
    join(project.config.projectDirectory || ".", "public"),
  ];
  const directories = project.config.watchDirectories || defaults;
  for (const relativeDirectory of directories) {
    const directory = resolve(project.root, relativeDirectory);
    if (!(await exists(directory))) continue;
    (async () => {
      try {
        const watcher = watch(directory, { recursive: true });
        for await (const event of watcher) {
          if (!event.filename) continue;
          schedule(project, `${event.eventType}: ${event.filename}`);
        }
      } catch (error) {
        console.error(`[sync] ${project.config.name}: watcher stopped: ${error.message}`);
      }
    })();
  }
}

console.log("[sync] watching project source files for changes");
await new Promise(() => {});
