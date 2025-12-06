import fs from "node:fs/promises";

const text = await fs.readFile("input.txt", "utf-8");

const rows = text
  .trim()
  .split("\n")
  .map((row) => row.trim().split(/ +/));

type Reducer = [
  (acc: number, val: number, index: number, arr: number[]) => number,
  number
];

const add: Reducer = [(acc, val) => acc + val, 0];
const mul: Reducer = [(acc, val) => acc * val, 1];

let sum = 0;

for (let col = 0; col < rows[0]!.length; col++) {
  const numbers = rows.map((row) => row[col]!);
  const operation = numbers.pop();
  const result = numbers
    .map((n) => Number(n))
    .reduce(...(operation == "+" ? add : mul));

  sum += result;
}

console.log({ sum });
