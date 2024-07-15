import React from 'react';

interface SectionProps {
  id: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, children}) => {
  return (
    <section
      id={id}
      className="min-h-screen flex flex-col justify-center items-center p-0 lg:p-10"
    >
      <div>{children}</div>
    </section>
  );
};

export default Section;
