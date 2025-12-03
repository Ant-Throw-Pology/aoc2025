import fs from "node:fs/promises";

const text = await fs.readFile("input.txt", "utf-8");

let totalMaxJolt = 0;

for (const line of text.trim().split("\n")) {
  const batteries = line.split("").map((v) => +v);

  let max = 0;

  for (let i = 0; i < batteries.length; i++) {
    for (let j = i + 1; j < batteries.length; j++) {
      const a = batteries[i]!,
        b = batteries[j]!;

      const jolt = a * 10 + b;
      if (jolt > max) max = jolt;
    }
  }

  totalMaxJolt += max;
}

console.log({ totalMaxJolt });
