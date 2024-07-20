import React from 'react';
import SubPageHeader from '@/components/shared/SubPageHeader/SubPageHeader';
import { Project } from '@/components/Projects/model/projects.interface';
import { PROJECTS } from '@/data/projects';
import ProjectGrid from '@/components/Projects/ProjectGrid/ProjectGrid';

const AVERAGE_DAYS_IN_MONTH: number = 30.437;
const MILLISECONDS_IN_MONTH: number = 1000 * 3600 * 24 * AVERAGE_DAYS_IN_MONTH;

const Projects: React.FC = () => {
  const mapToDate = (date: string, day?: number): Date => {
    const parts: string[] = date.split('/');
    const month: string = parts[0];
    const year: string = parts[1];
    return new Date(`${year}-${month}${day ? `-${day}` : ''}`);
  };

  const getLastTimestamp = (project: Project): number => {
    const dates: string[] = project.dates.split(' ');
    return mapToDate(dates.at(-1) as string).getTime();
  };

  const getMonthsDifference = (project: Project): string => {
    const dates: string[] = project.dates.split(' ');
    if (dates.length === 1) {
      return '';
    }
    const firstDate = mapToDate(dates[0]);
    const lastDate = mapToDate(dates.at(-1) as string, 28);
    const differenceMs = lastDate.getTime() - firstDate.getTime();
    const differenceMonths = Math.ceil(differenceMs / MILLISECONDS_IN_MONTH);
    const differenceMonthString = `${differenceMonths % 12} month${differenceMonths >= 2 ? 's' : ''}`;
    if (differenceMonths > 12) {
      return `${Math.floor(differenceMonths / 12)} year${differenceMonths >= 2 ? 's' : ''} ${differenceMonthString}`;
    } else {
      return differenceMonthString;
    }
  };

  const projects: Project[] = [...PROJECTS]
    .reverse()
    .sort((a, b) => getLastTimestamp(b) - getLastTimestamp(a))
    .map((project) => ({
      ...project,
      monthsDifference: getMonthsDifference(project)
    }));

  return (
    <div>
      <SubPageHeader
        id="projects"
        title="Projects"
        label={`${projects.length} commercial & private projects`}
      ></SubPageHeader>
      <ProjectGrid projects={projects}></ProjectGrid>
    </div>
  );
};

export default Projects;
