import { Search, Sparkles } from 'lucide-react';
import { getApp } from '../lib/apps';
import { useNovaStore } from '../store/useNovaStore';

export default function Taskbar() {
  const { windows, activeId, openApp, focusApp, setStartOpen, startOpen, setCommandOpen } = useNovaStore();
  const now = new Date();
  return (
    <footer className="taskbar glass-panel">
      <div className="task-left">
        <button className={`start-button ${startOpen ? 'active' : ''}`} onClick={() => setStartOpen(!startOpen)}><Sparkles size={18} /> NOVA</button>
        <button className="task-search" onClick={() => setCommandOpen(true)}><Search size={17} /><span>Search</span><kbd>Ctrl K</kbd></button>
      </div>
      <div className="task-apps">
        {windows.map((win) => {
          const app = getApp(win.id); const Icon = app.icon;
          return <button key={win.id} className={activeId === win.id && !win.minimized ? 'active' : ''} onClick={() => focusApp(win.id)} title={app.title}><Icon size={19} /></button>;
        })}
      </div>
      <div className="task-clock"><strong>{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong><span>{now.toLocaleDateString([], { month: 'short', day: 'numeric' })}</span></div>
    </footer>
  );
}
