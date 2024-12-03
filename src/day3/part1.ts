import { readFileSync } from "fs"; 
const values = readFileSync("./inputs/Day3.txt", "utf8").split("\n");

let sum = 0;

values.forEach(value => {    
    let currIndex = value.indexOf("mul(");
    value = value.substring(currIndex);

    while (currIndex != -1) {
        const currEnd = value.indexOf(")");
        let currBlock = value.substring(0, currEnd + 1);

        if (currBlock.match(/^mul\(\d{1,3},\d{1,3}\)/)) {
            const numbers = currBlock.substring(4, currBlock.length - 1).split(",").map(x => Number(x));
            sum += numbers[0] * numbers[1];
            value = value.substring(currEnd + 1);
        } else {
            value = value.substring(4);
        }

        currIndex = value.indexOf("mul(");
        value = value.substring(currIndex);
    }    
});

console.log(sum);