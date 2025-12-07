import fs from "node:fs/promises";

const text = await fs.readFile("input.txt", "utf-8");

const grid: (number | string)[][] = text
  .trim()
  .split("\n")
  .map((line) => line.split(""));

for (const [rowN, row] of grid.entries()) {
  if (rowN === 0) continue;

  for (const [colN, ch] of row.entries()) {
    const above = grid[rowN - 1]![colN]!;
    if (ch == "." || typeof ch == "number") {
      if (above != "." && above != "^") {
        grid[rowN]![colN] = (ch == "." ? 0 : +ch) + (above == "S" ? 1 : +above);
      }
    } else if (ch == "^") {
      if (above != "." && above != "^") {
        grid[rowN]![colN - 1] =
          grid[rowN]![colN - 1] == "."
            ? above
            : +grid[rowN]![colN - 1]! + +above;
        grid[rowN]![colN + 1] = above;
      }
    }
  }
}

console.log(
  grid
    .at(-1)!
    .filter((v) => typeof v == "number")
    .reduce((acc, val) => acc + val, 0)
);
