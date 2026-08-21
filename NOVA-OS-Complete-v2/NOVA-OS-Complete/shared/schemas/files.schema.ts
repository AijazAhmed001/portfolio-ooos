export function isSafeFileName(v:string){return Boolean(v)&&!/[<>:"/\|?*]/.test(v)}
