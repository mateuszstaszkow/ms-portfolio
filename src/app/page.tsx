import Image from 'next/image';
import AboutMe from '@/app/components/about-me';
import Section from '@/app/components/section';
import Experience from '@/app/components/experience';
import Education from '@/app/components/education';
import Publications from '@/app/components/publications';
import Services from '@/app/components/services';
import ContactForm from '@/app/components/contact-form';
import React from 'react';
import Navbar from '@/app/components/navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <Section id="about" title="O mnie">
            <AboutMe />
          </Section>
          <Section id="experience" title="Doświadczenie">
            <Experience />
          </Section>
          <Section id="education" title="Edukacja">
            <Education />
          </Section>
          <Section id="publications" title="Publikacje">
            <Publications />
          </Section>
          <Section id="services" title="Usługi">
            <Services />
          </Section>
          {/*<Section id="contact" title="Kontakt"><ContactForm/></Section>*/}
        </div>
      </main>
    </div>
  );
}
