'use client';

import { AISection }           from './AISection';
import { AnnouncementBar } from './AnnouncementBar';
import { BearySection }         from './BearySection';
import { CTASection }           from './CTASection';
import { FeaturesSection }      from './FeaturesSection';
import { Footer }               from './Footer';
import { Hero }                 from './Hero';
import { Navbar }               from './Navbar';
import { ProblemSection }       from './ProblemSection';
import { ProofStrip }           from './ProofStrip';
import { RolesSection }         from './RolesSection';
import { StorySection }         from './StorySection';
import { TestimonialsSection }  from './TestimonialsSection';
import BlobCursor               from '@/components/ui/BlobCursor';

export function LandingPage() {
  return (
    <>
      <BlobCursor />
      <AnnouncementBar />
      <Navbar hasBar />
      <main>
        <Hero />
        <ProofStrip />
        <ProblemSection />
        <StorySection />
        <FeaturesSection />
        <AISection />
        <BearySection />
        <RolesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
