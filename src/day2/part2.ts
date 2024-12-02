import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day2.txt", "utf8").trim().split("\n");

function isSafe(arr: number[]): boolean {
    const diff = [];

    for (let i = 0; i < arr.length - 1; i++) {
        diff.push(arr[i] - arr[i + 1]);
    }

    const increase = diff.every(x => x < 4 && x > 0);
    const decrease = diff.every(x => x > -4 && x < 0);

    return increase || decrease;
}

let safeCount = 0;

values.forEach(value => {
    const arr = value.trim().split(" ").map(x => Number(x));

    const check = isSafe(arr);

    if (check) {
        safeCount++;
    } else {
        for (let i = 0; i < arr.length; i++) {
            const check = isSafe([...arr.slice(0, i), ...arr.slice(i+1)]);

            if (check) {
                safeCount++;
                break;
            }
        }
    }
});

console.log(safeCount);