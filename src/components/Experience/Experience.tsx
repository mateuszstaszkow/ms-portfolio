import React from 'react';
import AnimatedSection from '@/components/shared/AnimatedSection/AnimatedSection';
import Section from '@/components/shared/Section/Section';

const Experience: React.FC = () => {
  return (
    <>
      <Section id="sanoma">
        <AnimatedSection
          company="Sanoma"
          companyUrl="https://www.sanomapro.fi/"
          countryCode="FI"
          description="Frontend development of the E-learning platform. Winner (2nd place) of the AI Hackathon."
          imageUrl="sanoma.jpg"
          role="Hackathon winner, frontend development"
          technologies="Angular | AWS"
        ></AnimatedSection>
      </Section>
      <Section id="bnpp">
        <AnimatedSection
          company="BNP Paribas"
          companyUrl="https://cib.bnpparibas/centric/"
          countryCode="FR"
          description="Full stack development of the low-latency transactional systems for the corporate banking clients. Member of the best-performing team."
          imageUrl="bnpp.jpg"
          isLeft={true}
          role="Best-performing team full stack development"
          technologies="Angular | Spring | Oracle | Apigee"
        ></AnimatedSection>
      </Section>
      <Section id="aktionariat">
        <AnimatedSection
          company="Aktionariat"
          companyUrl="https://www.aktionariat.com/solutions/corporate-dashboard"
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
          companyUrl="https://www.mobiliar.ch/privatpersonen/sparen-und-vorsorgen/todesfallversicherung"
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
          technologies="Angular | Spring | Nest | SCRUM | Team Leading"
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
          technologies="Angular | Vue | Spring | SCRUM"
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
      <Section id="proservice">
        <AnimatedSection
          company="ProService Finteco"
          companyUrl="https://psfinteco.com/en/"
          countryCode="PL"
          description="Core system refactor with Business Process Modelling tools and SCRUM for the great stock transfer agent in Poland."
          imageUrl="proservice.png"
          imageWidth="lg:w-3/5"
          isLeft={true}
          role="1 man army frontend development"
          technologies="Angular | BPM | SCRUM"
          textWidth="lg:w-2/5"
        ></AnimatedSection>
      </Section>
      <Section id="msd">
        <AnimatedSection
          company="MSD Apartments"
          companyUrl="https://www.youtube.com/watch?v=JiDVGROMxqQ"
          countryCode="PL"
          description="Founder, CEO, Marketing, Customer Relations, Team Management, Frontend development for the company for the long and short term apartment rentals by the Polish sea in Koszalin."
          imageUrl="msd.jpg"
          imageWidth="lg:w-3/5"
          role="Founder"
          technologies="React | Team Management | Customer Relations"
          textWidth="lg:w-2/5"
        ></AnimatedSection>
      </Section>
      <Section id="ge">
        <AnimatedSection
          company="General Electric"
          companyUrl="https://ilot.lukasiewicz.gov.pl/en/"
          countryCode="PL"
          description="Frontend development of the desktop app for the Aviation Lab in the Institute of Aviation in Warsaw."
          imageUrl="edc.jpg"
          imageWidth="lg:w-3/5"
          isLeft={true}
          role="Aviation Lab internship"
          technologies="C++ | Qt | Electronics"
          textWidth="lg:w-2/5"
        ></AnimatedSection>
      </Section>
    </>
  );
};

export default Experience;
