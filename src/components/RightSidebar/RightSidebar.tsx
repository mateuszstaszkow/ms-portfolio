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
        <a
          href="/mateusz-staszkow-cv.pdf"
          target="_blank"
          className="navigation-item"
        >
          RESUME
        </a>
        <div className="navigation-item">PROJECTS</div>
        <div className="navigation-item">CERTIFICATES</div>
        <div className="navigation-item">PUBLICATIONS</div>
        <div className="navigation-item">INTERVIEWS</div>
        <div className="navigation-item">MSD APARTMENTS</div>
        <div className="navigation-item">ABOUT</div>
        <div className="navigation-item">CONTACT</div>
      </div>
    </div>
  );
};

export default RightSidebar;
