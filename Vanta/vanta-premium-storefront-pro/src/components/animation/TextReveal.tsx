import { MaskReveal } from './MaskReveal';export function TextReveal({lines}:{lines:string[]}){return <>{lines.map(x=><MaskReveal key={x}>{x}</MaskReveal>)}</>}
