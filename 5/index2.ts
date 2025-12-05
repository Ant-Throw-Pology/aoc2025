import fs from "node:fs/promises";

const text = await fs.readFile("input.txt", "utf-8");

const [freshRangesText] = text.split("\n\n") as [string, string];

const freshRanges = freshRangesText
  .split("\n")
  .map((line) => line.split("-").map((x) => Number(x)) as [number, number]);

let didAnything = false;
do {
  didAnything = false;
  outer: for (let i = 0; i < freshRanges.length; i++) {
    const [aStart, aEnd] = freshRanges[i]!;
    for (let j = i + 1; j < freshRanges.length; j++) {
      const [bStart, bEnd] = freshRanges[j]!;
      if (aEnd >= bStart && bEnd >= aStart) {
        freshRanges.splice(i, 1);
        freshRanges.splice(j - +(i < j), 1);
        freshRanges.unshift([Math.min(aStart, bStart), Math.max(aEnd, bEnd)]);

        didAnything = true;
        break outer;
      }
    }
  }
} while (didAnything);

let numFresh = 0;

for (const [start, end] of freshRanges) {
  numFresh += end - start + 1;
}

console.log({ numFresh });
