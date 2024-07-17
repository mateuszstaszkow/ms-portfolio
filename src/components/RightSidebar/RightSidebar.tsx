import React from 'react';
import './RightSidebar.css';
import Link from 'next/link';

const RightSidebar: React.FC = () => {
  return (
    <div className="right-sidebar">
      <div className="sidebar-content">
        <Link className="navigation-item" href="/">
          EXPERIENCE
        </Link>
        <a href="/mateusz-staszkow-cv.pdf" target="_blank" className="navigation-item">
          RESUME
        </a>
        <Link className="navigation-item" href="/projects">
          PROJECTS
        </Link>
        <div className="navigation-item">CERTIFICATES</div>
        <Link className="navigation-item" href="/publications">
          PUBLICATIONS
        </Link>
        <div className="navigation-item">INTERVIEWS</div>
        <a href="https://www.youtube.com/watch?v=JiDVGROMxqQ" target="_blank" className="navigation-item">
          MSD APARTMENTS
        </a>
        <div className="navigation-item">ABOUT</div>
        <div className="navigation-item">CONTACT</div>
      </div>
    </div>
  );
};

export default RightSidebar;
