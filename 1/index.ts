import fs from "node:fs/promises";

const text = await fs.readFile("input.txt", "utf-8");

let dial = 50;
let zeros = 0;

for (const line of text.trim().split("\n")) {
  const m = line.match(/^([LR])(\d+)$/);
  if (!m) throw new Error(line);

  const num = (m[1] == "L" ? -1 : 1) * parseInt(m[2]!);

  dial += num;
  dial %= 100;

  if (dial === 0) zeros++;
}

console.log({ zeros });
