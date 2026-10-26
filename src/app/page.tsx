import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Expertise from '@/components/Expertise';
import CaseStudies from '@/components/CaseStudies';
import Packages from '@/components/Packages';
import WebsiteAudit from '@/components/WebsiteAudit';
import WhoWeHelp from '@/components/WhoWeHelp';
import Approach from '@/components/Approach';
import Faq from '@/components/Faq';
import ClosingBanner from '@/components/ClosingBanner';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Expertise />
        <CaseStudies />
        <Packages />
        <WebsiteAudit />
        <WhoWeHelp />
        <Approach />
        <Faq />
        <ClosingBanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
