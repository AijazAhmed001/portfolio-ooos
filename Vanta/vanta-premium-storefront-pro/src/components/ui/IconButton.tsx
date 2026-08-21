import type { ButtonHTMLAttributes,ReactNode } from 'react'
export function IconButton({children,className='',...props}:ButtonHTMLAttributes<HTMLButtonElement>&{children:ReactNode}){return <button className={`icon-btn ${className}`} {...props}>{children}</button>}
