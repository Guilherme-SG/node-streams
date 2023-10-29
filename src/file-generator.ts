import { faker } from "@faker-js/faker";
import { WriteStream, createWriteStream } from "node:fs"
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


export function createRandomUser(): User {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        cash: faker.number.float(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
    };
}

const filename = "users.json"
function* generateManyUsers(ammount: number) {
    for (let i = 0; i < ammount; i++) {
        yield createRandomUser()
    }
}


// const readableStream = new Readable({
//     read() {
//         for (const user of generateManyUsers(1e5)) {
//             this.push(JSON.stringify(user) + "\n")
//         }

//         this.push(null)
//     }
// })

const ammount = 1e7
const writeStream: WriteStream = createWriteStream(filename)

for (let i = 0; i < ammount; i++) {
    const user = createRandomUser()
    writeStream.write(JSON.stringify(user) + (i + 1 < ammount ? "\n" : ""))
    console.count("Users created")
}   

console.timeEnd("Time")