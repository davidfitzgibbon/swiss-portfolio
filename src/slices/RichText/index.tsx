import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TextBlock`.
 */
export type TextProps = SliceComponentProps<Content.RichTextSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock = ({ slice }: TextProps) => {
  return (
    <div className="prose-zinc prose prose-heading:text-black prose-p:text-black prose-li:text-black mx-auto mt-20">
      <PrismicRichText field={slice.primary.richtext} />
    </div>
  );
};

export default TextBlock;
