import { readFileSync } from "fs"; 
const values = readFileSync("./inputs/Day1.txt", "utf8").trim().split("\n");

const left = [];
const right = [];

values.forEach(value => {
    const [currL, currR] = value.trim().split(" ").filter(x => x != '').map(x => Number(x));

    left.push(currL);
    right.push(currR);
});

left.sort();
right.sort();

let sum = 0;

left.forEach((x, i) => {
    sum += Math.abs(x * right[i]);
});

console.log(sum);