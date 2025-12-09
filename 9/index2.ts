import fs from "node:fs/promises";

const text = await fs.readFile("input.txt", "utf-8");

const redTiles = text
  .split("\n")
  .map((line) => line.split(",").map((v) => Number(v)) as [number, number])
  .map(([x, y]) => ({ x, y }));

interface Line {
  x: number;
  y: number;
  direction: "horizontal" | "vertical";
  extent: number;
}

const lines: Line[] = redTiles.map(({ x, y }, index) => {
  const b = redTiles[(index + 1) % redTiles.length]!;
  const minX = Math.min(x, b.x),
    maxX = Math.max(x, b.x),
    minY = Math.min(y, b.y),
    maxY = Math.max(y, b.y);

  const direction =
    maxX === minX ? "vertical" : maxY === minY ? "horizontal" : "?";

  if (direction === "?") throw new Error(`non-NESW direction at ${index}`);

  return {
    x: minX,
    y: minY,
    direction,
    extent: direction == "horizontal" ? maxX - minX : maxY - minY,
  };
});

function linesIntersect(a: Line, b: Line) {
  if (a.direction === b.direction) {
    return false;
  } else {
    if (a.direction === "horizontal") {
      return (
        a.x <= b.x &&
        b.x <= a.x + a.extent &&
        b.y <= a.y &&
        a.y <= b.y + b.extent
      );
    } else {
      return (
        b.x <= a.x &&
        a.x <= b.x + b.extent &&
        a.y <= b.y &&
        b.y <= a.y + a.extent
      );
    }
  }
}

let maxArea = 0;

function log<T>(term: string, x: T): T {
  // console.log(term, x);
  return x;
}

for (const [indexA, tileA] of redTiles.entries()) {
  for (const tileB of redTiles.slice(indexA + 1)) {
    const minX = Math.min(tileA.x, tileB.x),
      maxX = Math.max(tileA.x, tileB.x),
      minY = Math.min(tileA.y, tileB.y),
      maxY = Math.max(tileA.y, tileB.y);

    const width = maxX - minX + 1;
    const height = maxY - minY + 1;
    const area = width * height;

    if (area > maxArea) {
      const testLines: (Line | false)[] = [
        width > 2 && {
          x: minX + 1,
          y: minY,
          direction: "horizontal",
          extent: maxX - minX - 2,
        },
        height > 2 && {
          x: maxX,
          y: minY + 1,
          direction: "vertical",
          extent: maxY - minY - 2,
        },
        width > 2 && {
          x: minX + 1,
          y: maxY,
          direction: "horizontal",
          extent: maxX - minX - 2,
        },
        height > 2 && {
          x: minX,
          y: minY + 1,
          direction: "vertical",
          extent: maxY - minY - 2,
        },
      ];
      const allUsable = testLines
        .filter((line) => line !== false)
        .every((line, i) =>
          log(
            `lines on ${i}`,
            lines.every(
              (line2, i2) =>
                !log(`intersect ${i} ${i2}`, linesIntersect(line, line2))
            )
          )
        );
      // console.log(tileA, tileB, width, height, area, testLines, allUsable);

      if (allUsable) {
        maxArea = area;
        console.log(area);
      }
    }
  }
}

console.log({ maxArea });
