import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import { ExperienceItem } from "./ExperienceItem";

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

/**
 * Component for "Experience" Slices.
 */
const Experience = ({ slice }: ExperienceProps) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mb-8"
    >
      <Heading as="h1">Experience</Heading>

      <ul className="flex flex-col gap-8">
        {slice.primary.experiences.map((item) => (
          <ExperienceItem
            key={item.institution}
            institution={item.institution}
            task={item.task}
            year={item.year}
            type={item.type}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Experience;
