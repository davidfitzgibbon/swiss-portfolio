"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from 'gsap/all';
import { useRef } from "react"

gsap.registerPlugin(useGSAP,ScrollTrigger)

export function Separator() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(()=>{
    var separators: Array<SVGElement> = gsap.utils.toArray(".separator svg");

    separators.forEach((separator, i) => {
      gsap.to(separator, {
        scrollTrigger: {
          trigger: separator,
          toggleActions: "restart none none none",
          // markers: true,
          start: "100px bottom",
        },
        rotation: 90 * ((i*2-1)),
        duration: 0.2,
        opacity: 1
      });
    });

  },{scope:container})

  return (
    <div className="layout">
      <div
        ref={container}
        className="separator fill-red w-[calc(100%_-_2rem)] my-8 ml-[1rem] flex justify-between outset">
        {Array(2).fill("").map((_,i)=>(
          <svg key={i} viewBox="0 0 100 100" className='w-8 opacity-0'>
            <rect x="0" y="33" width="100" height="33" />
            <rect x="33" y="0" width="33" height="100" />
          </svg>
          )
        )}
      </div>
    </div>
  )
}