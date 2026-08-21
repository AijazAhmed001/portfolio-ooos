const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
const execFileAsync=promisify(execFile);
const specs={node:['node',['--version']],npm:[process.platform==='win32'?'npm.cmd':'npm',['--version']],git:['git',['--version']],dotnet:['dotnet',['--version']],python:[process.platform==='win32'?'python.exe':'python3',['--version']],java:['java',['-version']],adb:['adb',['version']],docker:['docker',['--version']]};
async function runSpec(name){const s=specs[name];if(!s)return{name,available:false,output:'Unsupported'};try{const{stdout,stderr}=await execFileAsync(s[0],s[1],{windowsHide:true,timeout:7000,maxBuffer:1024*1024});return{name,available:true,output:(stdout||stderr||'').trim().split(/\r?\n/)[0]};}catch(e){return{name,available:false,output:'Not found'};}}
async function runtimes(){return Promise.all(Object.keys(specs).map(runSpec));}
async function ports(){try{const cmd=process.platform==='win32'?'netstat.exe':'netstat';const args=process.platform==='win32'?['-ano']:['-an'];const{stdout}=await execFileAsync(cmd,args,{windowsHide:true,timeout:8000,maxBuffer:4*1024*1024});return stdout.split(/\r?\n/).filter(Boolean).slice(0,1800);}catch{return[];}}
function environment(){const keys=['PATH','JAVA_HOME','ANDROID_HOME','ANDROID_SDK_ROOT','NODE_PATH','GRADLE_USER_HOME','USERPROFILE','HOME'];return keys.map(key=>({key,value:process.env[key]||''}));}
module.exports={runtimes,ports,environment,runSpec};
