const os = require('node:os');
const si = require('systeminformation');

async function safe(fn, fallback = null) { try { return await fn(); } catch { return fallback; } }

async function performance() {
  const [load, mem, graphics, network, temp] = await Promise.all([
    safe(() => si.currentLoad(), {}), safe(() => si.mem(), {}), safe(() => si.graphics(), {}),
    safe(() => si.networkStats(), []), safe(() => si.cpuTemperature(), {})
  ]);
  const gpu = Array.isArray(graphics?.controllers) ? graphics.controllers[0] || {} : {};
  const nets = Array.isArray(network) ? network : [];
  const ramUsed = Number(mem?.active || mem?.used || 0);
  const ramTotal = Number(mem?.total || os.totalmem());
  return {
    timestamp: Date.now(), cpu: Number(load?.currentLoad || 0),
    ramUsed, ramTotal, ramPercent: ramTotal ? (ramUsed / ramTotal) * 100 : 0,
    gpu: Number(gpu?.utilizationGpu || 0), gpuMemoryUsed: Number(gpu?.memoryUsed || 0), gpuMemoryTotal: Number(gpu?.memoryTotal || 0),
    temperature: Number(temp?.main || 0),
    download: nets.reduce((s, n) => s + Number(n.rx_sec || 0), 0),
    upload: nets.reduce((s, n) => s + Number(n.tx_sec || 0), 0)
  };
}

async function overview() {
  const [cpu, osInfo, mem, fsSize, battery, graphics, processes, interfaces, baseboard, bios] = await Promise.all([
    safe(() => si.cpu(), {}), safe(() => si.osInfo(), {}), safe(() => si.mem(), {}), safe(() => si.fsSize(), []),
    safe(() => si.battery(), {}), safe(() => si.graphics(), {}), safe(() => si.processes(), { all: 0, running: 0, list: [] }),
    safe(() => si.networkInterfaces(), []), safe(() => si.baseboard(), {}), safe(() => si.bios(), {})
  ]);
  return { hostname: os.hostname(), platform: os.platform(), arch: os.arch(), uptime: os.uptime(), home: os.homedir(), cpu, os: osInfo, memory: mem, drives: fsSize || [], battery, graphics, processCount: processes?.all || 0, runningProcesses: processes?.running || 0, interfaces: interfaces || [], baseboard, bios };
}

async function health() {
  const [p, drives] = await Promise.all([performance(), safe(() => si.fsSize(), [])]);
  const diskUse = (drives || []).length ? Math.max(...drives.map(d => Number(d.use || 0))) : 0;
  let score = 100;
  score -= Math.max(0, p.cpu - 65) * .25;
  score -= Math.max(0, p.ramPercent - 75) * .35;
  score -= Math.max(0, diskUse - 82) * .5;
  if (p.temperature > 80) score -= Math.min(20, (p.temperature - 80) * 1.5);
  score = Math.max(45, Math.round(score));
  const status = score >= 90 ? 'Excellent' : score >= 75 ? 'Good' : score >= 60 ? 'Attention' : 'High load';
  return { score, status, metrics: { cpu: p.cpu, memory: p.ramPercent, disk: diskUse, temperature: p.temperature }, recommendations: [
    p.cpu > 85 ? 'Review high-CPU processes.' : 'CPU pressure is within a normal range.',
    p.ramPercent > 85 ? 'Close memory-heavy apps or review startup items.' : 'Memory pressure is currently acceptable.',
    diskUse > 90 ? 'Free disk space on the fullest drive.' : 'Storage headroom is acceptable.',
    p.temperature > 80 ? 'Check cooling and sustained CPU load.' : 'No thermal warning detected from available sensors.'
  ] };
}

module.exports = { performance, overview, health, safe };
