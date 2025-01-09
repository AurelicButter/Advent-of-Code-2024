import { readFileSync } from "fs"; 
const values = readFileSync("./inputs/Day11.txt", "utf8").trim().split(" ").map(x => Number(x));

let map = new Map<number, number>();

values.forEach(key => {
    if (map.has(key)) {
        map.set(key, map.get(key) + 1);
    } else {
        map.set(key, 1);
    }
});

let rounds = 75;

while (rounds > 0) {
    const newMap = new Map<number, number>();
    const keys = Array.from(map.keys());

    function updateMap(key, old) {
        if (newMap.has(key)) {
            newMap.set(key, newMap.get(key) + map.get(old));
        } else {
            newMap.set(key, map.get(old));
        }
    }

    keys.forEach(key => {
        if (key == 0) {
            updateMap(1, key);
        } else if (key.toString().length % 2 == 0) {
            const tempKey = key.toString();
            const lKey = Number(tempKey.substring(0, tempKey.length / 2));
            const rKey = Number(tempKey.substring(tempKey.length / 2));

            updateMap(lKey, key);
            updateMap(rKey, key);
        } else {
            updateMap(key * 2024, key);
        }
    });
    map = newMap;
    rounds--;
}

console.log(Array.from(map.values()).reduce((a, b) => a + b));