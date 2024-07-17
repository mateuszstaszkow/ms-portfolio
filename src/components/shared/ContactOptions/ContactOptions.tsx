import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "@mui/icons-material";
import React from "react";

import styles from "./ContactOptions.module.css";

const ContactOptions: React.FC = () => {
  return (
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
  );
};

export default ContactOptions;
