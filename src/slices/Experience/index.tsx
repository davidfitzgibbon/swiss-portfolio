import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";
import ExperienceItem from "./ExperienceItem";

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

/**
 * Component for "Experience" Slices.
 */
const Experience = ({ slice }: ExperienceProps): JSX.Element => {
  return (
    <ul
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="layout mb-8"
    >
      <Heading as="h1">Experience</Heading>
      {slice.primary.experiences.map((item,i) => (
        <ExperienceItem 
        key={i} 
        institution={item.institution} 
        task={item.task} 
        year={item.year} 
        type={item.type} 
        description={item.description} />
      ))}
    </ul>
  );
};

export default Experience;
