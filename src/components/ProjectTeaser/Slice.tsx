import { extend, useTick } from "@pixi/react"
import { Assets, Container, Graphics, Sprite } from "pixi.js"
import React, { useEffect, useRef, useState } from "react"

extend({ Container, Graphics, Sprite })

function getOffset(num: number) {
  return (Math.random() - .5) * num;
}

type Props = {
  imgURL: string;
  active: boolean;
  width: number;
  sliceHeight: number;
  y: number;
}

export default function Slice({
  imgURL,
  width = 100,
  sliceHeight = 100,
  y = 0,
  active = false
}: Props) {
  const [texture, setTexture] = useState(null)

  const [offset, setOffset] = useState(getOffset(width));
  const [offsetCurrent, setOffsetCurrent] = useState(0);
  const maskRef = useRef(null);
  const [frame, setFrame] = useState(0);
  const [frameLimit] = useState(Math.floor(Math.random()*60) + 60);

  useEffect(() => {
    if (!texture) {
      Assets
        .load(imgURL)
        .then(asset => setTexture(asset))
    }
  }, [texture,imgURL])

  useTick(()=>{
    const damping = .1;
    if(active) {
      setOffsetCurrent(offsetCurrent + ((offset-offsetCurrent)*damping))
    } else {
      setOffsetCurrent(offsetCurrent + ((0-offsetCurrent)*damping))
    }
    setFrame(frame+1)
    if(frame % frameLimit == 0) {
      setOffset(getOffset(width))
    }
  })

  return (
    <>
      {texture && <pixiContainer mask={maskRef?.current} >
        <pixiGraphics
          label="mask"
          draw={(graphics) => {
            graphics.clear()
            graphics.rect(0, y, width, sliceHeight);
            graphics.fill(0x000000);
          }}
          ref={maskRef}
        />
        <pixiSprite texture={texture} position={{
          x:offsetCurrent,y:0
        }} />
      </pixiContainer> }
    </>
  )
}