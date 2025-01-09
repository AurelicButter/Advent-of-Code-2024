import { readFileSync } from "fs"; 
const values = readFileSync("./inputs/Day11.txt", "utf8").trim().split(" ").map(x => Number(x));

let rounds = 25;

while (rounds > 0) {
    for (let i = 0; i < values.length; i++) {
        const stone = values[i];

        if (stone == 0) {
            values[i] = 1;
        } else if (stone.toString().length % 2 == 0) {
            let temp = stone.toString();

            values.splice(i, 1, Number(temp.substring(temp.length / 2)));
            values.splice(i, 0, Number(temp.substring(0, temp.length / 2)));
            i++;
        } else {
            values[i] = stone * 2024;
        }
    }
    rounds--;
}

console.log(values.length);