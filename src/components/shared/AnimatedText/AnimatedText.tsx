'use client';

import React, { useEffect, useState } from 'react';
import './AnimatedText.css';

interface AnimatedTextProps {
  text: string;
  interval?: number;
  loopTime?: number;
  initialPause?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  interval = 200,
  loopTime = 10000,
  initialPause = 1000
}) => {
  const [displayedText, setDisplayedText] = useState(text);

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
          setTimeout(() => {
            animationFrameId = requestAnimationFrame(animate);
          }, interval);
        }
      };
      animate();
    };

    setTimeout(() => animateText(), initialPause);
    const loopTimer = setInterval(animateText, loopTime);

    return () => {
      clearInterval(loopTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [text, interval, loopTime, initialPause]);

  return <div className="animated-text">{displayedText}</div>;
};

export default AnimatedText;
