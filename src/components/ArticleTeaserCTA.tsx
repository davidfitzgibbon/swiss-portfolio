'use client'

import "@pixi/events";
import { extend } from '@pixi/react'
import { Container, Graphics, Point, Text, } from 'pixi.js'

extend({ Container, Graphics, Text })

type WordProps = {
  pos: Point;
  size: number;
};
export function ArticleTeaserCTA({
  pos= new Point(0,0),
  size = 30,
}: WordProps) {

  return (
    <pixiContainer position={pos}>
      <pixiGraphics draw={graphics => {
        graphics.clear()
        graphics.rect(-size*5, -size*1.25, size*10, size*2.5);
        graphics.stroke({ width: 2, color: "black" });
        graphics.fill("white");
      }} />
      <pixiText text={`READ ME`} style={{
        fontSize: size,
        fill: "red",
        align: 'center',
      }} 
      anchor={{ x: 0.5, y: 0.5 }}/>

    </pixiContainer>
  )
}

export default ArticleTeaserCTA;