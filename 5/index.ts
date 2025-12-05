import fs from "node:fs/promises";

const text = await fs.readFile("input.txt", "utf-8");

const [freshRangesText, available] = text.split("\n\n") as [string, string];

const freshRanges = freshRangesText
  .split("\n")
  .map((line) => line.split("-").map((x) => Number(x)) as [number, number]);

let numFresh = 0;

for (const id of available.split("\n").map((x) => Number(x))) {
  let fresh = false;
  for (const [start, end] of freshRanges) {
    if (start <= id && id <= end) {
      fresh = true;
      break;
    }
  }
  if (fresh) numFresh++;
}

console.log({ numFresh });
