import Header from '@/components/Header/Header';
import Section from '@/components/Section/Section';
import Navbar from '@/components/Navbar/Navbar';
import Experience from "@/components/Experience/Experience";

export default function Home() {
  return (
    <div className="global-container">
      <Navbar/>
      <div className="content">
        <main>
          <Header />
          <Section id="about">
            <Experience />
          </Section>
        </main>
      </div>
    </div>
  );
}
