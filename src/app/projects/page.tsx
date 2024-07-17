import React from "react";
import SubPageHeader from "@/components/shared/SubPageHeader/SubPageHeader";
import { Project } from "@/components/Projects/model/projects.interface";
import { PROJECTS } from "@/data/projects";
import ProjectGrid from "@/components/Projects/ProjectGrid/ProjectGrid";

const Projects: React.FC = () => {
  const projects: Project[] = [...PROJECTS].reverse();

  return (
    <div>
      <SubPageHeader id="projects" title="Projects"></SubPageHeader>
      <ProjectGrid projects={projects}></ProjectGrid>
    </div>
  );
};

export default Projects;
