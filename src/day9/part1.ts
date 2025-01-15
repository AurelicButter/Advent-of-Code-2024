import { readFileSync } from "fs"; 
const values = readFileSync("./inputs/Day9.txt", "utf8").trim().split("");

class EmptyBlock {
    amt: number;

    constructor(amt) {
        this.amt = amt;
    }
}

class FileBlock extends EmptyBlock {
    id: number;
    private static latestId = -1;

    constructor(amt) {
        super(amt);
        this.id = FileBlock.incrementId();
    }

    static incrementId() {
        return ++this.latestId;
    }
}

const disk = values.map((block, i) => i % 2 == 0 ? new FileBlock(block) : new EmptyBlock(block));

let leftEmpty = 1;
while (true) {
    const rightFile = disk[disk.length - 1] as FileBlock;
    const currEmpty = disk[leftEmpty] as EmptyBlock;

    if (currEmpty == undefined) {
        break;
    }

    if (rightFile.amt == currEmpty.amt) {
        disk[leftEmpty] = disk.pop(); // Replaces empty block with FileBlock
        disk.pop(); // Remove empty block
    } else if (rightFile.amt < currEmpty.amt) {
        disk.splice(leftEmpty, 0, disk.pop());
        leftEmpty++;
        disk[leftEmpty].amt -= rightFile.amt;
        disk.pop(); // Remove empty block
    } else { // Is more than currEmpty
        const newBlock = new FileBlock(currEmpty.amt);
        newBlock.id = rightFile.id;
        rightFile.amt -= newBlock.amt;

        disk.splice(leftEmpty, 1, newBlock);
    }

    for (let i = leftEmpty; i < disk.length; i++) {
        if (disk[i].constructor.name == "EmptyBlock") {
            leftEmpty = i;
            break;
        }
    }
}

const expanded = [];

disk.forEach((block: FileBlock) => {
    for (let i = 0; i < block.amt; i++) {
        expanded.push(block.id);
    }
});

console.log(expanded.reduce((a, b, i) => a + b * i, 0));