export default function Progress({value}:{value:number}){return <div className='progress large'><i style={{width:`${Math.max(0,Math.min(100,value))}%`}}/></div>}
