export const formatNumber = (n:number) => new Intl.NumberFormat('en-US').format(n)
export const compactNumber = (n:number) => new Intl.NumberFormat('en-US',{notation:'compact',maximumFractionDigits:1}).format(n)
export const formatTime = () => new Date().toLocaleTimeString('en-GB',{hour12:false})
