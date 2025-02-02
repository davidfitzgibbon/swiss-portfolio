import { useTick } from '@pixi/react';
import { PointData } from 'pixi.js'
import React, { useState } from 'react'

function distBetweenPoints(
  x1:number,
  y1:number,
  x2:number,
  y2:number
) {
  const a = x2 - x1;
  const b = y2 - y1;
  
  return Math.sqrt(a * a + b * b);
}

type Props = {
  pos: PointData;
  mouse: PointData;
  max: number;
  active: boolean;
}
export default function Dot({
  pos,
  mouse,
  max,
  active = false
}: Props) {
  const distanceLimit = 200;
  const [size, setSize] = useState(20);

  useTick(()=>{
    const dampSize = size * .95;
    if(active) {
      const distToMouse = distBetweenPoints(pos.x, pos.y, mouse.x,mouse.y);
      let percDistance = (distToMouse / distanceLimit);
      percDistance = Math.pow(percDistance,3)
      percDistance = 1-percDistance;
      const percSize = max * percDistance;

      setSize(Math.max(Math.max(dampSize,percSize), 5))
    } else {
      setSize(Math.max(dampSize, 5))
    }
  })

  return (
    <pixiGraphics  position={pos} draw={graphics => {
      graphics.clear()
      graphics.ellipse(0, 0, size, size);
      graphics.fill("white");
    }} />
  )
}