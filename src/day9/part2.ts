import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day9.txt", "utf8").trim().split("");

class EmptyBlock {
    amt: number;

    constructor(amt) {
        this.amt = Number(amt);
    }
}

class FileBlock extends EmptyBlock {
    id: number;
    checked = false;
    private static latestId = -1;

    constructor(amt) {
        super(amt);
        this.id = FileBlock.incrementId();
    }

    static incrementId() {
        return ++this.latestId;
    }

    emptyCopy() {
        return new EmptyBlock(this.amt);
    }
}

function equalSpace(fi, bi, disk) {
    disk[bi] = disk[fi];
    disk.splice(fi, 1, disk[fi].emptyCopy());

    disk[bi]["checked"] = true;
}

function smallSpace(fi, bi, disk) {
    disk[bi].amt -= disk[fi].amt;
    disk.splice(bi, 0, disk[fi]);
    disk.splice(fi + 1, 1, disk[fi + 1].emptyCopy());

    disk[bi]["checked"] = true;
}

const disk = values.map((block, i) => i % 2 == 0 ? new FileBlock(block) : new EmptyBlock(block));

disk[0]["checked"] = true; // First file always at index 0. No need to check.

let fileIndex = disk.length - 1;
let emptyIndex = 1;
while (true) {
    const rightFile = disk[fileIndex] as FileBlock;
    const currEmpty = disk[emptyIndex] as EmptyBlock;
    
    if (currEmpty == undefined) {
        break;
    }

    if (rightFile.amt == currEmpty.amt) {
        equalSpace(fileIndex, emptyIndex, disk);
    } else if (rightFile.amt < currEmpty.amt) {
        smallSpace(fileIndex, emptyIndex, disk);
    } else { // File larger than emptyIndex
        let change = false;

        for (let i = emptyIndex; i < fileIndex; i++) {
            if (disk[i].constructor.name == "FileBlock") {
                continue;
            }

            if (disk[i].amt == rightFile.amt) {
                equalSpace(fileIndex, i, disk);                
                change = true;
                break;
            } else if (disk[i].amt > rightFile.amt) {
                smallSpace(fileIndex, i, disk);
                change = true;
                break;
            }
        }

        if (!change) {
            disk[fileIndex]["checked"] = true;
        }
    }

    for (emptyIndex = 0; emptyIndex < disk.length; emptyIndex++) {
        if (disk[emptyIndex].constructor.name == "EmptyBlock") { break; }
    }

    for (fileIndex = disk.length - 1; fileIndex >= 0; fileIndex--) {
        if (disk[fileIndex]["id"] && disk[fileIndex]["checked"] == false) { break; }
    }

    for (let i = 0; i + 1 < disk.length; i++) {
        if (
            disk[i].constructor.name == "EmptyBlock" &&
            disk[i + 1].constructor.name == "EmptyBlock"
        ) {
            disk[i].amt += disk[i + 1].amt;
            disk.splice(i + 1, 1);
        }
    }

    if (fileIndex < 0) {
        break;
    }
}

const expanded = [];

disk.forEach((block: FileBlock) => {
    for (let i = 0; i < block.amt; i++) {
        expanded.push(block.id || 0);
    }
});

console.log(expanded.reduce((a, b, i) => a + b * i, 0));