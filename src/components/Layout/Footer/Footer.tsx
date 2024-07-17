import React from 'react';
import styles from './Footer.module.css';
import ContactOptions from "@/components/shared/ContactOptions/ContactOptions";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <ContactOptions></ContactOptions>
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
