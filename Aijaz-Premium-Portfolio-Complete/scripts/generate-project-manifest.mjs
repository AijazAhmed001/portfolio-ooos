import { access, cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { basename, dirname, extname, join, resolve } from "node:path";

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const portfolioRoot = resolve(currentDirectory, "..");
const workspaceRoot = resolve(portfolioRoot, "..");
const legacyDirectory = join(portfolioRoot, "projects-source");
const publicDirectory = join(portfolioRoot, "public");
const outputFile = join(publicDirectory, "projects-manifest.json");

const exists = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

const slugify = (value) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

async function readRegistration(file, projectDirectory, source) {
  const project = JSON.parse(await readFile(file, "utf8"));
  if (source === "legacy" && project.status !== "published") return null;
  if (project.enabled === false || project.status === "draft") return null;

  const title = project.title || project.name || basename(projectDirectory);
  const slug = project.slug || slugify(title);
  if (!slug || !title) throw new Error("A project needs a title/name and slug");

  let poster = project.poster || "/posters/project-placeholder.png";
  if (poster && !poster.startsWith("/") && !poster.startsWith("http")) {
    const posterSource = resolve(projectDirectory, poster);
    if (await exists(posterSource)) {
      const posterName = `${slug}${extname(posterSource) || ".png"}`;
      await mkdir(join(publicDirectory, "posters"), { recursive: true });
      await cp(posterSource, join(publicDirectory, "posters", posterName), { force: true });
      poster = `/posters/${posterName}`;
    } else {
      console.warn(`[projects] ${title}: poster not found: ${poster}`);
    }
  }

  let live = project.live || `/projects/${slug}/index.html`;
  const appFolder = project.buildDirectory || project.outputDirectory;
  if (appFolder) {
    const appSource = resolve(projectDirectory, appFolder);
    if (await exists(appSource)) {
      const appDestination = join(publicDirectory, "projects", slug);
      await mkdir(appDestination, { recursive: true });
      await cp(appSource, appDestination, { recursive: true, force: true });
    } else {
      console.warn(`[projects] ${title}: build directory not found: ${appFolder}`);
    }
  }

  return {
    slug,
    index: project.index || "00",
    title,
    eyebrow: project.eyebrow || project.category || "Digital product",
    summary: project.summary || project.description || "Explore this project and its complete experience.",
    stack: Array.isArray(project.stack) ? project.stack : ["Web"],
    tone: project.tone || "blue",
    metric: project.metric || "NEW",
    metricLabel: project.metricLabel || "featured project",
    github: project.github || "",
    live,
    poster,
    year: String(project.year || new Date().getFullYear()),
    order: Number(project.order ?? 99),
    status: "published",
    source,
  };
}

const registrations = [];

// Preferred workflow: place portfolio.project.json in any sibling project folder.
for (const entry of await readdir(workspaceRoot, { withFileTypes: true })) {
  if (!entry.isDirectory() || resolve(workspaceRoot, entry.name) === portfolioRoot) continue;
  const directory = join(workspaceRoot, entry.name);
  const file = join(directory, "portfolio.project.json");
  if (await exists(file)) registrations.push({ file, directory, source: "workspace" });
}

// Keep the portfolio's existing projects-source records working.
if (await exists(legacyDirectory)) {
  for (const entry of await readdir(legacyDirectory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const directory = join(legacyDirectory, entry.name);
    const file = join(directory, "project.json");
    if (await exists(file)) registrations.push({ file, directory, source: "legacy" });
  }
}

const bySlug = new Map();
for (const registration of registrations) {
  try {
    const project = await readRegistration(registration.file, registration.directory, registration.source);
    if (!project) continue;
    if (!bySlug.has(project.slug) || registration.source === "workspace") {
      bySlug.set(project.slug, project);
    }
  } catch (error) {
    console.warn(`[projects] ${registration.directory}: ${error.message}`);
  }
}

const projects = [...bySlug.values()]
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
  .map((project, position) => ({
    ...project,
    index: project.index === "00" ? String(position + 1).padStart(2, "0") : project.index,
  }));

await mkdir(publicDirectory, { recursive: true });
await writeFile(outputFile, JSON.stringify(projects, null, 2), "utf8");
console.log(`[projects] generated ${projects.length} entries (${registrations.length} registrations scanned)`);
