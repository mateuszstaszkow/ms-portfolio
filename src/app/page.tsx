import LeftSidebar from '@/components/LeftSidebar/LeftSidebar';
import RightSidebar from '@/components/RightSidebar/RightSidebar';
import Header from '@/components/Header/Header';
import Section from '@/components/section';
import AboutMe from '@/components/about-me';
import Experience from '@/components/experience';
import Education from '@/components/education';
import Publications from '@/components/publications';
import Services from '@/components/services';
import MobileNav from '@/components/MobileNav/MobileNav';

export default function Home() {
  return (
    <div className="global-container">
      <LeftSidebar />
      <RightSidebar />
      <MobileNav />
      <div className="content">
        <main>
          <Header />
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
        </main>
      </div>
    </div>
  );
}
