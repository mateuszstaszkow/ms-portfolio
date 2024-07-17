import React from "react";
import { Project } from "@/components/Projects/model/projects.interface";
import Section from "@/components/shared/Section/Section";
import styles from "@/app/projects/projects.module.css";
import ProjectTile from "@/components/Projects/ProjectTile/ProjectTile";

interface ProjectGridProps {
  id?: string;
  projects: Project[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ id = 'summary', projects }) => {
  return (
    <Section id={id}>
      <div className={styles.projectsPage}>
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (<ProjectTile key={index} project={project} />))}
        </div>
      </div>
    </Section>
  );
};

export default ProjectGrid;
