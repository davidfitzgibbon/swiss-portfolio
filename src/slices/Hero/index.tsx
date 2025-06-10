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
    const duration = 1;

    function startName() {
      const tl = gsap.timeline({
        duration,
        opacity: 1,
      });

      tl.to(".startName", {
        opacity: 1,
        duration: 0,
        color: "rgba(255,0,0,0)",
        backgroundImage: lg(0, 0, "red"),
      })
        .to(".startName", {
          color: "rgba(255,0,0,0)",
          backgroundImage: lg(0, 100, "red"),
        })
        .set(".startName span", {
          opacity: 1,
        })
        .to(".startName", {
          color: "rgba(255,0,0,1)",
          backgroundImage: lg(0, 100, "red"),
        })
        .to(".startName", {
          color: "rgba(255,0,0,1)",
          backgroundImage: lg(100, 100, "red"),
        });

      return tl;
    }

    function endName() {
      const tl = gsap.timeline({
        duration,
      });

      tl.to(".endName", {
        opacity: 1,
        color: "rgba(0,0,0,0)",
        backgroundImage: lg(100, 100, "black"),
        duration: 0,
      })
        .to(".endName", {
          color: "rgba(0,0,0,0)",
          backgroundImage: lg(0, 100, "black"),
        })
        .set(".endName span", {
          opacity: 1,
        })
        .to(".endName", {
          color: "rgba(0,0,0,1)",
          backgroundImage: lg(0, 100, "black"),
        })
        .to(".endName", {
          color: "rgba(0,0,0,1)",
          backgroundImage: lg(0, 0, "black"),
        });

      return tl;
    }

    function triangles() {
      const tl = gsap.timeline({
        duration,
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
        duration,
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
        duration,
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
      .add(endName(), `0`)
      .add(triangles(), `=-${duration * 2.5}`)
      .add(h2(), `=-${duration * 0.5}`)
      .add(p(), `=-${duration * 0.8}`);
  });

  const renderLetters = (name: KeyTextField) => {
    if (typeof name !== "string" || !name) return null;
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className="inline-block opacity-0"
        onMouseEnter={(e) => {
          gsap.to(e.currentTarget, {
            rotation: 180,
            duration: 0.5,
            ease: "power2.inOut",
          });
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, {
            rotation: 0,
            duration: 0.5,
            delay: 3,
            ease: "power2.inOut",
          });
        }}
      >
        {letter}
      </span>
    ));
  };

  return (
    <div className="layout">
      <h1 className="grid justify-items-center text-center leading-none uppercase">
        <span className="startName text-red flex w-min text-6xl opacity-0 md:text-8xl">
          {renderLetters(slice.primary.startname)}
        </span>
        <span className="endName font-extra-bold-narrow flex w-min text-9xl text-black opacity-0">
          {renderLetters(slice.primary.endname)}
        </span>
      </h1>
      <Triangles horzCount={10} vertCount={4} start={trianglesStart} />
      <h2 className="title my-4 text-center text-4xl leading-none font-black uppercase opacity-0 md:my-8">
        {slice.primary.title}
      </h2>

      <p className="description mx-auto mt-8 max-w-[64ch] text-xl/9 opacity-0">
        {slice.primary.description}
      </p>
    </div>
  );
};

export default Hero;
