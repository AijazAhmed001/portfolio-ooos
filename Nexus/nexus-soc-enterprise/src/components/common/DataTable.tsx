import type { ReactNode } from 'react'
export function DataTable({children,className=''}:{children:ReactNode;className?:string}){return <div className={`data-table ${className}`}>{children}</div>}
