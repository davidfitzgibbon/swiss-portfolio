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
        <Heading as="h1">Biography</Heading>
        <div className="grid sm:grid-cols-[1fr_1fr] grid-cols-[1fr] gap-4">
          <PrismicNextImage field={slice.primary.portrait} />
          <div className="prose lg:prose-xl">
            <PrismicRichText field={slice.primary.description} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Biography;
