import { useEffect } from 'react';
import { BatteryMedium, Bell, Search, ShieldCheck, Wifi } from 'lucide-react';
import AppRouter from './apps/AppRouter';
import CommandPalette from './components/CommandPalette';
import StartMenu from './components/StartMenu';
import Taskbar from './components/Taskbar';
import WindowFrame from './components/WindowFrame';
import { novaApps } from './lib/apps';
import { useNovaStore } from './store/useNovaStore';
export default function App(){const{windows,openApp,setCommandOpen,setStartOpen,theme,accent}=useNovaStore();
 useEffect(()=>{document.documentElement.dataset.theme=theme;document.documentElement.dataset.accent=accent},[theme,accent]);
 useEffect(()=>{if(!windows.length)openApp('dashboard','System')},[]);
 useEffect(()=>{const onKey=(event:KeyboardEvent)=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();setCommandOpen(true)}if(event.key==='Escape'){setCommandOpen(false);setStartOpen(false)}};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[setCommandOpen,setStartOpen]);
 useEffect(()=>{let active=true;const cooldown=new Map<string,number>();const check=async()=>{try{const rules=await window.nova.alerts.list();if(!rules.length)return;const p=await window.nova.system.getPerformance();const drives=await window.nova.storage.drives();const maxDisk=drives.length?Math.max(...drives.map((d:any)=>Number(d.use||0))):0;const values:Record<string,number>={cpu:Number(p.cpu||0),memory:Number(p.ramPercent||0),temperature:Number(p.temperature||0),disk:maxDisk};for(const r of rules){if(!active||!r.enabled)continue;const value=values[String(r.metric).toLowerCase()];if(!Number.isFinite(value)||value<=Number(r.threshold))continue;const last=cooldown.get(r.id)||0;if(Date.now()-last<5*60*1000)continue;cooldown.set(r.id,Date.now());await window.nova.notifications.show('NOVA system alert',`${String(r.metric).toUpperCase()} is ${value.toFixed(0)} (threshold ${r.threshold}).`)}}catch{}};const t=window.setInterval(check,15000);return()=>{active=false;window.clearInterval(t)}},[]);
 return <main className="nova-desktop" onPointerDown={event=>{if((event.target as HTMLElement).classList.contains('nova-desktop'))setStartOpen(false)}}><div className="wallpaper-orb orb-one"/><div className="wallpaper-orb orb-two"/><div className="noise"/>
 <header className="topbar"><div className="topbar-brand"><span className="nova-mark">N</span><strong>NOVA</strong><span className="secure-label"><ShieldCheck size={13}/>LOCAL SYSTEM</span></div><button className="top-search" onClick={()=>setCommandOpen(true)}><Search size={14}/>Search NOVA <kbd>Ctrl K</kbd></button><div className="top-status"><Wifi size={15}/><BatteryMedium size={16}/><button aria-label="Notifications" onClick={()=>openApp('notifications','Alerts')}><Bell size={15}/></button></div></header>
 <section className="desktop-icons">{novaApps.slice(0,10).map(({id,title,icon:Icon})=><button key={id} className="desktop-icon" onDoubleClick={()=>openApp(id,title)}><span className="desktop-icon-box"><Icon size={25}/></span><span>{title}</span></button>)}</section>
 <section className="desktop-caption"><span className="eyebrow">NOVA OS / COMMAND CENTER</span><h2>Your computer,<br/>made observable.</h2><p>Double-click an app or use <b>Ctrl K</b>.</p></section>
 {windows.map(win=><WindowFrame key={win.id} win={win}><AppRouter id={win.id}/></WindowFrame>)}<StartMenu/><CommandPalette/><Taskbar/></main>}
