"use client";

import { useGSAP } from "@gsap/react";
import "@pixi/events";
import { extend, useTick } from "@pixi/react";
import gsap from "gsap";
import { Container, Graphics } from "pixi.js";
import { useCallback, useState } from "react";

gsap.registerPlugin(useGSAP);

extend({ Container, Graphics });

function getRandomAngle() {
  return Math.floor(Math.random() * 4) * (Math.PI * 0.5);
}

// TRIANGLE
type Triangle = {
  x: number;
  y: number;
  size: number;
  startAngle: number;
  delay: number;
};
const Triangle = ({
  x = 0,
  y = 0,
  size = 100,
  startAngle = 1,
  delay = 1,
}: Triangle) => {
  const [targetAngle, setTargetAngle] = useState(startAngle);
  const [angle, setAngle] = useState(targetAngle);
  const [alpha, setAlpha] = useState(0);

  const pos = { x, y };

  const drawCallback = useCallback(
    (graphics: {
      clear: () => void;
      setFillStyle: (arg0: { color: string }) => void;
      moveTo: (arg0: number, arg1: number) => void;
      lineTo: (arg0: number, arg1: number) => void;
      rotation: number;
      fill: (arg0: string) => void;
    }) => {
      graphics.clear();
      graphics.setFillStyle({ color: "red" });
      graphics.moveTo(0, 0);
      graphics.lineTo(-size * 0.5, -size * 0.5);
      graphics.lineTo(size * 0.5, -size * 0.5);
      graphics.lineTo(size * 0.5, size * 0.5);
      graphics.lineTo(0, 0);
      graphics.rotation = angle;

      graphics.fill("red");
    },
    [angle, size],
  );

  useGSAP(() => {
    const dur = 0.5;
    // OBJ
    const gsapObj = {
      alpha: 0,
    };
    // TIMELINE
    const tl = gsap.timeline({
      duration: dur,
    });
    // ANIMATIONS
    tl.to(gsapObj, {
      delay: delay,
      alpha: 1,
      onUpdate: () => {
        setAlpha(gsapObj.alpha);
      },
    });
    tl.to(gsapObj, {
      delay: 2,
      onComplete: () => {
        changeAngle();
      },
    });
  });

  useTick(() => {
    setAngle(angle - (angle - targetAngle) * 0.1);
  });

  function changeAngle() {
    setTargetAngle((getRandomAngle() - Math.PI) * 2);
  }

  return (
    <pixiGraphics
      draw={drawCallback}
      position={pos}
      rotation={angle}
      alpha={alpha}
      onMouseOver={changeAngle}
      interactive={true}
    />
  );
};

export default Triangle;
