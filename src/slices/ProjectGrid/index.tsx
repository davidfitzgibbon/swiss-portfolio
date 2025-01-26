import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Project } from "./Project";
import List from "@/components/List";

/**
 * Props for `ProjectGrid`.
 */
export type ProjectGridProps = SliceComponentProps<Content.ProjectGridSlice>;

/**
 * Component for "ProjectGrid" Slices.
 */
const ProjectGrid = ({ slice }: ProjectGridProps): JSX.Element => {
  return (
    <List title={slice.primary.title}>
      {slice.primary.project.map(({project}) => (
        isFilled.contentRelationship(project) && (
          <Project
            key={project.id}
            id={project.id}
          />
        )
      ))}
    </List>
  );
};

export default ProjectGrid;
