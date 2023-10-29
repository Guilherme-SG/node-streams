import { createReadStream, createWriteStream } from "node:fs"
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
console.log("Starting")

console.time("Time")

type User = {
    userId: string;
    username: string;
    email: string;
    avatar: string;
    cash: number;
    password: string;
    birthdate: Date;
    registeredAt: Date;
}




const outputFileName = "users.json"
const source = "users.json"


const readableStream = createReadStream(source)

const report = new Transform({
    transform: (chunk, _, done) => {
        console.log(chunk.toString())
        done(null, chunk)
    }

})

const writebleStream = createWriteStream(outputFileName)

await pipeline(
    readableStream,
    writebleStream
)


console.timeEnd("Time")