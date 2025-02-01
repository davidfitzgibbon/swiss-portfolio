'use client'

import "@pixi/events";
import { Application, extend, useTick } from '@pixi/react'
import { Container, Graphics, } from 'pixi.js'
import { useCallback, useRef, useState } from 'react'

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
gsap.registerPlugin(useGSAP)

extend({ Container, Graphics })

function getRandomAngle() {
  return Math.floor(Math.random() * 4) * (Math.PI * .5);
}
function getStartAngle(
  x:number,
  y:number,
  width:number,
  height:number
) {
  const horz = x > width*.5;
  const vert = y > height*.5;

  let angle = 0;
  if(horz && vert) {
    angle = Math.PI*.5
  }
  if(!horz && vert) {
    angle = Math.PI*1
  }
  if(!horz && !vert) {
    angle = Math.PI*1.5
  }
    
  return angle;
}
function getDistanceToCenter(x:number,y:number,width:number,height:number) {
  var a = (width*.5) - x;
  var b = (height*.5) - y;
  
  return Math.sqrt(a * a + b * b) / width;
}
// TRIANGLE
type Triangle = {
  x:number;
  y:number;
  size:number;
  startAngle:number;
  delay: number;
};
const Triangle = ({
  x=0,
  y=0,
  size = 100,
  startAngle=1,
  delay=1,
}: Triangle) => {

  const [targetAngle, setTargetAngle] = useState(startAngle);
  const [angle, setAngle] = useState(targetAngle);
  const [alpha, setAlpha] = useState(0);

  const pos = { x,y }

  const drawCallback = useCallback((graphics: { clear: () => void; setFillStyle: (arg0: { color: string; }) => void; moveTo: (arg0: number, arg1: number) => void; lineTo: (arg0: number, arg1: number) => void; rotation: number; fill: (arg0: string) => void; }) => {
    graphics.clear()
    graphics.setFillStyle({ color: 'red' })
    graphics.moveTo(0, 0);
    graphics.lineTo(-size*.5, -size*.5);
    graphics.lineTo(size*.5, -size*.5);
    graphics.lineTo(size*.5, size*.5);
    graphics.lineTo(0, 0);
    graphics.rotation = angle;

    graphics.fill("red");
  }, [angle, size])

  useGSAP(()=>{
      const dur = .5;
      // OBJ
      let gsapObj = {
        alpha: 0
      };
      // TIMELINE
      const tl = gsap.timeline({
        duration: dur,
      });
      // ANIMATIONS
      tl.to(gsapObj, {
        delay: delay,
        alpha: 1,
        onUpdate: () =>{ setAlpha(gsapObj.alpha); },
      })
      tl.to(gsapObj, {
        delay: 2,
        onComplete: () =>{ setTargetAngle(getRandomAngle()); },
      })
    }
  )

  useTick(()=>{
    setAngle(angle - ((angle-targetAngle) * .1))
  })

  function changeAngle () {
    setTargetAngle((getRandomAngle() - Math.PI)*2)
  }
  
  return (
    <pixiGraphics
      draw={drawCallback}
      position={pos}
      rotation={angle}
      alpha={alpha}
      onMouseOver={changeAngle}
      interactive={true}
    />
  )
}

type Triangles = {
  horzCount?: number;
  vertCount?: number;
  start: boolean;
};
export function Triangles({
  horzCount= 5,
  vertCount = 5,
  start = true
}: Triangles) {
  const size: number = 100;
  const width = horzCount*size;
  const height = vertCount*size;

  const triangles = [];
  for(let xi = 0; xi < horzCount; xi++) {
    for(let yi = 0; yi < vertCount; yi++) {
      const x = (xi*size)+size*.5;
      const y = (yi*size)+size*.5;
      const startAngle = getStartAngle(x,y,width,height);
      
      const delay = getDistanceToCenter(x,y,width,height);
      
      triangles.push({
        key:`x${x}y${y}`,
        x,
        y,
        startAngle,
        size,
        delay
      })
    }
  }

  return (
    <Application
      width={width}
      height={height}
      background={'white'}
      className="trianges inset"
    >
        {start && triangles.map((triangle)=> (
          <Triangle
            key={triangle.key}
            x={triangle.x}
            y={triangle.y}
            startAngle={triangle.startAngle}
            size={triangle.size}
            delay={triangle.delay}
          />
        ))}
    </Application>
  )
}
export default Triangles;
