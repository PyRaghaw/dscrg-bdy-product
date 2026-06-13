'use client';

import { AISection }           from './AISection';
import { AmbulanceSection }    from './AmbulanceSection';
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
import { DrugInteractionSection } from './DrugInteractionSection';
import { ChatbotWidget }        from '@/components/ui/ChatbotWidget';

export function LandingPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar hasBar />
      <main>
        <Hero />
        <ProofStrip />
        <ProblemSection />
        <StorySection />
        <RolesSection />
        <FeaturesSection />
        <DrugInteractionSection />
        <AISection />
        <BearySection />
        <AmbulanceSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
      <ChatbotWidget />
    </>
  );
}
