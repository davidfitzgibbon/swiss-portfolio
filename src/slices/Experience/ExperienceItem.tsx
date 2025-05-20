"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { components } from "@/richTextComponents";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ExperienceItemProps = {
  institution: string | null;
  year: number | null;
  task: string | null;
  type: string | null;
  description: RichTextField;
};

export function ExperienceItem({
  institution,
  year,
  task,
  type,
  description,
}: ExperienceItemProps) {
  const container = useRef<HTMLLIElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(container.current);
      const triangle = q(".triangle");
      const type = q(".type");
      const task = q(".task");
      const institution = q(".institution");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          // markers: true,
          start: "80px bottom",
        },
      });

      const overlap = "-=.25";
      tl.addLabel("start")
        .to(triangle, { y: 0, easing: "power3.out" }, overlap)
        .to(type, { x: 0, easing: "power3.out" }, overlap)
        .to(task, { x: 0, easing: "power3.out" }, overlap)
        .to(institution, { x: 0, easing: "power3.out" }, overlap);
    },
    { scope: container },
  );

  return (
    <li ref={container}>
      <div className="align-start mb-6 flex gap-2">
        <svg viewBox="0 0 100 80" className="block w-[100px] shrink-0">
          <path
            className="triangle translate-y-[-320px]"
            fill="red"
            d="M0,0L100,0L50,80"
          />
          <text
            x="50%"
            y="20"
            fontSize="22"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="white"
          >
            {year}
          </text>
        </svg>
        <div className="text grow overflow-hidden">
          <p className="type translate-x-[-100px] font-light">{type}</p>
          <p className="task translate-x-[-100%] font-black text-2xl">{task}</p>
          <p className="institution translate-x-[-100%] font-ultraLight text-2xl">
            {institution}
          </p>
        </div>
      </div>
      <div>
        <PrismicRichText field={description} components={components} />
      </div>
    </li>
  );
}
