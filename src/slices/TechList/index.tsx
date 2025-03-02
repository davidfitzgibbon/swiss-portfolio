"use client"

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";
import Heading from "@/components/Heading";
import TechItem from "./TechItem";

/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList = ({ slice }: TechListProps): JSX.Element => {


  return (
    <div className="layout mb-8">
      <Heading as="h2">Skills</Heading>
      <ul
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="w-[min-content]"
      >
        {slice.primary.tech.map((item) => (
          <TechItem 
            key={item.name}
            name={item.name}
            effectiveness={item.effectiveness}
          />
        ))}
      </ul>
    </div>
  );
};

export default TechList;
