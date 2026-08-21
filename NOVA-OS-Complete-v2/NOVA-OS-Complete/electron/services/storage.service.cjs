const fs = require('node:fs/promises');
const path = require('node:path');
const { asSafePath } = require('../security/validators.cjs');

async function scanFolder(rootPath, maxEntries = 25000) {
  const root = asSafePath(rootPath); let fileCount=0, folderCount=0, visited=0; const extensions=new Map(), largest=[], topFolders=[];
  async function walk(current, depth=0) { if (visited>=maxEntries) return 0; let entries; try { entries=await fs.readdir(current,{withFileTypes:true}); } catch { return 0; } let local=0;
    for (const entry of entries) { if (visited++>=maxEntries) break; const full=path.join(current,entry.name); if (entry.isSymbolicLink()) continue; if (entry.isDirectory()) { folderCount++; const child=await walk(full,depth+1); local+=child; if(depth===0) topFolders.push({name:entry.name,path:full,size:child}); } else if(entry.isFile()) { try { const stat=await fs.stat(full); fileCount++; local+=stat.size; const ext=path.extname(entry.name).slice(1).toLowerCase()||'other'; extensions.set(ext,(extensions.get(ext)||0)+stat.size); largest.push({name:entry.name,path:full,size:stat.size,modified:stat.mtimeMs}); if(largest.length>220){largest.sort((a,b)=>b.size-a.size);largest.length=140;} } catch{} } }
    return local; }
  const totalSize=await walk(root); largest.sort((a,b)=>b.size-a.size); topFolders.sort((a,b)=>b.size-a.size); const byType=[...extensions.entries()].map(([extension,size])=>({extension,size})).sort((a,b)=>b.size-a.size).slice(0,16);
  return {root,totalSize,fileCount,folderCount,scannedEntries:visited,capped:visited>=maxEntries,largest:largest.slice(0,50),topFolders:topFolders.slice(0,30),byType};
}
module.exports={scanFolder};
