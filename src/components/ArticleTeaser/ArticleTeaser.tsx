'use client'

import "@pixi/events";
import { Application, extend } from '@pixi/react'
import { Container, FederatedMouseEvent, Graphics, Point, Text, } from 'pixi.js'
import { useState } from 'react'
import Dot from "./Dot";

extend({ Container, Graphics, Text })


export function ArticleTeaser() {
  const width = 1200;
  const height = width * .5;
  const size = Math.min(width,height) * .3;

  const dotArray = [];
  const dotArraySize = size*.75;
  for(let x = 0; x < width; x += dotArraySize) {
    for(let y = 0; y < width; y += dotArraySize) {
      const xRand = x + ((Math.random() - .5)*dotArraySize);
      const yRand = y + ((Math.random() - .5)*dotArraySize);
      dotArray.push(new Point(xRand,yRand))
    }
  }

  const [mouse, setMouse] = useState(new Point(0,0))
  const [active, setActive] = useState(false)
  const [dots] = useState(dotArray)

  function over (e: FederatedMouseEvent) {
    setActive(true);
    setMouse(new Point(e.global.x,e.global.y));
  }
  function out () {
    setActive(false);
  }

  return (
    <Application
      width={width}
      height={height}
      background={'red'}
    >
      {dots.map(dot=>(
        <Dot key={`x${dot.x}y${dot.y}`} pos={dot} mouse={mouse} max={size} active={active} />
      ))}

      <pixiContainer position={{x:width*.5, y:height*.5}}>
        <pixiText text={`READ ME`} style={{
          fontSize: size,
          fontWeight: "900",
          fill: "red",
          align: 'center',
        }} 
        anchor={{ x: 0.5, y: 0.5 }}/>

      </pixiContainer>
      
      {/* OUR HIT TARGET */}
      <pixiGraphics draw={graphics => {
        graphics.clear()
        graphics.rect(0, 0, width, height);
        graphics.fill("rgba(0,0,0,0)");
      }}
      onMouseMove={over}
      onMouseLeave={out}
      interactive={true} />
    </Application>
  )
}
export default ArticleTeaser;