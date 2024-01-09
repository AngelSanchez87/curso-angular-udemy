export class Person {
    //public name: string
    //public address: string

    constructor(public name: string, public lastName: string, public address: string = 'No address') {
        //this.name = name
        //this.address = address
    }
}

export class Hero extends Person {
    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string
    ) {
        super (realName, 'Madrid')
    }
}

export class Hero2 {
    //public person: Person

    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
        public person: Person,
    ) {
        this.person = person
    }
} 
const person = new Person('Tony', 'Stark', 'Madridejos')
const ironman = new Hero2('Ironman', 45, 'Tony', person)

console.log(ironman)