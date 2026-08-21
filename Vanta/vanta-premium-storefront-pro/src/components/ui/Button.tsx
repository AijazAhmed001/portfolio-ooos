import type { ButtonHTMLAttributes,ReactNode } from 'react'
import { cn } from '../../utils/cn'
export function Button({children,className='',variant='dark',...props}:ButtonHTMLAttributes<HTMLButtonElement>&{children:ReactNode;variant?:'dark'|'light'|'outline'|'ghost'}){return <button className={cn('btn',`btn-${variant}`,className)} {...props}>{children}</button>}
