'use client'

import * as PIXI from "pixi.js"
import { useEffect, useRef } from "react";

class Vector {
  x: number;
  y: number;
  constructor(x = 0,y = 0) {
    this.x = x;
    this.y = y;
  }
  add(vec:Vector) {
    this.x += vec.x;
    this.y += vec.y;
  }
}

// MAIN EL
type Props = {
  horzCount?: number;
  vertCount?: number;
};
export function Triangles({
  horzCount= 5,
  vertCount = 5
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      
      (async () => {
        
        // CONSTS
        const size = 100;
        const scale = .5;
        const diag = 1.4142135623730951;
        const diagReach = diag*size*scale;
        const width = horzCount * 100;
        const height = vertCount * 100;
        const accellLimit = .01;
        
        // THINGS THAT CHANGE
        let active = false;
        let frame = 0;

        // INITIALISE APP
        const app = new PIXI.Application();
        await app.init({
          background: "white",
          width: width,
          height: height
        });
        container.appendChild(app.canvas);
      
        // SETUP
        class Triangle {
          origAngle: number;
          angle: number;
          origPosition: Vector;
          position: Vector;
          velocity: Vector;
          accelleration: Vector;
          path: PIXI.Graphics;

          constructor(x:number,y:number) {
            this.origAngle = (Math.floor(Math.random()*4)/4) * (Math.PI * 2);
            this.origAngle += Math.PI * .25;
            this.angle = this.origAngle;
            
            this.origPosition = new Vector(x,y);
            this.position = new Vector(x,y);
            this.velocity = new Vector(0,0);
            this.accelleration = new Vector(0,0);
            this.path = this.createGraphic()
            app.stage.addChild(this.path);
          }
          createGraphic() {
            let path = new PIXI.Graphics();
            path.moveTo(0, 0);
            path.lineTo(0, -diagReach);
            path.lineTo(diagReach, 0);
            path.lineTo(0, diagReach);
            path.rotation = this.angle;
      
            path.fill("red");
      
            path.position.x = this.origPosition.x;
            path.position.y = this.origPosition.y;
            return path;
          }
          edges() {
            if(this.position.x > width+diagReach) {
              this.position.x = 0-diagReach;
            } else if(this.position.x < 0-diagReach) {
              this.position.x = width+diagReach;
            }
            if(this.position.y > height+diagReach) {
              this.position.y = 0-diagReach;
            } else if(this.position.y < 0-diagReach) {
              this.position.y = height+diagReach;
            }
          }
          update(){
            this.edges();

            if(active) {
              // accumulate acc
              this.accelleration.x = Math.cos(this.angle) * accellLimit;
              this.accelleration.y = Math.sin(this.angle) * accellLimit;
              // add forces
              this.velocity.add(this.accelleration);
              this.position.add(this.velocity);
            } else {
              const resetSpeed = .1;
              this.position.x += (this.origPosition.x - this.position.x)*resetSpeed;
              this.position.y += (this.origPosition.y - this.position.y)*resetSpeed;
              this.angle += (this.origAngle - this.angle)*resetSpeed;
              this.velocity = new Vector(0,0);
              this.accelleration = new Vector(0,0);
            }
            // apply to graphic
            this.path.position = this.position;
          }
        }

        const triangles:Array<Triangle> = [];
        for (let x = 0; x < width; x += size) {
          for (let y = 0; y < height; y += size) {
            triangles.push(new Triangle(x+size*.5,y+size*.5));
          }
        }

        app.ticker.add((time) => {
          triangles.forEach(triangle=>{
            triangle.update()
          })
          frame++
        });

        // EVENTS
        app.canvas.addEventListener("mouseover", () => (active = true));
        app.canvas.addEventListener("mouseleave", () => (active = false));
      })();
    }
  }, []);

  return <div ref={containerRef}  />;
}
export default Triangles;