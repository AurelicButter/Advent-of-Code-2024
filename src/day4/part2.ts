import { readFileSync } from "fs"; 
const values = readFileSync("./inputs/Day4.txt", "utf8").split("\n").map(x => x.trim().split(""));

let sum = 0;

for (let y = 1; y < values.length - 1; y++) {
    const currRow = values[y];

    for (let x = 1; x < values.length - 1; x++) {
        if (currRow[x] != "A") {
            continue;
        }

        const NW = values[y-1][x-1];
        const NE = values[y-1][x+1];
        const SW = values[y+1][x-1];
        const SE = values[y+1][x+1];       

        const left = NW == "M" && SE == "S" || NW == "S" && SE == "M";
        const right = NE == "M" && SW == "S" || NE == "S" && SW == "M";

        if (left && left == right) {
            sum++;
        }
    }
}

console.log(sum);