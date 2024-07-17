import React from 'react';
import './RightSidebar.css';
import Link from 'next/link';
import ContactOptions from "@/components/shared/ContactOptions/ContactOptions";
import { BASE_PATH } from "@/components/shared/utils/basePath";

const RightSidebar: React.FC = () => {
  return (
    <div className="right-sidebar">
      <div className="sidebar-content">
        <Link className="navigation-item" href="/">
          EXPERIENCE
        </Link>
        <a href={`${BASE_PATH}/mateusz-staszkow-cv.pdf`} target="_blank" className="navigation-item">
          RESUME
        </a>
        <Link className="navigation-item" href="/projects">
          PROJECTS
        </Link>
        <Link className="navigation-item" href="/certificates">
          CERTIFICATES
        </Link>
        <Link className="navigation-item" href="/publications">
          PUBLICATIONS
        </Link>
        <a href="https://justjoin.it/blog/kultura-pracy-w-szwajcarii-jest-zroznicowana/" target="_blank" className="navigation-item">
          INTERVIEWS
        </a>
        <a href="https://www.youtube.com/watch?v=JiDVGROMxqQ" target="_blank" className="navigation-item">
          MSD APARTMENTS
        </a>
        {/*TODO*/}
        {/*<div className="navigation-item">ABOUT</div>*/}
        {/*<div className="navigation-item">REFERENCES</div>*/}
        <div className="navigation-item contact-options pt-4">
          <ContactOptions></ContactOptions>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
