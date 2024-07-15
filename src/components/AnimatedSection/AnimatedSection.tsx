'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './AnimatedSection.module.css';
import { ArrowForward } from "@mui/icons-material";
import Flag from 'react-world-flags';

interface AnimatedSectionProps {
  company: string;
  companyUrl: string;
  countryCode: string;
  description: string;
  imageUrl: string;
  isLeft?: boolean;
  role: string;
  technologies: string;
  textWidth?: string; // Tailwind css
  imageWidth?: string; // Tailwind css
}

const AnimatedSection: React.FC<AnimatedSectionProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setIsVisible(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`${styles.section} flex-col-reverse ${props.isLeft ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
      <div className={`w-full ${props.textWidth ? props.textWidth : 'lg:w-1/4'} mb-8 mt-16 lg:mt-auto ${props.isLeft ? 'lg:ms-8' : 'lg:me-8'}`}>
        <div>
          <div className="flex gap-2">
            <Flag code={props.countryCode} alt="Flag" className={`${props.countryCode === 'CH' ? 'w-6' : 'w-8'}`}/>
            <h2>{props.company}</h2>
          </div>
          <div className="text-gray-500 text-sm">{props.role?.toUpperCase()}</div>
          <div className="mt-6">{props.description}</div>
          <div className="mb-4 text-gray-500 text-sm mt-1">{props.technologies?.toUpperCase()}</div>
          <a href={props.companyUrl} className="font-bold hover:text-gray-500" target="_blank">
            View Project
            <ArrowForward className="text-accent ms-1"></ArrowForward>
          </a>
        </div>
      </div>
      <div
        className={`${styles.imageContainer} ${isVisible ? styles.visible : ''} w-full ${props.textWidth ? props.imageWidth : 'lg:w-3/4'}`}
        ref={ref}
      >
        <a href={props.companyUrl} target="_blank">
          <img
            src={props.imageUrl}
            alt="Aktionariat"
            className={styles.image}
          />
        </a>
      </div>
    </div>
  );
};

export default AnimatedSection;
