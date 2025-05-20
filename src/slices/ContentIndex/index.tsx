import Heading from "@/components/Heading";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import ContentList from "./ContentList";
import { JSX } from "react";
import { createClient } from "@/prismicio";

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = async ({
  slice,
}: ContentIndexProps): Promise<JSX.Element> => {
  const client = createClient();
  const blogposts = await client.getAllByType("blog_post");
  const projects = await client.getAllByType("project_post");

  const items = slice.primary.content_type == "Blog" ? blogposts : projects;

  return (
    <div className="layout">
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <Heading>{slice.primary.heading}</Heading>
        {isFilled.richText(slice.primary.description) && (
          <div>
            <PrismicRichText field={slice.primary.description} />
          </div>
        )}

        <ContentList
          items={items}
          contentType={slice.primary.content_type}
          viewMoreText={slice.primary.view_more_text}
        />
      </section>
    </div>
  );
};

export default ContentIndex;
