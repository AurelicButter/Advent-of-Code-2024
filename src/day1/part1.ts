import { readFileSync } from "fs"; 
const values = readFileSync("./inputs/Day1.txt", "utf8").trim().split("\n");

const left = [];
const right = [];

values.forEach(value => {
    const [currL, currR] = value.trim().split(" ").filter(x => x != '').map(x => Number(x));

    left.push(currL);
    right.push(currR);
});

right.sort();

console.log(left.sort().reduce((a, b, i) => a + Math.abs(b - right[i]), 0))