'use client'

import "@pixi/events";
import { Application, extend } from '@pixi/react'
import { Container, FederatedMouseEvent, Graphics, Point, Text, } from 'pixi.js'
import { useEffect, useState } from 'react'

extend({ Container, Graphics, Text })

type WordProps = {
  pos: Point;
  size: number;
};
export function Word({
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
      <pixiText text={`READ ARTICLE`} style={{
        fontSize: size,
        fill: "red",
        align: 'center',
      }} 
      anchor={{ x: 0.5, y: 0.5 }}/>

    </pixiContainer>
  )
}

export function ArticleTeaser() {
  const width = 1200;
  const height = width * .5;
  const size = Math.min(width,height) * .1;
  const count = 300;

  const target = new Point(width*.5,height*.5);
  type ListProps = {
    target: Point;
    pos: Point;
  };
  const initialList: Array<ListProps> = [];
  for(let i = 0; i < count; i++) {
    initialList.push({
      target: i == 0? target : initialList[i-1].pos,
      pos: new Point(width*.5,height*.5),
    })
  }
  
  const [active, setActive] = useState(false);
  const [mouseX, setMouseX] = useState(width * .5)
  const [mouseY, setMouseY] = useState(height * .5)
  const [wordList, setWordList] = useState([...initialList])

  useEffect(()=>{
    const interval = setInterval(() => {
      const dampingSpeed = .8;

      if(active){
        setWordList((prevWordList)=>
          prevWordList.map((word,i) => {
            const newPos = new Point(word.pos.x,word.pos.y)
            const newTarget = new Point(0,0)
            if(i == 0) {
              newTarget.x = mouseX;
              newTarget.y = mouseY;
            
            } else {
              newTarget.x = wordList[i-1].pos.x;
              newTarget.y = wordList[i-1].pos.y;
            }
            newPos.x += ((newTarget.x-newPos.x) * dampingSpeed);
            newPos.y += ((newTarget.y-newPos.y) * dampingSpeed);
            
            return {
              ...word,
              pos: newPos
            }
          })
        )
      }
        
    }, 1); // ~60 FPS
        
    return () => clearInterval(interval);
  },[active, mouseX, mouseY, wordList])

  
  function over (e: FederatedMouseEvent) {
    setActive(true);
    setMouseX(e.global.x);
    setMouseY(e.global.y);
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
      {wordList.map((word: ListProps, i: number)=> {
        return (
          <Word
            key={`i${i}`}
            pos={word.pos}
            size={size}
          />
        );
      })}
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
export default ArticleTeaser;