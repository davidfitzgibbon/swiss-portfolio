import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

type TechItemProps = {
  name: string | null;
  effectiveness: string | null;
};

export default function TechItem({ name, effectiveness }: TechItemProps) {
  const triangles = [];
  for (let i = 1; i <= 5; i++) {
    triangles.push(i < Number(effectiveness) ? true : false);
  }
  const container = useRef<HTMLLIElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          // markers: true,
          start: "50px bottom",
        },
      });

      tl.to("h3,svg", {
        easing: "power3.out",
        x: 0,
        stagger: 0.1,
      });
    },
    { scope: container },
  );

  return (
    <li className="col-span-2 grid grid-cols-subgrid" ref={container}>
      <div className="overflow-hidden">
        <h3 className="translate-x-[150px] text-right font-black text-4xl">
          {name}
        </h3>
      </div>
      <div className="flex gap-2 self-center overflow-hidden fill-red">
        {triangles.map((triangle, i) => (
          <svg
            viewBox="0 0 284 284"
            key={i}
            className="size-4 -translate-x-[150px]"
          >
            {triangle && <path d="M283 142 0 283V0l283 142Z" />}
            <path d="M283 142 0 283V0l283 142Zm-20 0L9 15v254l254-127Z" />
          </svg>
        ))}
      </div>
    </li>
  );
}
