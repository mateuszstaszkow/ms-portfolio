import React from "react";
import { Project } from "@/components/Projects/model/projects.interface";
import SubPageHeader from "@/components/SubPageHeader/SubPageHeader";
import Section from "@/components/Section/Section";
import styles from "@/app/projects/projects.module.css";
import ProjectTile from "@/components/Projects/ProjectTile/ProjectTile";
import { PROJECTS } from "@/data/projects";

const Certificates: React.FC = () => {
  const projects: Project[] = [...PROJECTS]
    .reverse()
    .filter(project => project.isPublication);

  return (
    <div>
      <SubPageHeader id="publications" title="Publications"></SubPageHeader>
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

export default Certificates;
