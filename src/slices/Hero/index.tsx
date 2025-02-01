"use client"

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";


import { Triangles } from "@/components/Triangles";
import { JSX, useRef, useState } from "react";

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(useGSAP,ScrollTrigger)

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const container = useRef<HTMLDivElement>(null)

  const [trianglesHaveStarted, setTrianglesHaveStarted] = useState(false);

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
      tl.to(null, {
        onComplete: () => {setTrianglesHaveStarted(true)}
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

    var main = gsap.timeline();
      main
        .add(startName())
        .add(endName(), `=-${dur * 1.75}`)
        .add(triangles())
        .add(h2(), `=+${dur * 1.0}`)
        .add(p(), `=-${dur * 1.5}`)
  })
  
  return (
    <div className="layout">
      <div className="leading-none uppercase text-center justify-items-center">
        <h1 className="startName text-red text-6xl font-bold opacity-0 w-[min-content]">
          {slice.primary.startname}
        </h1>
        <h1 className="endName text-black text-9xl font-boldNarrow opacity-0 w-[min-content]">
          {slice.primary.endname}
        </h1>
      </div>
      
      <Triangles horzCount={10} vertCount={4} autoStart={false} hasStarted={trianglesHaveStarted} />
      <h2 className="title opacity-0 uppercase leading-none font-regular text-4xl text-center my-4">{slice.primary.title}</h2>
      <p className="description opacity-0 text-red">{slice.primary.description}</p>
    </div>
  );
};

export default Hero;
