import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { components } from "@/richTextComponents";

/**
 * Props for `TextBlock`.
 */
export type TextProps = SliceComponentProps<Content.RichTextSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock = ({ slice }: TextProps) => {
  return (
    <div className="prose mx-auto mt-20">
      <PrismicRichText field={slice.primary.richtext} />
    </div>
  );
};

export default TextBlock;
