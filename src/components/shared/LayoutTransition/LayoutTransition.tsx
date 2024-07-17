"use client";

import { usePathname } from 'next/navigation';
import PageTransition from "@/components/shared/PageTransition/PageTransition";

const LayoutTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  return <PageTransition key={pathname}>{children}</PageTransition>;
};

export default LayoutTransition;
