import fs from "node:fs/promises";

const text = await fs.readFile("input.txt", "utf-8");

const numConnections = 1000;

interface Box {
  x: number;
  y: number;
  z: number;
  circuit: Set<Box>;
}

const boxes = text
  .split("\n")
  .map((line) => line.split(",").map((v) => Number(v)))
  .map(
    ([x, y, z]): Box => ({ x: x!, y: y!, z: z!, circuit: new Set(/* dummy */) })
  );

function distance(a: Box, b: Box) {
  const dx = b.x - a.x,
    dy = b.y - a.y,
    dz = b.z - a.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

const distances = boxes.flatMap((a, ai) =>
  boxes.slice(ai + 1).map((b) => ({ a, b, dist: distance(a, b) }))
);

distances.sort((a, b) => a.dist - b.dist);

const circuits: Set<Set<Box>> = new Set(
  boxes.map((box, i) => (box.circuit = new Set([box])))
);

for (const { a, b, dist } of distances.slice(0, numConnections)) {
  if (a.circuit === b.circuit) continue;
  const bCircuit = b.circuit;
  for (const item of bCircuit) {
    item.circuit = a.circuit;
    a.circuit.add(item);
    bCircuit.delete(item);
  }
  circuits.delete(bCircuit);
}

const circuitSizes = [...circuits].map((c) => c.size);
circuitSizes.sort((a, b) => b - a);

console.log(circuitSizes.slice(0, 3).reduce((acc, val) => acc * val, 1));
