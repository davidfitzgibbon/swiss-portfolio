'use client'

import "@pixi/events";
import { Application, extend } from '@pixi/react'
import { Container, Graphics, Sprite, } from 'pixi.js'
import Slice from "./Slice";
import { useState } from "react";

extend({ Container, Graphics, Sprite })

type Props = {
  imgURL: string;
}
export function ProjectTeaser({
  imgURL
}:Props ){
  const width = 1920;
  const height = 1080;
  const sliceCount = 20;
  const sliceHeight = height / sliceCount
  
  const slices = [];
  for(let y = 0; y < height; y+= sliceHeight) {
    slices.push(y)
  }

  const [active, setActive] = useState(false);

  function over () {
    setActive(true);
  }
  function out () {
    setActive(false);
  }

  return (
    <Application
    background={'white'}
    width={width}
    height={height}
    >
        {slices.map(slice=>(
          <Slice key={slice} y={slice} imgURL={imgURL} width={width} sliceHeight={sliceHeight} active={active} />
        ))
         }
        {/* OUR HIT TARGET */}
        <pixiGraphics draw={graphics => {
        graphics.clear()
        graphics.rect(0, 0, width, height);
        graphics.fill("rgba(0,0,0,0)");
      }}
      // onMouseOver={over}
      onMouseMove={over}
      onMouseLeave={out}
      interactive={true} />
    </Application>
  )
}
export default ProjectTeaser;