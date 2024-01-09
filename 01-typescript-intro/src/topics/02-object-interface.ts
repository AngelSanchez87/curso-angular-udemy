const skills: string[] = ['Bash', 'Counter', 'Healing'];

interface Character {
    name: string;
    hp: number;
    skills: string[],
    hometown?: string //es opcional
}

const strider: Character = {
    name: 'Strader',
    hp: 100,
    skills: ['Bash', 'Counter'],
}

strider.hometown = 'Rivendel'

console.table(strider);


export {};