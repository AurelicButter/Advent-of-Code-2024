import { readFileSync } from "fs"; 
const values = readFileSync("./inputs/Day4.txt", "utf8").split("\n").map(x => x.trim().split(""));

let sum = 0;

for (let y = 0; y < values.length; y++) {
    const currRow = values[y];

    for (let x = 0; x < values.length; x++) {
        if (currRow[x] != "X") {
            continue;
        }

        if (y > 2) {
            const NorthCheck = currRow[x] + values[y-1][x] + values[y-2][x] + values[y-3][x];

            if (NorthCheck == "XMAS") {
                sum++;
            }

            if (x > 2) {
                const NWCheck = currRow[x] + values[y-1][x-1] + values[y-2][x-2] + values[y-3][x-3];

                if (NWCheck == "XMAS") {
                    sum++;
                }
            }
            if (x + 3 < currRow.length) {
                const NECheck = currRow[x] + values[y-1][x+1] + values[y-2][x+2] + values[y-3][x+3];

                if (NECheck == "XMAS") {
                    sum++;
                }
            }
        }

        if (x + 3 < currRow.length) {
            const EastCheck = currRow.slice(x, x+4).join("");
            if (EastCheck == "XMAS") {
                sum++;
            }
        }

        if (x > 2) {
            const WestCheck = currRow.slice(x - 3, x+1).join("");
            if (WestCheck == "SAMX") {
                sum++;
            }
        }

        if (y + 3 < values.length) {            
            const SouthCheck = currRow[x] + values[y+1][x] + values[y+2][x] + values[y+3][x];
            if (SouthCheck == "XMAS") {
                sum++;
            }

            if (x > 2) {
                const SWCheck = currRow[x] + values[y+1][x-1] + values[y+2][x-2] + values[y+3][x-3];

                if (SWCheck == "XMAS") {
                    sum++;
                }
            }
            if (x + 3 < currRow.length) {
                const SECheck = currRow[x] + values[y+1][x+1] + values[y+2][x+2] + values[y+3][x+3];

                if (SECheck == "XMAS") {
                    sum++;
                }
            }
        }
    }
}

console.log(sum);