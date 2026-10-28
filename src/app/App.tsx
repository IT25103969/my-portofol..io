import { useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { Nav } from './components/Nav';
import { HeroSection } from './components/HeroSection';
import { Marquee } from './components/Marquee';
import { AboutSection } from './components/AboutSection';
import { HorizontalBentoGrid } from './components/HorizontalBentoGrid';
import { ProjectsSection } from './components/ProjectsSection';
import { JourneySection } from './components/JourneySection';
import { NotesSection } from './components/NotesSection';
import { Footer } from './components/Footer';
import { SectionReveal } from './components/SectionReveal';
import { PageTransition } from './components/PageTransition';

export default function App() {
  // site.json sets the served <title>; this keeps the live preview in sync too
  useEffect(() => {
    document.title = 'Shihaz Shaheem — AI & Software Engineer';
  }, []);

  return (
    // reducedMotion="user" disables transform-based Motion animations when the OS asks for less motion
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="size-full overflow-x-hidden bg-white">
        <PageTransition />
        <Nav />
        <main id="main" tabIndex={-1} className="outline-none">
          <HeroSection />
          <SectionReveal>
            <Marquee />
          </SectionReveal>
          <SectionReveal>
            <AboutSection />
          </SectionReveal>
          <SectionReveal>
            <HorizontalBentoGrid />
          </SectionReveal>
          <SectionReveal>
            <ProjectsSection />
          </SectionReveal>
          <SectionReveal>
            <JourneySection />
          </SectionReveal>
          <SectionReveal>
            <NotesSection />
          </SectionReveal>
        </main>
        <SectionReveal>
          <Footer />
        </SectionReveal>
      </div>
    </MotionConfig>
  );
}
