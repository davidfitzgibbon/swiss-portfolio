'use client'

import "@pixi/events";
import { extend, useTick, } from '@pixi/react'
import { Container, Graphics, PointData, Sprite, } from 'pixi.js'
import { useCallback, useState } from 'react'

extend({ Container, Graphics, Sprite })

function chooseAlpha () {
  return Math.pow(Math.random(), 3) * .5;
}

function chooseRandomTime () {
  return (new Date()).getTime() + (Math.random() * 120_000);
}

type Props = {
  pos: PointData;
  col: string;
  unit: number;
}
const ImageRevealPlus = ({
  pos={x:0,y:0},
  col="red",
  unit=1,
}:Props ) => {

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
  }, [col,unit])

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

export default ImageRevealPlus;