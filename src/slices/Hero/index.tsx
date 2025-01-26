import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/components/Bounded";
import { Triangles } from "@/components/Triangles";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=""
    >
      <div className="leading-none uppercase text-center">
        <h1 className="text-red text-6xl font-bold">
          {slice.primary.startname}
        </h1>
        <h1 className="text-black text-9xl font-boldNarrow">
          {slice.primary.endname}
        </h1>
      </div>
      
      <Triangles horzCount={slice.primary.horzcount} vertCount={slice.primary.vertcount} />
      <h2 className="uppercase leading-none font-regular text-4xl text-center my-4">{slice.primary.title}</h2>
      <p className="text-red">{slice.primary.description}</p>
    </Bounded>
  );
};

export default Hero;
