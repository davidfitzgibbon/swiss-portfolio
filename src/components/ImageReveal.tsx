'use client'

import * as PIXI from "pixi.js"
import { useEffect, useRef } from "react";

// MAIN EL
type Props = {
  imgURL: string;
  dominantColor: string;
}
export function ImageReveal({
  imgURL,
  dominantColor = "#ff0000"
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      
      (async () => {
        
        // SETTINGS
        const width = window.innerWidth;
        const height = width / 2;
        const unit = width * .0125;
        const framesPerChange = 1;
      
        // THINGS THAT CHANGE
        let hovered = false;
      
        // CREATE APP
        const app = new PIXI.Application();
        await app.init({
          background: "#fff",
          width: width,
          height: height
        });
        container.appendChild(app.canvas);
      
        // SET UP FRAME
        let frame = 0;
        app.ticker.add(() =>  frame++);
      
        // CREATE TEXTURE
        const texture = await PIXI.Assets.load(imgURL);
        const img = new PIXI.Sprite(texture);
        img.width = width;
        img.height = height;
        app.stage.addChild(img);
      
        // PLUSSES
        const plusses: Array<Plus> = [];
        class Plus {
          x: number;
          y: number;
          o: number;
          origo: number;
          fullo: number;
          speed: number;
          path: PIXI.Graphics;

          constructor(x: number = 0, y:number = 0) {
            // pos
            this.x = x;
            this.y = y;
            // alpha
            this.o = this.chooseO();
            this.origo = 0;
            this.fullo = this.o;
            // speed
            this.speed = Math.pow(Math.random(), 3)*.05;
            this.path = this.createGraphic();
            app.stage.addChild(this.path);
          }
          chooseO(){
            return Math.pow(Math.random(), 3);
          }
          createGraphic() {
            const path = new PIXI.Graphics();
            const small = unit * 0.5;
            const big = unit * 1.5;
            path.moveTo(-small, -big);
            path.lineTo(small, -big);
            path.lineTo(small, -small);
            path.lineTo(big, -small);
            path.lineTo(big, small);
            path.lineTo(small, small);
            path.lineTo(small, big);
            path.lineTo(-small, big);
            path.lineTo(-small, small);
            path.lineTo(-big, small);
            path.lineTo(-big, -small);
            path.lineTo(-small, -small);
      
            path.fill(new PIXI.Color(dominantColor).toArray());
            path.alpha = this.o;
      
            path.position.x = this.x;
            path.position.y = this.y;
            return path;
          }
          update() {
            if (hovered) {
              this.o += (this.fullo - this.o) * this.speed;
            } else {
              this.o += (this.origo - this.o) * this.speed;
            }
            this.path.alpha = this.o;
          }
        }
        function grid(x:number, y:number) {
          plusses.push(new Plus(x, y));
          plusses.push(new Plus(x + 2 * unit, y + 1 * unit));
          plusses.push(new Plus(x + 4 * unit, y + 2 * unit));
          plusses.push(new Plus(x + 1 * unit, y + 3 * unit));
          plusses.push(new Plus(x + 3 * unit, y + 4 * unit));
        }
        for (let x = 0; x < app.screen.width; x += unit * 5) {
          for (let y = 0; y < app.screen.height; y += unit * 5) {
            grid(x, y);
          }
        }
        app.ticker.add(() => {
          plusses.forEach((plus) => plus.update());
          if(frame % framesPerChange == 0) {
            const randomPlus = plusses[Math.floor(Math.random() * plusses.length)];
            randomPlus.fullo = randomPlus.chooseO()
          }
        });
      
        // EVENTS
        const projectContainer = app.canvas.closest(".project");
        if(projectContainer!== null) {
          projectContainer.addEventListener("mouseover", () => (hovered = true));
          projectContainer.addEventListener("mouseleave", () => (hovered = false));
        }
      })();
    }
  }, [imgURL,dominantColor]);

  return <div ref={containerRef}  />;
}
export default ImageReveal;