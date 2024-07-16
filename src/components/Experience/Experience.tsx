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
          countryCode="CH"
          description="Solely design, build and deliver the whole project in the Crypto world for the renown startup in Zurich."
          imageUrl="aktionariat.webp"
          role="Corporate Dashboard 1 man army full stack development"
          technologies="Angular | Spring | Web3 | GH"
        ></AnimatedSection>
      </Section>
      <Section id="mobiliar">
        <AnimatedSection
          company="die Mobiliar"
          companyUrl="https://mobiliar.ch/"
          countryCode="CH"
          description="Exclusive full stack responsibility for several applications from the life insurances project portfolio of the great Swiss insurance company in the Vaud office."
          imageUrl="mobiliar.jpg"
          isLeft={true}
          role="Project portfolio full stack development"
          technologies="Angular | Spring | Tensorflow | Kubernetes | SAFe"
        ></AnimatedSection>
      </Section>
      <Section id="ey">
        <AnimatedSection
          company="Ernst & Young"
          companyUrl="https://www.ey.com/en_uk"
          countryCode="GB"
          description="Full stack development in the big organized teams for internal automatization platforms for London offices. Develop architectural framework for the whole Software Engineering department."
          imageWidth="lg:w-2/3"
          imageUrl="ey-uk.png"
          role="SCRUM full stack development, Tech Lead & Architect trainings."
          technologies="Angular | Spring | SCRUM | Team Leading"
          textWidth="lg:w-1/3"
        ></AnimatedSection>
      </Section>
      <Section id="samsung">
        <AnimatedSection
          company="Samsung"
          companyUrl="https://samsungrd.pl/en"
          countryCode="KR"
          description="Full stack development of the smart code quality platform for smartphones in cooperation with Suwon office in South Korea. System won the Samsung Best R&D Project."
          imageUrl="samsung.png"
          isLeft={true}
          role="Best R&D Project full stack development"
          technologies="Angular | Spring | SCRUM"
        ></AnimatedSection>
      </Section>
      <Section id="aramco">
        <AnimatedSection
          company="Aramco"
          companyUrl="https://www.ithra.com/en"
          countryCode="SA"
          description="Team management, software development and architecture design of the frontend project for the educational platform in the Middle East."
          imageUrl="aramco.png"
          role="Team Lead of the frontend project"
          technologies="Angular | Team Lead | Architect | Kanban"
        ></AnimatedSection>
      </Section>
    </>
  );
};

export default Experience;
