'use client'

import * as PIXI from "pixi.js"
import { useEffect, useRef } from "react";

// MAIN EL
type Props = {
  imgURL: string;
  dominantColor: string;
}
export function ImageReveal({}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      
      (async () => {
        
        // CONSTS
        const count = 300;
        const width = window.innerWidth;
        const height = width / 2;
        const dampingSlow = .5;
        const dampingQuick = .8;
        const sizeMag = .1

        // THINGS THAT CHANGE
        const words:Array<Word> = [];
        let dampingFactor = dampingQuick;
        const origin = {
          x: width * .5,
          y: height * .5
        }
        let mouseX = 0;
        let mouseY = 0;
        let active = false;
        let frame = 0;

        // INITIALISE APP
        const app = new PIXI.Application();
        await app.init({
          background: "red",
          width: width,
          height: height
        });
        container.appendChild(app.canvas);

        // CLASSES
        class Word {
          target: Word;
          x: number;
          y: number;
          path: PIXI.Graphics;
          
          constructor(target: Word) {
            this.target = target;
            
            this.x = target.x;
            this.y = target.y;

            const size = Math.min(width,height) * sizeMag;

            const path = new PIXI.Graphics();

            path.rect(-size*5, -size*1.25, size*10, size*2.5);
            path.fill("white");
            path.stroke({ width: 2, color: "black" });
            
            path.rect(-size*5, -size*1.25, size*10, size*2.5);
            path.fill("white");

            const text = new PIXI.Text({
              text: 'READ ARTICLE',
              style: {
                fontSize: size,
                fill: "red",
                align: 'center',
              }
            });

            text.x = -size*3.5;
            text.y = -size*.5;
            path.addChild(text)

      
            path.fill("red");
            
            path.position.x = this.x;
            path.position.y = this.y;
            this.path = path;
            app.stage.addChild(this.path);
          }
          update() {
            this.x += (this.target.x - this.x) * dampingFactor;
            this.path.position.x = this.x;
            this.y += (this.target.y - this.y) * dampingFactor;
            this.path.position.y = this.y;
          }
        }
      
        // SETUP
        for(let i = 0; i < count; i++) {
          const target: Word = i == 0 ? origin : words[i-1];
          words.push(new Word(target))
        }

        app.ticker.add(() => {
          if(active) {
            dampingFactor = dampingSlow;
            origin.x = mouseX;
            origin.y = mouseY; 
          } else {
            dampingFactor = dampingQuick;
            origin.x = width * .5;
            origin.y = height * .5; 
          }
          words.forEach(word=>{
            word.update()
          })
          frame++
        });

        // EVENTS
        const projectContainer = app.canvas.closest(".article");
        if(projectContainer!== null) {
          projectContainer.addEventListener("mouseover", () => (active = true));
          projectContainer.addEventListener("mouseleave", () => (active = false));
          projectContainer.addEventListener("mousemove", (e) => {
            const cx = e.clientX;
            const cy = e.clientY;
            const pos = projectContainer.getBoundingClientRect();
          
            const screenx = cx - pos.x;
            const screeny = cy - pos.y;
            
            const widthEl = pos.width;
            mouseX = (screenx / widthEl) * width;
            
            const heightEl = pos.height;
            mouseY = (screeny / heightEl) * height;

            // console.log(mouseX,mouseY)
          });
        }
      })();
    }
  }, []);

  return <div ref={containerRef}  />;
}
export default ImageReveal;