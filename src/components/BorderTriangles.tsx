"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface TriangleProps {
  rotation: 0 | 90 | 180 | 270;
}

function Triangle({ rotation }: TriangleProps) {
  const rotationClass = {
    0: "rotate-0",
    90: "rotate-90",
    180: "rotate-180",
    270: "rotate-270",
  }[rotation];

  return (
    <svg
      viewBox="-50 -50 100 100"
      className={`size-4 md:size-8 ${rotationClass}`}
    >
      <path fill="currentColor" d="M0,0 L-50,-50 L50,-50 L50,50" />
    </svg>
  );
}

export function BorderTriangles() {
  return (
    <div className="border-triangles text-red pointer-events-none absolute inset-0 mx-auto flex w-full flex-col justify-between">
      <div className="flex justify-between">
        <Triangle rotation={270} />
        <Triangle rotation={0} />
      </div>
      <div className="flex justify-between">
        <Triangle rotation={180} />
        <Triangle rotation={90} />
      </div>
    </div>
  );
}
