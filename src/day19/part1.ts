import { readFileSync } from "fs"; 
const values = readFileSync("./inputs/Day19.txt", "utf-8").split("\n").map(x => x.replaceAll(/\r$/g, ""));

const cache = new Map<string, boolean>();

const towels = values.shift().split(", ");
values.shift();
values.pop();

towels.forEach(towel => cache.set(towel, true)); // Updates cache to include known patterns.

function checkTowel(order: string): boolean {
    if (cache.has(order)) {
        return cache.get(order);
    }

    for (let i = 0; i < towels.length; i++) {
        const towel = towels[i];
        const key = order.substring(0, towel.length);

        if (key == towel) {
            const check = checkTowel(order.substring(towel.length));
            cache.set(order, check);
            if (check) {
                return check;
            }
        }
    }
    return false;
}

console.log(values.reduce((a, b) => a + Number(checkTowel(b)), 0));