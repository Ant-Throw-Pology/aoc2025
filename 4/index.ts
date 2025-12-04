import fs from "node:fs/promises";

const text = await fs.readFile("input.txt", "utf-8");

const grid = text.trim().split("\n");

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

let numAccessible = 0;

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
        numAccessible++;
      }
    }
  }
}

console.log({ numAccessible });
