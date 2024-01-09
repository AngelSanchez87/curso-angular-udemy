import { Product, taxCalculation, tax } from './06-function-destructuring'

const shoppingCart: Product[] = [
    {
        description: 'Nokia',
        price: 100
    },
    {
        description: 'iPad',
        price: 200
    }
]


const [total, totalTax ] = taxCalculation({
    tax,
    products: shoppingCart
});

console.log('Total', total)
console.log('Tax', totalTax)