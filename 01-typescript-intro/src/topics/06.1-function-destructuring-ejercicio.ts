interface Product {
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

function taxCalculation(options: TaxCalculationsOptions): [number, number] {
//function taxCalculation({tax, products}: TaxCalculationsOptions): [number, number] { //--> asi tambien se podría hacer, pero no es tan recomendado
    let total = 0
    const {tax, products } = options
    products.forEach( ({price}) => { //desestructuramos el item del foreach
        total += price
    })

    return [total, total * tax]
}


const shoppingCart: Product[] = [phone,tablet]
const tax = 0.15

const [ total, taxResult ] = taxCalculation({
    products: shoppingCart,
    tax // cuando el nombre de la propiedad es el mismo que la variable, no hace falta setearlo
})
console.log('Total:', total)
console.log('Tax:', taxResult)

export {};