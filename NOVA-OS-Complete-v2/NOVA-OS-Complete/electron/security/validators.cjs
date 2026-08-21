const path = require('node:path');
const os = require('node:os');

function asSafePath(input, fallback = os.homedir()) {
  const value = typeof input === 'string' && input.trim() ? input : fallback;
  return path.resolve(value);
}

function safeName(input) {
  return String(input || '').replace(/[<>:"/\\|?*\x00-\x1F]/g, '').trim().slice(0, 180);
}

function assertPid(pid) {
  const value = Number(pid);
  if (!Number.isInteger(value) || value <= 4 || value === process.pid) throw new Error('Protected or invalid process.');
  return value;
}

function sanitizeText(input, max = 20000) {
  return String(input ?? '').slice(0, max);
}

module.exports = { asSafePath, safeName, assertPid, sanitizeText };
