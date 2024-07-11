import React from 'react';
import './LeftSidebar.css';
import Link from 'next/link';

const LeftSidebar: React.FC = () => {
  const basePath = process.env.NODE_ENV === 'production' ? '/ms-portfolio' : '';
  return (
    <div className="left-sidebar">
      <Link href="/">
        <img src={`${basePath}/logo.png`} alt="Logo" className="logo" />
      </Link>
    </div>
  );
};

export default LeftSidebar;
