'use client';

import React, { useEffect, useState } from 'react';
import './AnimatedText.css';

interface AnimatedTextProps {
  text: string;
  interval?: number;
  loopTime?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  interval = 300,
  loopTime = 10000
}) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 1;
    let animationFrameId: any;

    const animateText = () => {
      setDisplayedText('');
      index = 1;
      const animate = () => {
        setDisplayedText(() => text.substring(0, index));
        index++;
        if (index < text.length) {
          animationFrameId = setTimeout(() => {
            requestAnimationFrame(animate);
          }, interval);
        }
      };
      animate();
    };

    animateText();
    const loopTimer = setInterval(animateText, loopTime);

    return () => {
      clearInterval(loopTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [text, interval, loopTime]);

  return <div className="animated-text">{displayedText}</div>;
};

export default AnimatedText;
