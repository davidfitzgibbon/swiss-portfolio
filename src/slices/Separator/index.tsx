import { Separator } from "@/components/Separator";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";

/**
 * Props for `Separator`.
 */
export type SeparatorProps = SliceComponentProps<Content.SeparatorSlice>;

/**
 * Component for "Separator" Slices.
 */
const SeparatorSlice = (): JSX.Element => {
  return (
    <Separator />
  );
};

export default SeparatorSlice;
