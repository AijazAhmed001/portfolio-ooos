const { app, BrowserWindow, session } = require('electron');
const { createWindow } = require('./createWindow.cjs');
const { registerIpc } = require('../ipc/registerIpc.cjs');

app.whenReady().then(()=>{
  session.defaultSession.setPermissionRequestHandler((_wc,_permission,callback)=>callback(false));
  registerIpc();
  createWindow();
  app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)createWindow();});
});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit();});
process.on('uncaughtException',e=>console.error('NOVA main process error:',e));
