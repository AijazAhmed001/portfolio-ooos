const { contextBridge, ipcRenderer } = require('electron');
const call=(channel,...args)=>ipcRenderer.invoke(channel,...args);
contextBridge.exposeInMainWorld('nova',{
 system:{getOverview:()=>call('system:overview'),getPerformance:()=>call('system:performance'),getHealth:()=>call('system:health')},
 battery:{info:()=>call('battery:info')},
 processes:{list:()=>call('processes:list'),kill:(pid)=>call('processes:kill',pid)},services:{list:()=>call('services:list')},startup:{list:()=>call('startup:list')},apps:{list:()=>call('apps:list')},
 storage:{drives:()=>call('storage:drives'),scan:(root)=>call('storage:scan',root),duplicates:(root)=>call('storage:duplicates',root)},
 files:{home:()=>call('files:home'),list:(p)=>call('files:list',p),chooseFolder:()=>call('files:chooseFolder'),open:(p)=>call('files:open',p),reveal:(p)=>call('files:reveal',p),trash:(p)=>call('files:trash',p),newFolder:(p,n)=>call('files:newFolder',p,n),rename:(p,n)=>call('files:rename',p,n),search:(r,q)=>call('files:search',r,q),preview:(p)=>call('files:preview',p),writeText:(p,c)=>call('files:writeText',p,c)},
 network:{interfaces:()=>call('network:interfaces'),connections:()=>call('network:connections'),stats:()=>call('network:stats')},
 developer:{ports:()=>call('developer:ports'),environment:()=>call('developer:environment'),runtimes:()=>call('developer:runtimes')},terminal:{runSafe:(c)=>call('terminal:runSafe',c)},
 clipboard:{read:()=>call('clipboard:read'),write:(t)=>call('clipboard:write',t)},screenshots:{list:()=>call('screenshots:list')},notifications:{show:(t,b)=>call('notifications:show',t,b)},
 notes:{list:()=>call('notes:list'),save:(i)=>call('notes:save',i),remove:(id)=>call('notes:remove',id)},tasks:{list:()=>call('tasks:list'),save:(i)=>call('tasks:save',i),remove:(id)=>call('tasks:remove',id)},calendar:{list:()=>call('calendar:list'),save:(i)=>call('calendar:save',i),remove:(id)=>call('calendar:remove',id)},permissions:{list:()=>call('permissions:list'),save:(i)=>call('permissions:save',i),remove:(id)=>call('permissions:remove',id)},alerts:{list:()=>call('alerts:list'),save:(i)=>call('alerts:save',i),remove:(id)=>call('alerts:remove',id)},ai:{ask:(p)=>call('ai:ask',p)}
});
