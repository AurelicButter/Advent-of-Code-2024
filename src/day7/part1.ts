import { readFileSync } from "fs"; 
const values = readFileSync("./inputs/Day7.txt", "utf8").split("\n");

let sum = 0;

function calculate(total: number, curr: number, nums: number[], op: string) {
    const num = nums.shift();

    if (op == "+") {
        curr += num;
    } else {
        curr *= num;
    }

    if (curr > total) { return false; }
    if (nums.length == 0) { return curr == total; }
    if (calculate(total, curr, nums.slice(0), "+")) { return true; }
    if (calculate(total, curr, nums.slice(0), "*")) { return true; }
    return false;
}

values.forEach(row => {
    const temp = row.split(":");
    if (temp.length < 2) { return; }

    const total = Number(temp[0]);
    const nums = temp[1].trim().split(" ").map(x => Number(x));
    const first = nums.shift();

    if (calculate(total, first, nums.slice(0), "+")) { return sum += total; }
    if (calculate(total, first, nums.slice(0), "*")) { return sum += total; }
});

console.log(sum);