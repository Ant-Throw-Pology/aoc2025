import fs from "node:fs/promises";

const text = await fs.readFile("input.txt", "utf-8");

const redTiles = text
  .split("\n")
  .map((line) => line.split(",").map((v) => Number(v)) as [number, number])
  .map(([x, y]) => ({ x, y }));

let maxArea = 0;

for (const [index, tileA] of redTiles.entries()) {
  for (const tileB of redTiles.slice(index + 1)) {
    const width = Math.abs(tileB.x - tileA.x) + 1;
    const height = Math.abs(tileB.y - tileA.y) + 1;
    const area = width * height;

    if (area > maxArea) {
      maxArea = area;
    }
  }
}

console.log({ maxArea });
