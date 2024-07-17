import React from 'react';
import './LeftSidebar.css';
import Link from 'next/link';

const LeftSidebar: React.FC = () => {
  return (
    <div className="left-sidebar">
      <div className="sidebar-content">
        <Link href="/">
          <img src={`ms-logo.png`} alt="Logo" className="logo" />
        </Link>
      </div>
    </div>
  );
};

export default LeftSidebar;
