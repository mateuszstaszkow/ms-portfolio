import React from 'react';
import './LeftSidebar.css';
import Link from 'next/link';

const LeftSidebar: React.FC = () => {
  const basePath = process.env.NODE_ENV === 'production' ? '/ms-portfolio' : '';
  return (
    <div className="left-sidebar">
      <div className="sidebar-content">
        <Link href="/">
          <img src={`${basePath}/ms-logo.png`} alt="Logo" className="logo" />
        </Link>
      </div>
    </div>
  );
};

export default LeftSidebar;
