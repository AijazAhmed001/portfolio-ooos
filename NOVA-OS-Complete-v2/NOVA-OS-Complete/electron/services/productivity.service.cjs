const fs=require('node:fs/promises');const path=require('node:path');const {app}=require('electron');
function file(name){return path.join(app.getPath('userData'),`nova-${name}.json`)}
async function read(name,fallback){try{return JSON.parse(await fs.readFile(file(name),'utf8'));}catch{return fallback;}}
async function write(name,value){await fs.mkdir(app.getPath('userData'),{recursive:true});await fs.writeFile(file(name),JSON.stringify(value,null,2),'utf8');return value;}
async function list(name){return read(name,[])}
async function save(name,item){const items=await list(name);const now=Date.now();const next={...item,id:item.id||`${name}-${now}-${Math.random().toString(36).slice(2,7)}`,updatedAt:now};const idx=items.findIndex(x=>x.id===next.id);if(idx>=0)items[idx]=next;else items.unshift(next);await write(name,items);return next;}
async function remove(name,id){const items=(await list(name)).filter(x=>x.id!==id);await write(name,items);return true;}
module.exports={read,write,list,save,remove};
