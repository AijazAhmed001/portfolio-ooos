export function formatBytes(value = 0, decimals = 1) {
  const bytes = Number(value) || 0;
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : decimals)} ${units[index]}`;
}

export function formatRate(value = 0) {
  return `${formatBytes(value)}/s`;
}

export function formatPercent(value = 0) {
  return `${Math.max(0, Number(value) || 0).toFixed(0)}%`;
}

export function formatUptime(seconds = 0) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return [days ? `${days}d` : '', `${hours}h`, `${minutes}m`].filter(Boolean).join(' ');
}

export function formatDate(value?: number | string) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
}
