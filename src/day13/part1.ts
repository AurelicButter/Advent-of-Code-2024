import { readFileSync } from "fs";
const values = readFileSync("./inputs/day13.txt", "utf-8").split("\n");

class Coord {
    x = 0;
    y = 0;

    parseLoc(input: string) {
        this.x = Number(input.split(",")[0].split("=")[1])
        this.y = Number(input.split(",")[1].split("=")[1])
        return this
    }

    parseButton(input: string) {
        this.x = Number(input.split(",")[0].split("+")[1])
        this.y = Number(input.split(",")[1].split("+")[1])
        return this
    }
}

let fewestTokens = 0;

for (let x = 0; x < values.length; x = x + 4) {
    const buttonA = new Coord().parseButton(values[x]);
    const buttonB = new Coord().parseButton(values[x + 1]);
    const prize = new Coord().parseLoc(values[x + 2]);

    const buttonDet = buttonA.x * buttonB.y - buttonA.y * buttonB.x;

    if (buttonDet == 0) {
        continue;
    }

    const ADet = prize.x * buttonB.y - prize.y * buttonB.x;
    const BDet = prize.y * buttonA.x - prize.x * buttonA.y;

    const aTokens = ADet / buttonDet;
    const bTokens = BDet / buttonDet;

    if (!Number.isInteger(aTokens) || !Number.isInteger(bTokens)) {
        continue;
    }

    prize.x -= buttonA.x * aTokens + buttonB.x * bTokens;
    prize.y -= buttonA.y * aTokens + buttonB.y * bTokens;

    if (prize.x == 0 && prize.y == 0) {
        fewestTokens += aTokens * 3 + bTokens;
    }
}

console.log(fewestTokens)