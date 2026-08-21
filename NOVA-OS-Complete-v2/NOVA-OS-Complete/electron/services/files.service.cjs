const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const { asSafePath, safeName } = require('../security/validators.cjs');

async function listDirectory(dirPath) {
  const resolved = asSafePath(dirPath);
  const entries = await fs.readdir(resolved, { withFileTypes: true });
  const items = await Promise.all(entries.slice(0, 1500).map(async entry => {
    const fullPath = path.join(resolved, entry.name);
    try { const stat = await fs.stat(fullPath); return { name: entry.name, path: fullPath, isDirectory: entry.isDirectory(), size: stat.size, modified: stat.mtimeMs, extension: entry.isDirectory() ? '' : path.extname(entry.name).slice(1).toLowerCase() }; }
    catch { return { name: entry.name, path: fullPath, isDirectory: entry.isDirectory(), size: 0, modified: 0, extension: '' }; }
  }));
  return { path: resolved, parent: path.dirname(resolved), items };
}

async function search(rootPath, query, maxResults = 120) {
  const root = asSafePath(rootPath); const needle = String(query || '').trim().toLowerCase(); if (!needle) return [];
  const queue = [root], results = []; let visited = 0;
  while (queue.length && results.length < maxResults && visited < 18000) {
    const current = queue.shift(); let entries; try { entries = await fs.readdir(current, { withFileTypes: true }); } catch { continue; }
    for (const entry of entries) { visited++; const full = path.join(current, entry.name); if (entry.name.toLowerCase().includes(needle)) results.push({ name: entry.name, path: full, isDirectory: entry.isDirectory() }); if (entry.isDirectory() && !entry.isSymbolicLink() && visited < 18000) queue.push(full); if (results.length >= maxResults) break; }
  }
  return results;
}

async function preview(filePath) {
  const resolved = asSafePath(filePath); const stat = await fs.stat(resolved); if (stat.isDirectory()) return { type: 'directory' };
  const ext = path.extname(resolved).toLowerCase();
  const textExt = new Set(['.txt','.md','.json','.js','.jsx','.ts','.tsx','.css','.html','.xml','.yml','.yaml','.log','.csv','.env','.ini','.c','.cpp','.cs','.java','.py','.go','.rs','.sql']);
  if (textExt.has(ext) && stat.size <= 2 * 1024 * 1024) return { type: 'text', content: await fs.readFile(resolved, 'utf8'), size: stat.size, extension: ext.slice(1) };
  return { type: 'binary', size: stat.size, extension: ext.slice(1), message: 'Open with the system application to preview this file.' };
}

async function hashFile(filePath) {
  const data = await fs.readFile(filePath); return crypto.createHash('sha256').update(data).digest('hex');
}

async function findDuplicates(rootPath, maxEntries = 6000) {
  const root = asSafePath(rootPath), bySize = new Map(); const queue = [root]; let visited = 0;
  while (queue.length && visited < maxEntries) {
    const current = queue.shift(); let entries; try { entries = await fs.readdir(current, { withFileTypes: true }); } catch { continue; }
    for (const entry of entries) { if (visited++ >= maxEntries) break; const full = path.join(current, entry.name); if (entry.isSymbolicLink()) continue; if (entry.isDirectory()) queue.push(full); else if (entry.isFile()) { try { const stat = await fs.stat(full); if (stat.size > 0) { const arr = bySize.get(stat.size) || []; arr.push(full); bySize.set(stat.size, arr); } } catch {} } }
  }
  const groups = [];
  for (const [size, paths] of bySize.entries()) { if (paths.length < 2) continue; const byHash = new Map(); for (const file of paths.slice(0, 20)) { try { const hash = await hashFile(file); const arr = byHash.get(hash) || []; arr.push(file); byHash.set(hash, arr); } catch {} } for (const files of byHash.values()) if (files.length > 1) groups.push({ size, files, reclaimable: size * (files.length - 1) }); }
  return { root, scannedEntries: visited, groups: groups.sort((a,b)=>b.reclaimable-a.reclaimable).slice(0,50), reclaimable: groups.reduce((s,g)=>s+g.reclaimable,0) };
}

async function newFolder(parent, name) { const n = safeName(name); if (!n) throw new Error('Invalid folder name.'); const full = path.join(asSafePath(parent), n); await fs.mkdir(full); return full; }
async function rename(source, newName) { const n = safeName(newName); if (!n) throw new Error('Invalid name.'); const src = asSafePath(source); const target = path.join(path.dirname(src), n); await fs.rename(src, target); return target; }
async function writeText(filePath, content) { const resolved = asSafePath(filePath); await fs.writeFile(resolved, String(content ?? ''), 'utf8'); return resolved; }

module.exports = { listDirectory, search, preview, findDuplicates, newFolder, rename, writeText, home: () => os.homedir() };
