
import { About as AboutSection } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Mojib Rsm | WordPress Developer & AI Specialist',
  description: 'Learn more about Mojib Rsm, a passionate WordPress developer, AI enthusiast, and digital marketer from Bangladesh. Discover his journey, skills, and experience.',
};

export default function AboutPage() {
  return (
    <>
      <AboutSection />
      <Experience />
      <Skills />
    </>
  );
}
