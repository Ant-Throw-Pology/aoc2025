import fs from "node:fs/promises";

const text = await fs.readFile("input.txt", "utf-8");

const rows = text.trim().split("\n");

type Reducer = [
  (acc: number, val: number, index: number, arr: number[]) => number,
  number
];

const add: Reducer = [(acc, val) => acc + val, 0];
const mul: Reducer = [(acc, val) => acc * val, 1];

let sum = 0;

let numbers: number[] = [];
let operation: "+" | "*" | undefined = undefined;

for (let col = 0; col <= rows[0]!.length; col++) {
  const chars = rows.map((row) => row[col]).filter((ch) => ch !== undefined);
  if (chars.every((ch) => ch == " ")) {
    const result = numbers.reduce(...(operation == "+" ? add : mul));

    numbers = [];
    operation = undefined;

    sum += result;
  } else {
    const numChars = chars.slice(0, rows.length - 1);
    const opChar = chars[rows.length - 1]!;

    const numStr = numChars.join("");
    const num = +numStr;
    if (isFinite(num)) {
      numbers.push(num);
    }

    if (opChar == "+" || opChar == "*") {
      operation = opChar;
    }
  }
}

console.log({ sum });
