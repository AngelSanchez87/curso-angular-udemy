export interface Passenger {
    name: string
    children?: string []
}

const passenger1: Passenger = {
    name: 'Angel',    
}

const passenger2: Passenger = {
    name: 'Ambrosio', 
    children: ['Pepito','Paquito']   
}

const printChildren = (passenger: Passenger) => {
    const howManyChildren = passenger.children?.length || 0 // esto es igual que el ?? de c#
    console.log(passenger.name, howManyChildren)
}

printChildren(passenger2)
printChildren(passenger1)