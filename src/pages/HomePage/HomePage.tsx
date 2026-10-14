import HeroSection from '@/pages/HomePage/sections/HeroSection';
import AboutSection from '@/pages/HomePage/sections/AboutSection';
import WorksSection from '@/pages/HomePage/sections/WorksSection';
import AiSection from '@/pages/HomePage/sections/AiSection';
import AigcSection from '@/pages/HomePage/sections/AigcSection';
import VideoSection from '@/pages/HomePage/sections/VideoSection';
import SkillsSection from '@/pages/HomePage/sections/SkillsSection';
import ContactSection from '@/pages/HomePage/sections/ContactSection';

export default function HomePage() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main>
      <HeroSection onCtaClick={scrollTo} />
      <AboutSection id="about" />
      <WorksSection id="works" />
      <AiSection id="ai" />
      <AigcSection id="aigc" />
      <VideoSection id="videos" />
      <SkillsSection id="skills" />
      <ContactSection id="contact" />
    </main>
  );
}
