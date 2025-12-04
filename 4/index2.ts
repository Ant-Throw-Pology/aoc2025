import fs from "node:fs/promises";

const text = await fs.readFile("input.txt", "utf-8");

const grid = text
  .trim()
  .split("\n")
  .map((row) => row.split(""));

const around = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
] as [number, number][];

let numRemoved = 0;

let coordsToRemove: [number, number][];

do {
  coordsToRemove = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y]!.length; x++) {
      if (grid[y]![x]! == "@") {
        let numAround = 0;
        for (const [dx, dy] of around) {
          const x2 = x + dx,
            y2 = y + dy;
          if (x2 < 0 || y2 < 0 || x2 >= grid[0]!.length || y2 >= grid.length)
            continue;
          if (grid[y2]![x2]! == "@") numAround++;
        }
        if (numAround < 4) {
          coordsToRemove.push([x, y]);
        }
      }
    }
  }

  for (const [x, y] of coordsToRemove) {
    grid[y]![x]! = ".";
    numRemoved++;
  }
} while (coordsToRemove.length > 0);

console.log({ numRemoved });
