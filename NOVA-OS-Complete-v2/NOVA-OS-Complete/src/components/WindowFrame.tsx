import { useEffect, useRef } from 'react';
import { Maximize2, Minus, X } from 'lucide-react';
import { useNovaStore, type NovaWindow } from '../store/useNovaStore';

export default function WindowFrame({ win, children }: { win: NovaWindow; children: React.ReactNode }) {
  const { closeApp, focusApp, minimizeApp, toggleMaximize, moveWindow, resizeWindow } = useNovaStore();
  const drag = useRef<{ sx: number; sy: number; x: number; y: number } | null>(null);
  const resize = useRef<{ sx: number; sy: number; w: number; h: number } | null>(null);
  const frame = useRef<HTMLElement>(null);
  const pending = useRef<{ x?: number; y?: number; width?: number; height?: number }>({});

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (drag.current && !win.maximized) {
        const x = Math.max(0, drag.current.x + event.clientX - drag.current.sx); const y = Math.max(34, drag.current.y + event.clientY - drag.current.sy);
        pending.current = { x, y }; if (frame.current) { frame.current.style.left = `${x}px`; frame.current.style.top = `${y}px`; }
      }
      if (resize.current && !win.maximized) {
        const width = Math.max(760, resize.current.w + event.clientX - resize.current.sx); const height = Math.max(500, resize.current.h + event.clientY - resize.current.sy);
        pending.current = { width, height }; if (frame.current) { frame.current.style.width = `${width}px`; frame.current.style.height = `${height}px`; }
      }
    };
    const onUp = () => { const next = pending.current; if (next.x !== undefined && next.y !== undefined) moveWindow(win.id, next.x, next.y); if (next.width !== undefined && next.height !== undefined) resizeWindow(win.id, next.width, next.height); pending.current = {}; drag.current = null; resize.current = null; };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); };
  }, [moveWindow, resizeWindow, win.id, win.maximized]);

  if (win.minimized) return null;

  const style = win.maximized
    ? { inset: '34px 0 58px 0', zIndex: win.z }
    : { left: win.x, top: win.y, width: `min(${win.width}px, calc(100vw - ${win.x + 12}px))`, height: `min(${win.height}px, calc(100vh - ${win.y + 70}px))`, zIndex: win.z };

  return (
    <section ref={frame} className={`nova-window ${win.maximized ? 'maximized' : ''}`} style={style} onPointerDown={() => focusApp(win.id)}>
      <header className="window-titlebar" onDoubleClick={() => toggleMaximize(win.id)} onPointerDown={(event) => {
        if ((event.target as HTMLElement).closest('button')) return;
        focusApp(win.id);
        drag.current = { sx: event.clientX, sy: event.clientY, x: win.x, y: win.y };
      }}>
        <div className="window-title"><span className="nova-dot" />{win.title}</div>
        <div className="window-controls">
          <button onClick={() => minimizeApp(win.id)} aria-label="Minimize"><Minus size={15} /></button>
          <button onClick={() => toggleMaximize(win.id)} aria-label="Maximize"><Maximize2 size={14} /></button>
          <button className="close" onClick={() => closeApp(win.id)} aria-label="Close"><X size={15} /></button>
        </div>
      </header>
      <div className="window-content">{children}</div>
      {!win.maximized && <div className="resize-handle" onPointerDown={(event) => { resize.current = { sx: event.clientX, sy: event.clientY, w: win.width, h: win.height }; }} />}
    </section>
  );
}
