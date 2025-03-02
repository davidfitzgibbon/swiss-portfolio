import React, { useRef } from 'react'
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
gsap.registerPlugin(useGSAP)

type Props = {
  name: string;
  effectiveness: string;
}

export default function TechItem({name, effectiveness}: Props) {
  
  const triangles = [];
  for(let i = 1; i <=5; i++) {
    triangles.push(
      i < Number(effectiveness) ? true:false
    );
  }
  const container = useRef<HTMLLIElement>(null)

  useGSAP(()=>{
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        // markers: true,
        start: "50px bottom",
      },
    })

    tl.to("h3,svg", {
      easing: "power3.out",
      x: 0,
      stagger: 0.1
    })
  },{scope:container})

  return (
    <li className='text-4xl text-black fill-red grid grid-cols-[min-content_min-content] gap-6 mb-8 justify-end'
        ref={container} >
      <div className='overflow-hidden'>
        <h3 className='font-black text-right translate-x-[150px]'>{name}</h3>
      </div>
      <div className='flex gap-2 self-center overflow-hidden'>
        {triangles.map((triangle,i)=>(
          <svg viewBox="0 0 284 284" key={i} className='w-[.5em] -translate-x-[150px]'>
            {triangle && (
              <path d="M283 142 0 283V0l283 142Z"/>
            )}
            <path d="M283 142 0 283V0l283 142Zm-20 0L9 15v254l254-127Z"/>
          </svg>
        ))}
      </div>
    </li>
  )
}