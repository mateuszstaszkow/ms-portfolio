import React from "react";
import SubPageHeader from "@/components/Projects/SubPageHeader/SubPageHeader";
import Section from "@/components/Section/Section";

const Projects: React.FC = () => {
  return (
    <main>
      <SubPageHeader id="projects" title="Projects"></SubPageHeader>
      <Section id="summary">
        <div>pictures</div>
      </Section>
    </main>
  );
};

export default Projects;
