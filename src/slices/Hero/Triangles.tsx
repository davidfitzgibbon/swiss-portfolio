"use client";

import "@pixi/events";
import { Application, extend } from "@pixi/react";
import { Container, Graphics } from "pixi.js";
import Triangle from "./Triangle";

extend({ Container, Graphics });

function getStartAngle(x: number, y: number, width: number, height: number) {
  const horz = x > width * 0.5;
  const vert = y > height * 0.5;

  let angle = 0;
  if (horz && vert) {
    angle = Math.PI * 0.5;
  }
  if (!horz && vert) {
    angle = Math.PI * 1;
  }
  if (!horz && !vert) {
    angle = Math.PI * 1.5;
  }

  return angle;
}
function getDistanceToCenter(
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const a = width * 0.5 - x;
  const b = height * 0.5 - y;

  return Math.sqrt(a * a + b * b) / width;
}

type Triangles = {
  horzCount?: number;
  vertCount?: number;
  start: boolean;
};
export function Triangles({
  horzCount = 5,
  vertCount = 5,
  start = true,
}: Triangles) {
  const size: number = 100;
  const width = horzCount * size;
  const height = vertCount * size;

  const triangles = [];
  for (let xi = 0; xi < horzCount; xi++) {
    for (let yi = 0; yi < vertCount; yi++) {
      const x = xi * size + size * 0.5;
      const y = yi * size + size * 0.5;
      const startAngle = getStartAngle(x, y, width, height);

      const delay = getDistanceToCenter(x, y, width, height);

      triangles.push({
        key: `x${x}y${y}`,
        x,
        y,
        startAngle,
        size,
        delay,
      });
    }
  }

  return (
    <Application
      width={width}
      height={height}
      background={"white"}
      className="trianges inset w-full"
    >
      {start &&
        triangles.map((triangle) => (
          <Triangle
            key={triangle.key}
            x={triangle.x}
            y={triangle.y}
            startAngle={triangle.startAngle}
            size={triangle.size}
            delay={triangle.delay}
          />
        ))}
    </Application>
  );
}
export default Triangles;
