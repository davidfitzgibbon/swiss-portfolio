import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import { components } from "@/richTextComponents";

/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

/**
 * Component for "Biography" Slices.
 */
const Biography = ({ slice }: BiographyProps) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mb-8 md:mb-12"
    >
      <Heading as="h1">Biography</Heading>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        <PrismicNextImage field={slice.primary.portrait} />
        <div>
          <PrismicRichText
            field={slice.primary.description}
            components={components}
          />
        </div>
      </div>
    </section>
  );
};

export default Biography;
