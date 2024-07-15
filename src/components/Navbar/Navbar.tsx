'use client';

import React, { useEffect, useState } from 'react';
import '@/components/Header/Header.css';
import LeftSidebar from '@/components/LeftSidebar/LeftSidebar';
import RightSidebar from '@/components/RightSidebar/RightSidebar';
import MobileNav from '@/components/MobileNav/MobileNav';

import './Navbar.css';

const Navbar: React.FC = () => {
  const [showPanels, setShowPanels] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if ((window.scrollY > 0) && (window.scrollY > lastScrollY)) {
        setShowPanels(false);
      } else {
        setShowPanels(true);
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`navbar ${!showPanels ? 'navbar--hide' : ''}`}>
      <LeftSidebar/>
      <RightSidebar/>
      <MobileNav/>
    </div>
  );
};

export default Navbar;
