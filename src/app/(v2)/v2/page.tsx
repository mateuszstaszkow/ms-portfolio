import React from 'react';
import BugHunt from '@/components/v2/BugHunt';
import { Boot, Cursor, Hud } from '@/components/v2/Chrome';
import Contact from '@/components/v2/Contact';
import { COMPANIES } from '@/components/v2/data';
import Experience from '@/components/v2/Experience';
import { Hero, Skills, Stats } from '@/components/v2/Hero';
import { Research, Work } from '@/components/v2/Work';
import { PROJECTS } from '@/data/projects';

export default function V2Page() {
  const papers = PROJECTS.filter((p) => p.isPublication).reverse();
  const builds = PROJECTS.filter((p) => !p.isPublication);
  const highlights = [
    ...builds.filter((p) => p.important),
    ...builds.filter((p) => p.title.startsWith('Diversplainer'))
  ].reverse();

  const stats: Stats = {
    years: new Date().getFullYear() - 2016,
    companies: COMPANIES.length,
    countries: new Set(builds.map((p) => p.countryCode)).size,
    projects: builds.length,
    papers: papers.length
  };

  return (
    <>
      <Boot />
      <Hud />
      <Cursor />
      <div className="fx-scan" aria-hidden="true" />
      <div className="fx-noise" aria-hidden="true" />
      <main>
        <Hero stats={stats} />
        <Skills />
        <Experience />
        <Work projects={highlights} total={builds.length} />
        <Research papers={papers} />
        <BugHunt />
        <Contact />
      </main>
    </>
  );
}
