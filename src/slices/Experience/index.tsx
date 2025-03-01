import ExperienceItem from "@/components/ExperienceItem";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";

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
      <Heading as="h2">Experience</Heading>
      {slice.primary.experiences.map((item) => (
        <ExperienceItem key={item.institution} institution={item.institution} task={item.task} year={item.year} type={item.type} />
      ))}
    </ul>
  );
};

export default Experience;
