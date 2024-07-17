import { motion } from 'framer-motion';
import React from 'react';

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial="hidden"
    animate="enter"
    exit="exit"
    variants={variants}
    transition={{ duration: 1 }}
    style={{ position: 'relative' }}
  >
    {children}
  </motion.div>
);

export default PageTransition;
