import React from 'react';
import './RightSidebar.css';

const RightSidebar: React.FC = () => {
  return (
    <div className="right-sidebar">
      <div className="sidebar-content">
        <div className="navigation-item">EXPERIENCE</div>
        <div className="navigation-item">RESUME</div>
        <div className="navigation-item">PROJECTS</div>
        <div className="navigation-item">PUBLICATIONS</div>
        <div className="navigation-item">MSD APARTMENTS</div>
        <div className="navigation-item">ABOUT</div>
        <div className="navigation-item">CONTACT</div>
      </div>
    </div>
  );
};

export default RightSidebar;
