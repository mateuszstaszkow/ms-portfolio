'use client';

import React from 'react';
import './header.css';
import AnimatedText from '@/components/AnimatedText/AnimatedText';
import { Devices, PrecisionManufacturing, Science } from '@mui/icons-material';

const Header: React.FC = () => {
  return (
    <>
      <div className="header-container">
        <AnimatedText text="Mateusz Staszkow" />
      </div>
      <div className="skill-container grid grid-cols-3">
        <div className="skill">
          <div className="skill-content">
            <Devices className="icon" />
            <div>Full Stack Web Dev</div>
          </div>
        </div>
        <div className="skill border-x">
          <div className="skill-content">
            <Science className="icon" />
            <div>AI & ML Publications</div>
          </div>
        </div>
        <div className="skill">
          <div className="skill-content">
            <PrecisionManufacturing className="icon" />
            <div>IoT & Robots</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
