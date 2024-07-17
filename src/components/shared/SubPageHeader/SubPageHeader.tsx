import React from "react";
import Section from "@/components/shared/Section/Section";
import AnimatedText from "@/components/shared/AnimatedText/AnimatedText";
import { ArrowDownward } from "@mui/icons-material";
import styles from './SubPageHeader.module.css';

interface SubPageHeaderProps {
  id: string;
  title: string;
}

const SubPageHeader: React.FC<SubPageHeaderProps> = ({ id, title}) => {
  return (
    <Section id={ id }>
      <div className="w-full text-center">
        <div className={`header-container ${styles.headerContainer__subpage}`}>
          <AnimatedText text={ title }/>
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
