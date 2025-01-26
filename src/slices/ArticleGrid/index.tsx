import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Article } from "./Article";
import List from "@/components/List";

/**
 * Props for `ArticleGrid`.
 */
export type ArticleGridProps = SliceComponentProps<Content.ArticleGridSlice>;

/**
 * Component for "ArticleGrid" Slices.
 */
const ArticleGrid = ({ slice }: ArticleGridProps): JSX.Element => {
  return (
    <List title={slice.primary.title}>
      {slice.primary.articles.map(({article}) => (
        isFilled.contentRelationship(article) && (
          <Article
            key={article.id}
            id={article.id}
          />
        )
      ))}
    </List>
  );
};

export default ArticleGrid;
