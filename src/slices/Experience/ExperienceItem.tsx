"use client"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from 'gsap/all';
import { useRef } from "react"

gsap.registerPlugin(useGSAP,ScrollTrigger)

type Props = {
  institution: string | null;
  year: number | null;
  task: string | null;
  type: string | null;
}

export default function TechItem({institution, year, task, type}: Props) {
  const container = useRef<HTMLLIElement>(null)

  useGSAP(()=>{
    const q = gsap.utils.selector(container.current);
    const triangle = q('.triangle');
    const type = q('.type');
    const task = q('.task');
    const institution = q('.institution');
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        // markers: true,
        start: "80px bottom",
      },
    })
    
    const overlap = "-=.25";
    tl.addLabel("start")
      .to(
        triangle,
        { y: 0, easing: "power3.out" },
        overlap
      )
      .to(
        type,
        { x: 0, easing: "power3.out" },
        overlap
      )
      .to(
        task,
        { x: 0, easing: "power3.out" },
        overlap
      )
      .to(
        institution,
        { x: 0, easing: "power3.out" },
        overlap
      )
    

  },{scope:container})
  
  return (
    <li className='grid grid-cols-[100px,1fr] align-start mb-6 gap-2' ref={container} >
      <svg viewBox="0 0 100 80" className="w-full block">
        <path className="triangle translate-y-[-320px]" fill="red" d="M0,0L100,0L50,80" />
        <text x="50%" y="20" fontSize="22" dominantBaseline="middle" textAnchor="middle" fill="white">{year}</text>
      </svg>
      <div className="text overflow-hidden">
        <p className="type font-light translate-x-[-100px] m-0">{type}</p>
        <p className='task text-2xl font-black translate-x-[-100%] m-0'>{task}</p>
        <p className='institution text-2xl font-ultraLight translate-x-[-100%] m-0'>{institution}</p>
      </div>
    </li>
  )
}