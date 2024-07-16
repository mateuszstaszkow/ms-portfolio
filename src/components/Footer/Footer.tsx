import React from 'react';
import styles from './Footer.module.css';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "@mui/icons-material";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialIcons}>
        <a href="https://www.linkedin.com/in/mateusz-staszk%C3%B3w-4bb952121/" target="_blank"
           rel="noopener noreferrer">
          <FaLinkedin className={styles.icon}/>
        </a>
        <a href="https://github.com/mateuszstaszkow" target="_blank" rel="noopener noreferrer">
          <FaGithub className={styles.icon}/>
        </a>
        <a href="mailto:mateuszstasz@gmail.com">
          <Mail className={styles.icon}/>
        </a>
      </div>
      <div>Copyright © 2024 Mateusz Staszkow</div>
      <div className="text-gray-300 text-sm mt-2">
        Design inspired by
        <a href="https://www.wenxinwendyju.com/" target="_blank" rel="noopener noreferrer" className="ms-1 underline">
          Wendy Ju
        </a>
      </div>
    </footer>
  );
};

export default Footer;
