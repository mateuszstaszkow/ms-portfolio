import React from 'react';
import AnimatedSection from '@/components/AnimatedSection/AnimatedSection';
import Section from "@/components/Section/Section";

const Experience: React.FC = () => {
  return (
    <>
      <Section id="aktionariat">
        <AnimatedSection
          company="Aktionariat"
          companyUrl="https://www.aktionariat.com/our-products/corporate-dashboard#details"
          countryCode="CHE"
          description="Solely design, build and deliver the whole project in the Crypto world for the renown startup in Zurich."
          imageUrl="/aktionariat.webp"
          role="Corporate Dashboard 1 man army full stack development"
          technologies="Angular | Spring | Web3 | GH"
        ></AnimatedSection>
      </Section>
      <Section id="mobiliar">
        <AnimatedSection
          company="die Mobiliar"
          companyUrl="https://mobiliar.ch/"
          countryCode="CHE"
          description="Exclusive full stack responsibility for several applications from the project portfolio of the great Swiss Insurance Company in the Vaud office."
          imageUrl="/mobiliar.jpg"
          isLeft={true}
          role="Project portfolio full stack development"
          technologies="Angular | Spring | Tensorflow | Kubernetes"
        ></AnimatedSection>
      </Section>
    </>
  );
};

export default Experience;
