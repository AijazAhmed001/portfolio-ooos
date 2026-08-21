import { NavLink } from 'react-router-dom';import { navigation } from '../../data/navigation'
export function DesktopNavigation({onCollectionsEnter}:{onCollectionsEnter?:()=>void}){return <nav className="desktop-nav">{navigation.map(x=><NavLink key={x.label} to={x.to} onMouseEnter={x.label==='Collections'?onCollectionsEnter:undefined}>{x.label}</NavLink>)}</nav>}
