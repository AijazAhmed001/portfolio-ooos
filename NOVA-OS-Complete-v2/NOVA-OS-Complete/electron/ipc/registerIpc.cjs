const { ipcMain, dialog, shell, clipboard, Notification } = require('electron');
const fs=require('node:fs/promises');const path=require('node:path');const os=require('node:os');const si=require('systeminformation');
const system=require('../services/system.service.cjs');const files=require('../services/files.service.cjs');const storage=require('../services/storage.service.cjs');const windows=require('../services/windows.service.cjs');const dev=require('../services/developer.service.cjs');const productivity=require('../services/productivity.service.cjs');const ai=require('../services/ai.service.cjs');const {assertPid,sanitizeText}=require('../security/validators.cjs');

const safeCommands=new Set(['whoami','hostname','node','npm','git','dotnet','python','java','adb','docker']);
function handle(channel,fn){ipcMain.handle(channel,async(e,...args)=>fn(e,...args));}
function registerIpc(){
 handle('system:overview',()=>system.overview());handle('system:performance',()=>system.performance());handle('system:health',()=>system.health());handle('battery:info',()=>si.battery());
 handle('processes:list',async()=>{const d=await si.processes();return(d.list||[]).sort((a,b)=>Number(b.cpu||0)-Number(a.cpu||0)).slice(0,900)});handle('processes:kill',(_e,pid)=>{process.kill(assertPid(pid));return true});
 handle('services:list',()=>windows.services());handle('startup:list',()=>windows.startup());handle('apps:list',()=>windows.installedApps());
 handle('storage:drives',()=>si.fsSize());handle('storage:scan',(_e,root)=>storage.scanFolder(root));handle('storage:duplicates',(_e,root)=>files.findDuplicates(root));
 handle('files:home',()=>os.homedir());handle('files:list',(_e,p)=>files.listDirectory(p));handle('files:chooseFolder',async()=>{const r=await dialog.showOpenDialog({properties:['openDirectory']});return r.canceled?null:r.filePaths[0]});
 handle('files:open',(_e,p)=>shell.openPath(path.resolve(p)));handle('files:reveal',(_e,p)=>{shell.showItemInFolder(path.resolve(p));return true});handle('files:trash',(_e,p)=>shell.trashItem(path.resolve(p)));handle('files:newFolder',(_e,parent,name)=>files.newFolder(parent,name));handle('files:rename',(_e,s,n)=>files.rename(s,n));handle('files:search',(_e,r,q)=>files.search(r,q));handle('files:preview',(_e,p)=>files.preview(p));handle('files:writeText',(_e,p,c)=>files.writeText(p,sanitizeText(c,2*1024*1024)));
 handle('network:interfaces',()=>si.networkInterfaces());handle('network:connections',()=>si.networkConnections());handle('network:stats',()=>si.networkStats());
 handle('developer:ports',()=>dev.ports());handle('developer:environment',()=>dev.environment());handle('developer:runtimes',()=>dev.runtimes());
 handle('terminal:runSafe',async(_e,cmd)=>{const name=String(cmd||'').trim().toLowerCase();if(!safeCommands.has(name))throw new Error(`Command not allowed. Available: ${[...safeCommands].join(', ')}`);const r=await dev.runSpec(name);return r.output});
 handle('clipboard:read',()=>clipboard.readText());handle('clipboard:write',(_e,t)=>{clipboard.writeText(sanitizeText(t,100000));return true});
 handle('screenshots:list',async()=>{const dirs=[path.join(os.homedir(),'Pictures','Screenshots'),path.join(os.homedir(),'Pictures')];for(const dir of dirs){try{const entries=await fs.readdir(dir,{withFileTypes:true});const out=[];for(const e of entries){if(e.isFile()&&/\.(png|jpe?g|webp)$/i.test(e.name)){const full=path.join(dir,e.name);const s=await fs.stat(full);out.push({name:e.name,path:full,modified:s.mtimeMs,size:s.size});}}if(out.length)return out.sort((a,b)=>b.modified-a.modified).slice(0,120);}catch{}}return[]});
 handle('notifications:show',(_e,title,body)=>{if(Notification.isSupported())new Notification({title:sanitizeText(title,80),body:sanitizeText(body,240)}).show();return true});
 for(const name of ['notes','tasks','calendar','permissions','alerts']){handle(`${name}:list`,()=>productivity.list(name));handle(`${name}:save`,(_e,item)=>productivity.save(name,item));handle(`${name}:remove`,(_e,id)=>productivity.remove(name,id));}
 handle('ai:ask',(_e,prompt)=>ai.ask(prompt));
}
module.exports={registerIpc};
