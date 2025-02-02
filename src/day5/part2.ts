import { readFileSync } from "fs"; 
const values = readFileSync("./inputs/Day5.txt", "utf8").split("\n\n");

const dict = new Map<string, string[]>();
let sum = 0;

values[0].split("\n").forEach(value => {
    const [k,v] = value.split("|");

    if (dict.has(k)) {
        dict.get(k).push(v);
    } else {
        dict.set(k, [v]);
    }
});

values[1].split("\n").forEach(value => {
    const rules = value.split(",");

    let isCorrected = false;

    for (let i = 1; i < rules.length; i++) {
        const inst = dict.get(rules[i]);
        if (inst == undefined) {
            continue;
        }

        for (let x = i - 1; x > -1; x--) {
            if (inst.includes(rules[x])) {
                isCorrected = true;

                rules.splice(i+1, 0, rules[x]);
                rules.splice(x, 1);

                i -= 2;
                break;
            }
        }
    }

    if (isCorrected) {
        sum += Number(rules[Math.floor(rules.length / 2)]);
    }
});

console.log(sum);