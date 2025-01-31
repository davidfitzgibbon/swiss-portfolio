'use client'

import { Application, extend, useTick, } from '@pixi/react'
import { Container, Graphics, } from 'pixi.js'
import { useCallback, useState } from 'react'

extend({ Container, Graphics })

const Square = ({x=0,y=0}) => {

  const [pos,setPos] = useState({
    x,y
  })

  const drawCallback = useCallback((graphics: { clear: () => void; setFillStyle: (arg0: { color: string }) => void; rect: (arg0: number, arg1: number, arg2: number, arg3: number) => void; fill: () => void }) => {
    graphics.clear()
    graphics.setFillStyle({ color: 'red' })
    graphics.rect(0, 0, 100, 100)
    graphics.fill()
  }, [])

  function redoPos () {
    return {
      x:pos.x+1,
      y:pos.y+.5
    }
  }

  useTick(() => {
    setPos(redoPos)
  })

  return (
    <pixiGraphics draw={drawCallback} position={pos} />
  )
}

export function Agh() {
  return (
    <Application>
        <Square x={40} y={100} />
    </Application>
  )
}
export default Agh;