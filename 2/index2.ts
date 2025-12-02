import fs from "node:fs/promises";

const text = await fs.readFile("input.txt", "utf-8");

let idSum = 0;

for (const range of text.trim().split(",")) {
  const [min, max] = range.split("-").map((x) => Number(x)) as [number, number];
  for (let i = min; i <= max; i++) {
    if (i.toString().match(/^(\d+)\1+$/)) {
      idSum += i;
    }
  }
}

console.log({ idSum });
