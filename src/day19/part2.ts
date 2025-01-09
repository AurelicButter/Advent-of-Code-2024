import { readFileSync } from "fs"; 
const values = readFileSync("./inputs/Day19.txt", "utf-8").split("\n").map(x => x.replaceAll(/\r$/g, ""));

const cache = new Map<string, number>();

function updateCache(key, amt) {
    if (cache.has(key)) {
        cache.set(key, cache.get(key) + amt);
    } else {
        cache.set(key, amt);
    }
}

const towels = values.shift().split(", ");
values.shift();
values.pop();

function checkTowel(order: string): number {
    if (cache.has(order)) {
        return cache.get(order);
    } else if (order.length == 0) {
        return 1;
    }

    for (let i = 0; i < towels.length; i++) {
        const towel = towels[i];
        const key = order.substring(0, towel.length);

        if (key == towel) {
            updateCache(order, checkTowel(order.substring(towel.length)));
        }
    }
    return cache.get(order) || 0;
}

towels.forEach(towel => checkTowel(towel)); // Updates cache to include known patterns.

console.log(values.reduce((a, b) => (a + Number(checkTowel(b))), 0));