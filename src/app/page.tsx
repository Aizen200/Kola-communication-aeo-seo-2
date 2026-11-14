import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustedBy from '@/components/TrustedBy';
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
import Motion from '@/components/Motion';

export default function Home() {
  return (
    <>
      <Motion />
      <Header />
      <main id="main">
        <Hero />
        <TrustedBy />
        <Expertise />
        <Approach />
        <WhoWeHelp />
        <CaseStudies />
        <WebsiteAudit />
        <Packages />
        <Faq />
        <ClosingBanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
