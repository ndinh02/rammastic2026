import { Navigation } from './components/Navigation'
import { StickyCtaBar } from './components/StickyCtaBar'
import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { SiviHackSection } from './components/SiviHackSection'
import { SiviTaSection } from './components/SiviTaSection'
import { SiviTourSection } from './components/SiviTourSection'
import { ScheduleSection } from './components/ScheduleSection'
import { PricingSection } from './components/PricingSection'
import { OrgSection } from './components/OrgSection'

export default function App() {
  return (
    <div
      className="min-h-screen overflow-x-hidden pb-20 md:pb-0"
      style={{ background: '#07030f', fontFamily: "'Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      {/* Scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.015) 3px, rgba(0,0,0,0.015) 4px)',
        }}
      />

      <Navigation />
      <StickyCtaBar />
      <HeroSection />
      <AboutSection />
      <SiviHackSection />
      <SiviTaSection />
      <SiviTourSection />
      <ScheduleSection />
      <PricingSection />
      <OrgSection />
    </div>
  )
}
