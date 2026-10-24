import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AudienceStrip from '@/components/AudienceStrip';
import Expertise from '@/components/Expertise';
import WhoWeHelp from '@/components/WhoWeHelp';
import Approach from '@/components/Approach';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <AudienceStrip />
        <Expertise />
        <WhoWeHelp />
        <Approach />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

