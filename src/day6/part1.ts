import { readFileSync } from "fs"; 
const values = readFileSync("./inputs/Day6.txt", "utf8").split("\n");

let y = 0;
let x = 0;

const grid = values.map((value, i) => {
    const guard = value.indexOf("^");

    if (guard != -1) {
        y = i;
        x = guard;
        value = value.replace("^", "x");
    }
    return value.split("");
});

let spotForward = grid[y - 1][x];
let distinct = 1;
let direction = 0;

while (spotForward != undefined) {
    let dirChange = false;
    if (spotForward == "#") {
        direction++;
        direction %= 4;
        dirChange = true;
    }
    
    if (grid[y][x] != "x") {
        distinct++;
        grid[y][x] = "x";
    }

    switch (direction) {
        case 0:
            if (!dirChange) y--;
            try {
                spotForward = grid[y-1][x];
            } catch {
                spotForward = undefined;
            }
            break;
        case 1:
            if (!dirChange) x++;
            try {
                spotForward = grid[y][x+1];
            } catch {
                spotForward = undefined;
            }
            break;
        case 2:
            if (!dirChange) y++;
            try {
                spotForward = grid[y+1][x];
            } catch {
                spotForward = undefined;
            }
            break;
        case 3:
            if (!dirChange) x--;
            try {
                spotForward = grid[y][x-1];
            } catch {
                spotForward = undefined;
            }
            break;
    }
}

console.log(distinct+1);