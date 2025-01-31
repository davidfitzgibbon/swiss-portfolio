'use client'

import "@pixi/events";
import { Application, extend, useTick } from '@pixi/react'
import { Container, Graphics, } from 'pixi.js'
import { useCallback, useState } from 'react'

extend({ Container, Graphics })

const Triangle = ({x=0,y=0, size = 100}: {x:number,y:number,size:number}) => {

  const [targetAngle, setTargetAngle] = useState(getAngle());
  const [angle, setAngle] = useState(targetAngle);

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

  useTick(()=>{
    setAngle(angle - ((angle-targetAngle) * .1))
  })

  function getAngle() {
    return Math.floor(Math.random() * 4) * (Math.PI * .5);
  }

  function changeAngle () {
    setTargetAngle((getAngle() - Math.PI)*2)
  }

  return (
    <pixiGraphics
      draw={drawCallback}
      position={pos}
      rotation={angle}
      onMouseOver={changeAngle}
      interactive={true}
    />
  )
}

type Props = {
  horzCount?: number;
  vertCount?: number;
};
export function Triangles({
  horzCount= 5,
  vertCount = 5
}: Props) {
  const size: number = 100;
  const width = horzCount*size;
  const height = vertCount*size;

  return (
    <Application width={width} height={height} background={'white'} className="trianges inset">
        {[...Array(horzCount)].map((_,x)=> (
          [...Array(vertCount)].map((_,y)=> (
            <Triangle
              key={`x${x}y${y}`}
              x={(x*size)+size*.5}
              y={(y*size)+size*.5}
              size={size}
            />
          ))
        ))}
    </Application>
  )
}
export default Triangles;
