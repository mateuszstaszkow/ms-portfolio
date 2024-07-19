import React from "react";
import { Project } from "@/components/Projects/model/projects.interface";
import SubPageHeader from "@/components/shared/SubPageHeader/SubPageHeader";
import { CERTIFICATES } from "@/data/certificates";
import ProjectGrid from "@/components/Projects/ProjectGrid/ProjectGrid";

const Certificates: React.FC = () => {
  const projects: Project[] = [...CERTIFICATES].reverse();

  return (
    <div>
      <SubPageHeader id="certificates" title="Certificates" label={`${projects.length} certificates`}>
      </SubPageHeader>
      <ProjectGrid projects={projects}></ProjectGrid>
    </div>
  );
};

export default Certificates;
