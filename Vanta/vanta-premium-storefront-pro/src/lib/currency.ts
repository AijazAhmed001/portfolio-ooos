export const currencyRates={USD:1,EUR:.92,GBP:.79,AED:3.67,PKR:279}
export const currencySymbols={USD:'$',EUR:'€',GBP:'£',AED:'AED ',PKR:'PKR '}
export const formatCurrency=(value:number,currency:keyof typeof currencyRates='USD')=>`${currencySymbols[currency]}${Math.round(value*currencyRates[currency]).toLocaleString()}`
