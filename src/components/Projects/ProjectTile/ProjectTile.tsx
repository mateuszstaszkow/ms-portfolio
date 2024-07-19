import React from 'react';
import styles from './ProjectTile.module.css';
import { Project } from "@/components/Projects/model/projects.interface";
import Flag from "react-world-flags";

const ProjectTile: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className={`${styles.projectTile} ${(project.important ? styles.projectTileImportant : '')}`}>
      <div className="italic">{project.title}</div>
      <div className="flex gap-2 justify-center align-top">
        <Flag code={project.countryCode} alt="Flag" className={`h-10 ${project.countryCode === 'CH' ? 'w-6' : 'w-8'}`}/>
        <div className="my-2 font-bold">{project.place}</div>
      </div>
      <div className="text-gray-500">
        {project.teamCount ? `${project.teamCount} participants` : '1 participant'}
      </div>
      <div>{project.dates}</div>
      <div className="text-sm text-gray-500">{project.monthsDifference ? `(${project.monthsDifference})` : ''}</div>
      <div className="mt-2 text-gray-500">{project.technologies}</div>
    </div>
  );
};

export default ProjectTile;
