import type { ReactNode } from 'react';export function Section({children,className=''}:{children:ReactNode;className?:string}){return <section className={`section ${className}`}>{children}</section>}
