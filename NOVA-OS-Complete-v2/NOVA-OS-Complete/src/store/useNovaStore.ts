import { create } from 'zustand';

export type AppId =
  | 'dashboard' | 'performance' | 'files' | 'storage' | 'duplicates' | 'processes' | 'services' | 'startup'
  | 'network' | 'apps' | 'developer' | 'terminal' | 'health' | 'notifications' | 'clipboard' | 'screenshots'
  | 'media' | 'notes' | 'tasks' | 'calendar' | 'logs' | 'privacy' | 'ai' | 'settings';

export type NovaWindow = { id: AppId; title: string; minimized: boolean; maximized: boolean; z: number; x: number; y: number; width: number; height: number };
type Theme='dark'|'light'; type Accent='blue'|'violet'|'emerald';
type NovaState={windows:NovaWindow[];activeId:AppId|null;startOpen:boolean;commandOpen:boolean;theme:Theme;accent:Accent;
  openApp:(id:AppId,title:string)=>void;closeApp:(id:AppId)=>void;focusApp:(id:AppId)=>void;minimizeApp:(id:AppId)=>void;toggleMaximize:(id:AppId)=>void;moveWindow:(id:AppId,x:number,y:number)=>void;resizeWindow:(id:AppId,w:number,h:number)=>void;setStartOpen:(v:boolean)=>void;setCommandOpen:(v:boolean)=>void;setTheme:(v:Theme)=>void;setAccent:(v:Accent)=>void};
const theme=(localStorage.getItem('nova-theme') as Theme|null)||'dark'; const accent=(localStorage.getItem('nova-accent') as Accent|null)||'blue';
export const useNovaStore=create<NovaState>((set)=>({windows:[],activeId:null,startOpen:false,commandOpen:false,theme,accent,
 openApp:(id,title)=>set(state=>{const z=Math.max(0,...state.windows.map(w=>w.z))+1;const existing=state.windows.find(w=>w.id===id);if(existing)return{windows:state.windows.map(w=>w.id===id?{...w,minimized:false,z}:w),activeId:id,startOpen:false};const offset=(state.windows.length%8)*24;return{windows:[...state.windows,{id,title,minimized:false,maximized:false,z,x:90+offset,y:62+offset,width:1180,height:730}],activeId:id,startOpen:false}}),
 closeApp:id=>set(s=>({windows:s.windows.filter(w=>w.id!==id),activeId:s.activeId===id?null:s.activeId})),focusApp:id=>set(s=>{const z=Math.max(0,...s.windows.map(w=>w.z))+1;return{windows:s.windows.map(w=>w.id===id?{...w,z,minimized:false}:w),activeId:id}}),minimizeApp:id=>set(s=>({windows:s.windows.map(w=>w.id===id?{...w,minimized:true}:w),activeId:s.activeId===id?null:s.activeId})),toggleMaximize:id=>set(s=>({windows:s.windows.map(w=>w.id===id?{...w,maximized:!w.maximized}:w)})),moveWindow:(id,x,y)=>set(s=>({windows:s.windows.map(w=>w.id===id?{...w,x,y}:w)})),resizeWindow:(id,width,height)=>set(s=>({windows:s.windows.map(w=>w.id===id?{...w,width,height}:w)})),setStartOpen:startOpen=>set({startOpen}),setCommandOpen:commandOpen=>set({commandOpen}),setTheme:theme=>{localStorage.setItem('nova-theme',theme);set({theme})},setAccent:accent=>{localStorage.setItem('nova-accent',accent);set({accent})}}));
