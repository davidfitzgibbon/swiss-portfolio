'use client'

import "@pixi/events";
import { Application, extend, useAssets, useTick, } from '@pixi/react'
import { Container, Graphics, Point, PointData, Sprite, } from 'pixi.js'
import { useCallback, useState } from 'react'

extend({ Container, Graphics, Sprite })

function chooseAlpha () {
  return Math.pow(Math.random(), 3) * .5;
}

function chooseRandomTime () {
  return (new Date()).getTime() + (Math.random() * 120_000);
}

type PlusProps = {
  pos: PointData;
  col: string;
  unit: number;
}
const Plus = ({
  pos={x:0,y:0},
  col="red",
  unit=1,
}:PlusProps ) => {

  const hoverAlpha = 1;
  const fastSpeed = .5;
  const slowSpeed = .005;
  const [speed, setSpeed] = useState(fastSpeed);
  const [alpha, setAlpha] = useState(chooseAlpha());
  const [alphaTarget, setAlphaTarget] = useState(alpha);
  const [updateTime, setUpdateTime] = useState(chooseRandomTime());

  const drawCallback = useCallback((graphics: Graphics) => {
    const small = unit * 0.5;
    const big = unit * 1.5;
    graphics.clear()
    graphics.moveTo(-small, -big);
    graphics.lineTo(small, -big);
    graphics.lineTo(small, -small);
    graphics.lineTo(big, -small);
    graphics.lineTo(big, small);
    graphics.lineTo(small, small);
    graphics.lineTo(small, big);
    graphics.lineTo(-small, big);
    graphics.lineTo(-small, small);
    graphics.lineTo(-big, small);
    graphics.lineTo(-big, -small);
    graphics.lineTo(-small, -small);
    graphics.fill(col);
  }, [])

  function over () {
    setSpeed(fastSpeed)
    setAlphaTarget(hoverAlpha)
  }
  function out () {
    setSpeed(slowSpeed)
    setAlphaTarget(chooseAlpha())
  }

  useTick(() => {
    if(new Date().getTime() > updateTime) {
      setAlphaTarget(chooseAlpha);
      setUpdateTime(chooseRandomTime())
    }
    setAlpha(alpha + ((alphaTarget - alpha) * speed))
  })

  return (
    <pixiGraphics
      draw={drawCallback}
      position={pos}
      alpha={alpha}
      onMouseOver={over}
      onMouseOut={out}
      interactive={true}
    />
  )
}

type Props = {
  imgURL: string;
  dominantColor: string;
}
export function ImageReveal({
  imgURL,
  dominantColor="red"
}:Props ){
  const {
    assets: [ texture ],
    isSuccess,
  } = useAssets([ imgURL ])

  const width = texture?.width || 1920;
  const height = texture?.height || 1080;
  const unit = width * .0125;

  const gridArray: Array<PointData> = [];
  function grid(x:number, y:number) {
    gridArray.push(new Point(x, y));
    gridArray.push(new Point(x + 2 * unit, y + 1 * unit));
    gridArray.push(new Point(x + 4 * unit, y + 2 * unit));
    gridArray.push(new Point(x + 1 * unit, y + 3 * unit));
    gridArray.push(new Point(x + 3 * unit, y + 4 * unit));
  }
  for (let x = 0; x < width; x += unit * 5) {
    for (let y = 0; y < height; y += unit * 5) {
      grid(x, y);
    }
  }

  return (
    <Application
    background={'white'}
    width={width}
    height={height}
    >
        {isSuccess && (
          <pixiSprite texture={texture} />
         )}
        {isSuccess && gridArray.map(pos=>(
          <Plus key={`x${pos.x},y${pos.y}`} pos={pos} col={dominantColor} unit={unit} />
        ))}
    </Application>
  )
}
export default ImageReveal;