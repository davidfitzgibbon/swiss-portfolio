import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";

/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

/**
 * Component for "Biography" Slices.
 */
const Biography = ({ slice }: BiographyProps): JSX.Element => {
  return (
    <div className="layout mb-8">
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="mb-6"
      >
        <Heading as="h2">Biography</Heading>
        <div className="grid grid-cols-[1fr_1fr] gap-4">
          <PrismicNextImage field={slice.primary.portrait} />
          <PrismicRichText field={slice.primary.description} />
        </div>
          
      </section>
    </div>
  );
};

export default Biography;
