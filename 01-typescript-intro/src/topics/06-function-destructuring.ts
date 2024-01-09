export interface Product {
    description: string,
    price: number
}

const phone: Product = {
    description: "Nokia A1",
    price: 150.0
}

const tablet: Product = {
    description: "iPad Air",
    price: 250.0
}

interface TaxCalculationsOptions {
    tax: number,
    products: Product[]
}

export function taxCalculation(options: TaxCalculationsOptions): number[] {
    let total = 0
    options.products.forEach( product => {
        total += product.price
    })

    return [total, total * options.tax]
}


const shoppingCart: Product[] = [phone,tablet]
export const tax = 0.15

const result = taxCalculation({
    products: shoppingCart,
    tax // cuando el nombre de la propiedad es el mismo que la variable, no hace falta setearlo
})

//console.log('Total: ', result[0])
//console.log('Tax: ', result[1])