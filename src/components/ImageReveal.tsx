'use client'

import "@pixi/events";
import { Application, extend, useAssets } from '@pixi/react'
import { Container, Graphics, Point, PointData, Sprite, } from 'pixi.js'
import ImageRevealPlus from "./ImageRevealPlus";

extend({ Container, Graphics, Sprite })

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
          <ImageRevealPlus
            key={`x${pos.x},y${pos.y}`}
            pos={pos}
            col={dominantColor}
            unit={unit} />
        ))}
    </Application>
  )
}
export default ImageReveal;