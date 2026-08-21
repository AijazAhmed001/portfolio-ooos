export const pick = <T,>(items:T[]) => items[Math.floor(Math.random()*items.length)]
export const randomBetween = (min:number,max:number) => Math.floor(Math.random()*(max-min+1))+min
