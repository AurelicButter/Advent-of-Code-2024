import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day6.txt", "utf8").split("\n");

let y = 0;
let x = 0;
const guardCoords = {
    x: 0,
    y: 0,
    dir: 0
}

const grid = values.map((value, i) => {
    const guard = value.indexOf("^");

    if (guard != -1) {
        guardCoords.x = guard;
        guardCoords.y = i;
        y = i;
        x = guard;
    }
    return value.split("");
});

let spotForward = grid[y - 1][x];
let direction = 0;
let orignalPath = new Set<string>();

while (spotForward != undefined) {
    let dirChange = false;

    if (spotForward == "#") {
        direction++;
        direction %= 4;
        dirChange = true;
    }

    orignalPath.add(`${y},${x}`);

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

function traversePath(coord: {x: number, y: number}, guard: { x: number, y: number, dir: number}): number {
    const currGrid = structuredClone(grid);
    currGrid[coord.y][coord.x] = "#";
    let spotForward = currGrid[guard.y - 1][guard.x];
    const visited = new Set<string>();

    while (spotForward != undefined) {
        let dirChange = false;

        if (spotForward == "#") {
            guard.dir++;
            guard.dir %= 4;
            dirChange = true;

            const key = `${guard.x},${guard.y},${guard.dir}`;
            if (visited.has(key)) {               
                return 1;
            } else {
                visited.add(key);
            }
        }

        switch (guard.dir) {
            case 0:
                if (!dirChange) guard.y--;
                try {
                    spotForward = currGrid[guard.y - 1][guard.x];
                } catch {
                    spotForward = undefined;
                }
                break;
            case 1:
                if (!dirChange) guard.x++;
                try {
                    spotForward = currGrid[guard.y][guard.x + 1];
                } catch {
                    spotForward = undefined;
                }
                break;
            case 2:
                if (!dirChange) guard.y++;
                try {
                    spotForward = currGrid[guard.y + 1][guard.x];
                } catch {
                    spotForward = undefined;
                }
                break;
            case 3:
                if (!dirChange) guard.x--;
                try {
                    spotForward = currGrid[guard.y][guard.x - 1];
                } catch {
                    spotForward = undefined;
                }
                break;
        }
    }

    return 0;
}

let options = 0;
orignalPath.add(`${y},${x}`);
orignalPath.delete(`${guardCoords.y},${guardCoords.x}`);

orignalPath.forEach(coord => {
    const [y, x] = coord.split(',');
    options += traversePath({x: Number(x), y:Number(y)}, structuredClone(guardCoords));
})

console.log(options);
