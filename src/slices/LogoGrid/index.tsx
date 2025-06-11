import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import Heading from "@/components/Heading";
import { components } from "@/richTextComponents";

/**
 * Props for `LogoGrid`.
 */
export type LogoGridProps = SliceComponentProps<Content.LogoGridSlice>;

/**
 * Component for "LogoGrid" Slices.
 */
const LogoGrid = ({ slice }: LogoGridProps) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mb-8 md:mb-12"
    >
      {isFilled.richText(slice.primary.title) && (
        <Heading as="h2">
          <PrismicText field={slice.primary.title} />
        </Heading>
      )}

      {isFilled.richText(slice.primary.description) && (
        <div className="mb-8">
          <PrismicRichText
            field={slice.primary.description}
            components={components}
          />
        </div>
      )}

      {isFilled.group(slice.primary.logos) && (
        <div className="grid grid-cols-2 gap-18 sm:grid-cols-3 md:grid-cols-4">
          {slice.primary.logos.map((item, index) => (
            <div
              key={`logo-${index}-${item.logo_image.url}`}
              className="flex items-center justify-center"
            >
              {isFilled.image(item.logo_image) && (
                <PrismicNextImage
                  field={item.logo_image}
                  className="max-h-24 w-auto object-contain"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default LogoGrid;
