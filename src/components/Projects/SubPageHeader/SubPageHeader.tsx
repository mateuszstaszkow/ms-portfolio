import React from "react";
import Section from "@/components/Section/Section";
import AnimatedText from "@/components/AnimatedText/AnimatedText";
import { ArrowDownward } from "@mui/icons-material";
import styles from './SubPageHeader.module.css';

const SubPageHeader: React.FC = () => {
  return (
    <Section id="projects">
      <div className="w-full text-center">
        <div className={`header-container ${styles.headerContainer__subpage}`}>
          <AnimatedText text="Projects"/>
        </div>
        <div className={`${styles.iconDown}`}>
          <ArrowDownward className={styles.iconDown__icon}></ArrowDownward>
        </div>
        <div className={`${styles.iconDown}`}>
          <ArrowDownward className={styles.iconDown__icon}></ArrowDownward>
        </div>
        <div className={`${styles.iconDown}`}>
          <ArrowDownward className={styles.iconDown__icon}></ArrowDownward>
        </div>
      </div>
    </Section>
  );
};

export default SubPageHeader;
