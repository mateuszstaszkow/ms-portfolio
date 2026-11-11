import React from "react";
import { Project } from "@/components/Projects/model/projects.interface";
import SubPageHeader from "@/components/shared/SubPageHeader/SubPageHeader";
import { PROJECTS } from "@/data/projects";
import ProjectGrid from "@/components/Projects/ProjectGrid/ProjectGrid";

const Certificates: React.FC = () => {
  const projects: Project[] = [...PROJECTS]
    .reverse()
    .filter(project => project.isPublication);

  return (
    <div>
      <SubPageHeader id="publications" title="Publications" label={`${projects.length} scientific publications`}>
      </SubPageHeader>
      <ProjectGrid projects={projects}></ProjectGrid>
    </div>
  );
};

export default Certificates;
