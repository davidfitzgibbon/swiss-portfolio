import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { components } from "@/richTextComponents";

/**
 * Props for `TextBlock`.
 */
export type TextProps = SliceComponentProps<Content.TextSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock = ({ slice }: TextProps) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.text} components={components} />
    </section>
  );
};

export default TextBlock;
