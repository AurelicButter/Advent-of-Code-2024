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

class CheckSum extends EmptyBlock {
    sum = 0;

    constructor(block) {
        super(block.amt);
    }

    updateSum(block) {
        if (block.id == undefined) {
            this.amt += block.amt;
            return;
        }

        for (let i = 0; i < block.amt; i++) {
            this.sum += this.amt * block.id;
            this.amt++;
        }
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

disk[0] = new CheckSum(disk[0] as FileBlock); // First file always at index 0. No need to check.

let fileIndex = disk.length - 1;
let emptyIndex = 1;
while (true) {
    if (disk[fileIndex].amt == disk[emptyIndex].amt) {
        equalSpace(fileIndex, emptyIndex, disk);
    } else if (disk[fileIndex].amt < disk[emptyIndex].amt) {
        smallSpace(fileIndex, emptyIndex, disk);
    } else { // File larger than emptyIndex
        disk[fileIndex]["checked"] = true;

        for (let i = emptyIndex; i < fileIndex; i++) {
            if (disk[i].constructor.name == "FileBlock") {
                continue;
            }

            if (disk[i].amt == disk[fileIndex].amt) {
                equalSpace(fileIndex, i, disk);                
                break;
            } else if (disk[i].amt > disk[fileIndex].amt) {
                smallSpace(fileIndex, i, disk);
                break;
            }
        }
    }

    for (let i = 1; i + 1 < disk.length; i++) {
        if (i == 1 && disk[i].constructor.name == "FileBlock") {
            (disk[0] as CheckSum).updateSum(disk[i] as FileBlock);
            disk.splice(i, 1);
            i--;
            continue;
        }

        if (
            disk[i].constructor.name == "EmptyBlock" &&
            disk[i + 1].constructor.name == "EmptyBlock"
        ) {
            disk[i].amt += disk[i + 1].amt;
            disk.splice(i + 1, 1);
        }
    }

    for (emptyIndex = 1; emptyIndex < disk.length; emptyIndex++) {
        if (disk[emptyIndex].constructor.name == "EmptyBlock") { break; }
    }

    for (fileIndex = disk.length - 1; fileIndex >= 0; fileIndex--) {
        if (disk[fileIndex]["id"] && disk[fileIndex]["checked"] == false) { break; }
    }

    if (fileIndex < 0) {
        break;
    }
}

console.log(disk.reduce((a: CheckSum, b) => { a.updateSum(b); return a; }, disk.shift())["sum"]);