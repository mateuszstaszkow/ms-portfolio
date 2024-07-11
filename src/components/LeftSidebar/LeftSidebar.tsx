import React from 'react';
import './LeftSidebar.css';
import Link from 'next/link';

const LeftSidebar: React.FC = () => {
  return (
    <div className="left-sidebar">
      <Link href="/">
        <img src="/ms-logo.png" alt="Logo" className="logo" />
      </Link>
    </div>
  );
};

export default LeftSidebar;
