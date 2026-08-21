export default function TableHeader({labels}:{labels:string[]}){return <div className='table-head'>{labels.map(x=><span key={x}>{x}</span>)}</div>}
