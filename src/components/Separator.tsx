"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Separator() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const separators: Array<SVGElement> =
        gsap.utils.toArray(".separator svg");

      separators.forEach((separator) => {
        gsap.to(separator, {
          scrollTrigger: {
            trigger: separator,
            toggleActions: "restart none none none",
            // markers: true,
            start: "30px bottom",
          },
          rotation: 90 * Math.floor(Math.random() * 4),
          duration: 0.2,
          opacity: 1,
        });
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="separator text-red mx-auto my-8 flex w-full max-w-5xl justify-between"
    >
      <Triangle />
      <Triangle />
    </div>
  );
}

function Triangle() {
  return (
    <svg viewBox="-50 -50 100 100" className="size-4 opacity-0 md:size-8">
      <path fill="currentColor" d="M0,0 L-50,-50 L50,-50 L50,50" />
    </svg>
  );
}
