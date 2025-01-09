import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day3.txt", "utf8").split("\n");

let sum = 0;
let enabled = true;

values.forEach(value => {
    let currMul = value.indexOf("mul");
    let currInstruct = value.indexOf("do");

    while (currMul != -1) {
        if (currMul < currInstruct) {
            value = value.substring(currMul);

            const currEnd = value.indexOf(")");
            const currBlock = value.substring(0, currEnd + 1);

            if (enabled && currBlock.match(/^mul\(\d{1,3},\d{1,3}\)/)) {
                sum += currBlock
                    .substring(4, currBlock.length - 1)
                    .split(",")
                    .map(x => Number(x))
                    .reduce((a, b) => a * b);
                value = value.substring(currEnd + 1);
            } else {
                value = value.substring(4);
            }
        } else {
            value = value.substring(currInstruct);
            const currEnd = value.indexOf(")");
            const currBlock = value.substring(0, currEnd + 1);

            if (currBlock == "don't()") {
                enabled = false;
            } else if (currBlock == "do()") {
                enabled = true;
            }

            value = value.substring(2);
        }

        currMul = value.indexOf("mul");
        currInstruct = value.indexOf("do");

        if (currInstruct == -1) {
            currInstruct = Number.MAX_VALUE;
        }
    }
});

console.log(sum);