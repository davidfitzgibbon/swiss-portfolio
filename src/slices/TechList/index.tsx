"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import TechItem from "./TechItem";

/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList = ({ slice }: TechListProps) => {
  return (
    <div
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mb-8 md:mb-12"
    >
      <Heading as="h2">Skills</Heading>

      <ul className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-8">
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
