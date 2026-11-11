import React from 'react';
import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './v2/v2.css';
import './v2/scenes.css';

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap'
});

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Mateusz Staszkow — Full Stack Engineer',
  description:
    'Full stack engineer shipping banking systems, blockchain dashboards and AI tooling. Experience, research, projects — and a minigame.'
};

export const viewport: Viewport = {
  themeColor: '#04070a',
  width: 'device-width',
  initialScale: 1
};

export default function V2Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mono.variable} ${display.variable} v2-html`}>
      <head>
        <noscript>
          <style>{`.rv{opacity:1!important;transform:none!important;clip-path:none!important}.boot{display:none!important}`}</style>
        </noscript>
      </head>
      <body className="v2">{children}</body>
    </html>
  );
}
