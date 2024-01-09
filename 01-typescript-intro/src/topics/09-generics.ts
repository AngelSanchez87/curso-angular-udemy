export function whatsMyType<T>(argument: T) : T {
    return argument
}

let amIString = whatsMyType<string>('Hola Mundo')
let amINumber = whatsMyType<number>(10)
let amIArray = whatsMyType<number[]>([1,2,3,4])

console.log(amIString.split(' '))
console.log(amINumber.toFixed())
console.log(amIArray.join('-'))
