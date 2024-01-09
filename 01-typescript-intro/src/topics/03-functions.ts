function addNumbers(a: number, b: number) {
    return a + b
}

//funcion de flecha
const addNumbersArrow = (a: number, b: number): string => {
    return `${a + b}`
}

function multyply(firstNumber: number, secondNumber?: number, base: number = 2) {
    return firstNumber * base
}

const result: string = addNumbers(1,2).toString()
console.log(result)
console.log({result}) //asi imprimes objetos
const result2: string = addNumbersArrow(1,4)
console.log(result2)
const multiplyResult: number = multyply(5);
console.log(multiplyResult)
console.log({result, result2, multiplyResult})

interface Character {
    name: string,
    hp: number,
    showHp: () => void //definir funciones en interface
}

const healCharacter = ( character: Character, amount: number ) => {
     character.hp += amount;
} 

const strider: Character = {
    name: 'Strider',
    hp: 50,
    showHp() {
        console.log(`Puntos de vida ${this.hp}`)
    }
}
strider.showHp()
healCharacter(strider, 20)
strider.showHp()

export {};