"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useState } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Triangles from "./Triangles";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps) => {
  const [trianglesStart, setTrianglesStart] = useState(false);

  function lg(left: number, right: number, color: string) {
    return `linear-gradient(
				to right,
				transparent ${left}%,
				${color} ${left}%,
				${color} ${right}%,
				transparent ${right}%
			)`;
  }
  useGSAP(() => {
    const dur = 0.5;
    function startName() {
      const tl = gsap.timeline({
        duration: dur,
        opacity: 1,
      });

      tl.to(".startName", {
        opacity: 1,
        duration: 0,
        color: "rgba(255,0,0,0)",
        backgroundImage: lg(0, 0, "red"),
      });
      tl.to(".startName", {
        color: "rgba(255,0,0,0)",
        backgroundImage: lg(0, 100, "red"),
      });
      tl.to(".startName", {
        color: "rgba(255,0,0,1)",
        backgroundImage: lg(0, 100, "red"),
      });
      tl.to(".startName", {
        color: "rgba(255,0,0,1)",
        backgroundImage: lg(100, 100, "red"),
      });
      return tl;
    }
    function endName() {
      const tl = gsap.timeline({
        duration: dur,
      });

      tl.to(".endName", {
        opacity: 1,
        color: "rgba(0,0,0,0)",
        backgroundImage: lg(100, 100, "black"),
        duration: 0,
      });
      tl.to(".endName", {
        color: "rgba(0,0,0,0)",
        backgroundImage: lg(0, 100, "black"),
      });
      tl.to(".endName", {
        color: "rgba(0,0,0,1)",
        backgroundImage: lg(0, 100, "black"),
      });
      tl.to(".endName", {
        color: "rgba(0,0,0,1)",
        backgroundImage: lg(0, 0, "black"),
      });
      return tl;
    }
    function triangles() {
      const tl = gsap.timeline({
        duration: dur,
      });
      tl.to(".endName", {
        // just using endName to waste some time
        onComplete: () => {
          setTrianglesStart(true);
        },
      });
      return tl;
    }
    function h2() {
      const tl = gsap.timeline({
        duration: dur,
      });

      tl.to(".title", {
        opacity: 0,
        y: 50,
        duration: 0,
      });
      tl.to(".title", {
        opacity: 1,
        y: 0,
      });

      return tl;
    }
    function p() {
      const tl = gsap.timeline({
        duration: dur,
      });

      tl.to(".description", {
        opacity: 0,
        y: 50,
        duration: 0,
      });
      tl.to(".description", {
        opacity: 1,
        y: 0,
      });

      return tl;
    }

    const main = gsap.timeline();
    main
      .add(startName())
      .add(endName(), `=-${dur * 1.75}`)
      .add(triangles(), `=-${dur * 2}`)
      .add(h2(), `=+${dur * 1.0}`)
      .add(p(), `=-${dur * 1.5}`);
  });
  const renderLetters = (name: KeyTextField) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`hover:transition-200 inline-block transition-all delay-[3000ms] duration-500 hover:rotate-180 hover:delay-0`}
      >
        {letter}
      </span>
    ));
  };

  return (
    <div className="layout">
      <div className="grid justify-items-center text-center uppercase leading-none">
        <h1 className="startName flex w-[min-content] font-bold text-6xl text-red opacity-0">
          {renderLetters(slice.primary.startname)}
        </h1>
        <h1 className="endName mb-6 flex w-[min-content] font-extraBoldNarrow text-9xl text-black opacity-0">
          {renderLetters(slice.primary.endname)}
        </h1>
      </div>

      <Triangles horzCount={10} vertCount={4} start={trianglesStart} />
      <h2 className="title my-4 mt-6 text-center font-regular text-4xl uppercase leading-none opacity-0">
        {slice.primary.title}
      </h2>
      <p className="description opacity-0">{slice.primary.description}</p>
    </div>
  );
};

export default Hero;
