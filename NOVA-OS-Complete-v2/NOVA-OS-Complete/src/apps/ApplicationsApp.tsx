import { useEffect, useMemo, useState } from 'react';
import { AppWindow, Search } from 'lucide-react';
import { formatBytes } from '../lib/format';
export default function ApplicationsApp(){
 const [items,setItems]=useState<any[]>([]); const [query,setQuery]=useState(''); const [loading,setLoading]=useState(true);
 useEffect(()=>{window.nova.apps.list().then(setItems).finally(()=>setLoading(false));},[]);
 const visible=useMemo(()=>items.filter(a=>`${a.DisplayName} ${a.Publisher||''}`.toLowerCase().includes(query.toLowerCase())),[items,query]);
 return <div className="app-shell data-app"><div className="page-head compact"><div><span className="eyebrow">APPLICATIONS</span><h1>Installed software</h1><p>{loading?'Reading Windows application registry…':`${items.length} applications found`}</p></div></div><div className="toolbar"><label className="search-box"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search applications or publisher"/></label></div><div className="app-grid">{visible.map((a,i)=><section className="surface installed-app" key={`${a.DisplayName}-${i}`}><span className="app-glyph"><AppWindow size={20}/></span><div><strong>{a.DisplayName}</strong><small>{a.Publisher||'Unknown publisher'}</small></div><div className="installed-meta"><span>v{a.DisplayVersion||'—'}</span><span>{a.EstimatedSize?formatBytes(Number(a.EstimatedSize)*1024):'Size unavailable'}</span></div></section>)}</div>{!loading&&!items.length&&<div className="surface empty-state padded">Installed-app discovery is implemented for Windows. On another OS this view returns an empty list.</div>}</div>;
}
