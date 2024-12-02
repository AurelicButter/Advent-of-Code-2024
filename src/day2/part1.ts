import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day2.txt", "utf8").trim().split("\n");

let safeCount = 0;

values.forEach(value => {
    const arr = value.trim().split(" ").map(x => Number(x));

    let isDecrease;
    for (let i = 0; i < arr.length - 1; i++) {
        const diff = Math.abs(arr[i] - arr[i + 1]);

        if (diff > 3 || diff == 0) {
            return;
        }

        if (isDecrease == undefined) {
            isDecrease = arr[i] > arr[i + 1];
        } else if (arr[i] < arr[i + 1] && isDecrease) {
            return;
        }
        else if (arr[i] > arr[i + 1] && !isDecrease) {
            return;
        }
    }
    safeCount++;
});

console.log(safeCount);