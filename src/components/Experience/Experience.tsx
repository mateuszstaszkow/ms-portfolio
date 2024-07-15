import React from 'react';
import AnimatedSection from '@/components/AnimatedSection/AnimatedSection';

const Experience: React.FC = () => {
  return (
    <AnimatedSection
      company="Aktionariat"
      companyUrl="https://www.aktionariat.com/our-products/corporate-dashboard#details"
      countryCode="CHE"
      description="Solely design, build and deliver the whole project in the Crypto world for the renown startup in Zurich."
      imageUrl="/aktionariat.webp"
      role="Corporate Dashboard 1 man army full stack development"
      technologies="Angular | Spring | Web3 | WC | GH"
    ></AnimatedSection>
  );
};

export default Experience;
