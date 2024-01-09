interface AudioPlayer {
    audioVolume: number,
    songDuration: number,
    song: string,
    details: Details,
}

interface Details {
    author: string,
    year: number
}

const audioPlayer: AudioPlayer = {
    audioVolume: 90,
    songDuration: 36,
    song: "Mess",
    details: {
        author: "Ed Sheeran",
        year: 2015
    }
}
console.log(`Song: ${audioPlayer.song}`)
console.log(`Song: ${audioPlayer.details.author}`)

// aqui destructuramos
const {
     song: anothersong, 
     songDuration,
     //details: { author } //-->tambien se podría hacer asi
     details
    }
     = audioPlayer;
const { author } = details;
console.log(`Song destructurado: ${anothersong}`)
console.log(`Duracion destructurado: ${songDuration}`)
console.log(`Autor destructurado: ${author}`)


// Desestructuracion de arreglos, ejemplo
const dbz: string[] = ['Goku', 'Vegeta', 'Trunk']
console.log(`Personaje 3: `, dbz[2])

const [, , trunks = 'Not found'] :string[] = ['Goku', 'Vegeta']
console.error('Personaje 3:', trunks)


export {};