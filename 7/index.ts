import fs from "node:fs/promises";

const text = await fs.readFile("input.txt", "utf-8");

const grid = text
  .trim()
  .split("\n")
  .map((line) => line.split(""));

let numSplits = 0;

for (const [rowN, row] of grid.entries()) {
  if (rowN === 0) continue;

  for (const [colN, ch] of row.entries()) {
    const above = grid[rowN - 1]![colN]!;
    if (ch == ".") {
      if (above == "|" || above == "S") {
        grid[rowN]![colN] = "|";
      }
    } else if (ch == "^") {
      if (above == "|" || above == "S") {
        grid[rowN]![colN - 1] = "|";
        grid[rowN]![colN + 1] = "|";
        numSplits++;
      }
    }
  }
}

console.log(grid.map((row) => row.join("")).join("\n"));

console.log({ numSplits });
