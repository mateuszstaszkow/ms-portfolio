'use client';

import RightSidebar from '@/components/RightSidebar/RightSidebar';
import React, { useState } from 'react';
import './MobileNav.css';
import { Close, Menu } from '@mui/icons-material';

const MobileNav: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const toggleMenu = () => {
    if (menuOpen) {
      setIsClosing(true);
      setMenuOpen(false);
      setTimeout(() => {
        setIsClosing(false);
      }, 300); // Match this duration with the CSS animation duration
    } else {
      setMenuOpen(true);
    }
  };

  return (
    <div className="mobile-nav lg:hidden">
      <Menu onClick={toggleMenu} className="hamburger-icon" />
      {(menuOpen || isClosing) && (
        <div className="overlay">
          <div
            className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : 'mobile-menu--close'}`}
          >
            <Close onClick={toggleMenu} className="close-icon" />
            <RightSidebar />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
