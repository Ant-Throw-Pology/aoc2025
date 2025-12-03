import fs from "node:fs/promises";

const text = await fs.readFile("input.txt", "utf-8");

/**
 * Fun fact: The naive approach (checking all combinations by recursing 12
 * times) would need to check over 1 quadrillion (1,050,421,051,106,700 to be
 * exact) combinations. See you in many thousands of years!
 */

const numToChoose = 12;

let totalMaxJolt = 0;

for (const line of text.trim().split("\n")) {
  const batteries = line.split("").map((v) => +v);
  const chosen = new Set<number>();

  for (let i = 0; i < numToChoose; i++) {
    let newMax = 0,
      newMaxIndex = -1;

    // find the not-chosen-yet battery that will improve the total joltage the most
    for (const index of batteries.keys()) {
      if (chosen.has(index)) continue;

      // total joltage if this battery were to be added:
      const totalJolt = +batteries
        .filter((_jolt, i) => i === index || chosen.has(i))
        .join("");

      if (totalJolt > newMax) {
        newMax = totalJolt;
        newMaxIndex = index;
      }
    }

    chosen.add(newMaxIndex);
  }

  totalMaxJolt += +batteries.filter((_jolt, i) => chosen.has(i)).join("");
}

console.log({ totalMaxJolt });
