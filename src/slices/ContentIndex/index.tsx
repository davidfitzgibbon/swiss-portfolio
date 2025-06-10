import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import { createClient } from "@/prismicio";
import { Item } from "./Item";

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = async ({ slice }: ContentIndexProps) => {
  const client = createClient();
  const posts =
    slice.primary.content_type == "Blog"
      ? await client.getAllByType("blog_post")
      : await client.getAllByType("project_post");

  return (
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

      <ul className="mt-8 flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Item
              document={post}
              title={post.data.title}
              viewMoreText={slice.primary.view_more_text}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ContentIndex;
