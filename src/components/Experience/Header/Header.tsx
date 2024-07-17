'use client';

import React from 'react';
import './Header.css';
import AnimatedText from '@/components/shared/AnimatedText/AnimatedText';
import { Devices, PrecisionManufacturing, Science } from '@mui/icons-material';

const Header: React.FC = () => {
  return (
    <>
      <div className="header-container">
        <AnimatedText text="Mateusz Staszkow" />
      </div>
      <div className="skill-container grid grid-cols-1 lg:grid-cols-3 border-t-0 lg:border-t">
        <div className="skill">
          <div className="skill-content">
            <Devices className="icon" />
            <div>Full Stack Web Dev</div>
            <div className="skill__description hidden lg:block">
              <div>React | Angular | Vue</div>
              <div>Spring | Nest | Gorilla</div>
              <div>AWS | GCP | Azure</div>
              <div>Web3 | ETH | WC</div>
              <div>SQL | NoSQL</div>
            </div>
          </div>
        </div>
        <div className="skill border-x-0 lg:border-x">
          <div className="skill-content">
            <Science className="icon"/>
            <div>AI & ML Publications</div>
            <div className="skill__description hidden lg:block">
              <div>NLP | AI | ML</div>
              <div>IEEE | LREC | MDPI</div>
              <div>Scikit | Tensorflow</div>
            </div>
          </div>
        </div>
        <div className="skill">
          <div className="skill-content">
            <PrecisionManufacturing className="icon"/>
            <div>IoT & Robotics</div>
            <div className="skill__description hidden lg:block">
              <div>C | C++ | Assembler</div>
              <div>Arduino | AVR | STM32</div>
              <div>KNX | LOXONE | KRL</div>
              <div>Matlab | Simulink</div>
              <div>ANTLR | LLVM</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
