"use client"

import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import { JSX, useState } from "react";

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from 'gsap/all';
import Triangles from "./Triangles";
gsap.registerPlugin(useGSAP,ScrollTrigger)

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {

  const [trianglesStart, setTrianglesStart] = useState(false);

  function lg(left:number, right:number, color: string) {
    return `linear-gradient(
				to right,
				transparent ${left}%,
				${color} ${left}%,
				${color} ${right}%,
				transparent ${right}%
			)`
  }
  useGSAP(()=>{
    const dur = .5;
    function startName() {
      const tl = gsap.timeline({
        duration: dur,
        opacity: 1
      });
      
      tl.to(".startName", {
        opacity: 1,
        duration: 0,
        color: "rgba(255,0,0,0)",
        backgroundImage: lg(0,0, "red"),
      })
      tl.to(".startName", {
        color: "rgba(255,0,0,0)",
        backgroundImage: lg(0,100, "red"),
      })
      tl.to(".startName", {
        color: "rgba(255,0,0,1)",
        backgroundImage: lg(0,100, "red"),
      })
      tl.to(".startName", {
        color: "rgba(255,0,0,1)",
        backgroundImage: lg(100,100, "red"),
      })
      return tl
    }
    function endName() {
      const tl = gsap.timeline({
        duration: dur
      });
  
      tl.to(".endName", {
        opacity: 1,
        color: "rgba(0,0,0,0)",
        backgroundImage: lg(100,100, "black"),
        duration: 0,
      })
      tl.to(".endName", {
        color: "rgba(0,0,0,0)",
        backgroundImage: lg(0,100, "black"),
      })
      tl.to(".endName", {
        color: "rgba(0,0,0,1)",
        backgroundImage: lg(0,100, "black"),
      })
      tl.to(".endName", {
        color: "rgba(0,0,0,1)",
        backgroundImage: lg(0,0, "black"),
      })
      return tl
    }
    function triangles() {
      const tl = gsap.timeline({
        duration: dur
      });
      tl.to(".endName", { // just using endName to waste some time
        onComplete: () => {setTrianglesStart(true)}
      })
      return tl
    }
    function h2() {
      const tl = gsap.timeline({
        duration: dur
      });
      
      tl.to(".title", {
        opacity: 0,
        y: 50,
        duration: 0,
      })
      tl.to(".title", {
        opacity: 1,
        y: 0,
      })
      
      return tl
    }
    function p() {
      const tl = gsap.timeline({
        duration: dur
      });

            
      tl.to(".description", {
        opacity: 0,
        y: 50,
        duration: 0,
      })
      tl.to(".description", {
        opacity: 1,
        y: 0,
      })
      

      return tl
    }

    const main = gsap.timeline();
      main
        .add(startName())
        .add(endName(), `=-${dur * 1.75}`)
        .add(triangles(), `=-${dur * 2}`)
        .add(h2(), `=+${dur * 1.0}`)
        .add(p(), `=-${dur * 1.5}`)

      })
    const renderLetters = (name: KeyTextField, key: string) => {
      if (!name) return;
      return name.split("").map((letter, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-500 delay-[3000ms] hover:transition-200 hover:rotate-180 hover:delay-0`}
        >
          {letter}
        </span>
      ));
    };
  
  return (
    <div className="layout">
      <div className="leading-none uppercase text-center justify-items-center grid">
        <h1 className="startName flex text-red text-6xl font-bold opacity-0 w-[min-content]">
          {renderLetters(slice.primary.startname, "start")}
        </h1>
        <h1 className="endName flex text-black text-9xl mb-6 font-extraBoldNarrow opacity-0 w-[min-content]">
          {renderLetters(slice.primary.endname, "end")}
        </h1>
      </div>
      
      <Triangles horzCount={10} vertCount={4} start={trianglesStart}/>
      <h2 className="mt-6 title opacity-0 uppercase leading-none font-regular text-4xl text-center my-4">{slice.primary.title}</h2>
      <p className="description opacity-0">{slice.primary.description}</p>
    </div>
  );
};

export default Hero;
