import fs from "node:fs/promises";

const text = await fs.readFile("input.txt", "utf-8");

let dial = 50;
let zeros = 0;

for (const line of text.trim().split("\n")) {
  const m = line.match(/^([LR])(\d+)$/);
  if (!m) throw new Error(line);

  let num = (m[1] == "L" ? -1 : 1) * parseInt(m[2]!);

  while (num !== 0) {
    const move = Math.sign(num);
    dial += move;
    num -= move;
    if (dial > 99) dial -= 100;
    else if (dial < 0) dial += 100;

    if (dial === 0) zeros++;
  }
}

console.log({ zeros });
