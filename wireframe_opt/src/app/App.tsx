import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { SiviHackSection } from "./components/SiviHackSection";
import { SiviTaSection } from "./components/SiviTaSection";
import { SiviTourSection } from "./components/SiviTourSection";
import { ScheduleSection } from "./components/ScheduleSection";
import { WhyJoinSection } from "./components/WhyJoinSection";
import { OrgSection } from "./components/OrgSection";
import { RegisterSection } from "./components/RegisterSection";
import { Navigation } from "./components/Navigation";
import { SponsorsBar } from "./components/SponsorsBar";
import { StickyCtaBar } from "./components/StickyCtaBar";

export default function App() {
  return (
    <div
      className="min-h-screen overflow-x-hidden pb-20 md:pb-0"
      style={{ background: "#07030f", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Subtle scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.015) 3px, rgba(0,0,0,0.015) 4px)",
        }}
      />

      <Navigation />
      <StickyCtaBar />
      <HeroSection />
      <SponsorsBar />
      <AboutSection />
      <SiviHackSection />
      <SiviTaSection />
      <SiviTourSection />
      <ScheduleSection />
      <WhyJoinSection />
      <OrgSection />
      <RegisterSection />
    </div>
  );
}
