import { Search, Power } from 'lucide-react';
import { novaApps } from '../lib/apps';
import { useNovaStore } from '../store/useNovaStore';

export default function StartMenu() {
  const { startOpen, openApp, setCommandOpen } = useNovaStore();
  if (!startOpen) return null;
  return (
    <aside className="start-menu glass-panel">
      <button className="start-search" onClick={() => setCommandOpen(true)}><Search size={17} /> Search apps, files and commands <kbd>Ctrl K</kbd></button>
      <div className="start-label">Pinned</div>
      <div className="start-grid">
        {novaApps.map(({ id, title, icon: Icon }) => (
          <button key={id} onClick={() => openApp(id, title)}><span><Icon size={22} /></span><small>{title}</small></button>
        ))}
      </div>
      <div className="start-footer"><div><strong>NOVA</strong><small>Local PC Command Center</small></div><button title="Power actions are intentionally not exposed"><Power size={18} /></button></div>
    </aside>
  );
}
