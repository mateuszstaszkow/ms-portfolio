import React from 'react';
import './LeftSidebar.css';
import Link from 'next/link';
import { BASE_PATH } from "@/components/shared/utils/basePath";

const LeftSidebar: React.FC = () => {
  return (
    <div className="left-sidebar">
      <div className="sidebar-content">
        <Link href="/">
          <img src={`${BASE_PATH}/ms-logo.png`} alt="Logo" className="logo" />
        </Link>
      </div>
    </div>
  );
};

export default LeftSidebar;
