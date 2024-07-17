import React from "react";
import Section from "@/components/Section/Section";
import SubPageHeader from "@/components/SubPageHeader/SubPageHeader";
import ProjectTile from "@/components/Projects/ProjectTile/ProjectTile";
import styles from "@/app/projects/projects.module.css";
import { Project, PROJECTS } from "@/components/Projects/model/projects.interface";

const Projects: React.FC = () => {
  const projects: Project[] = [...PROJECTS].reverse();

  return (
    <div>
      <SubPageHeader id="projects" title="Projects"></SubPageHeader>
      <Section id="summary">
        <div className={styles.projectsPage}>
          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (<ProjectTile key={index} project={project} />))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Projects;
