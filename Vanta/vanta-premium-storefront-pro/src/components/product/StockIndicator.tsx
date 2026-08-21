export function StockIndicator({stock}:{stock:number}){return <div className={`stock ${stock<8?'low':''}`}><i/>{stock<8?`LOW STOCK — ${stock} LEFT`:'IN STOCK / READY TO SHIP'}</div>}
